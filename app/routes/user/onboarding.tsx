// simple div with h1 for now

import { formatMealTag, mapMealTagToEmoji, useUserProfile } from "~/utils";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { DeliveryDay, Meal, MealTags } from "@prisma/client";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import { getMealByTags, MealWithCook } from "~/models/meals.server";
import OnboardingMealCard from "~/components/onboarding/OnboardingMealCard";
import SubMealTile from "~/components/onboarding/SubMealTile";

const ONBBARDING_STEPS = {
  tags: "tags",
  mealpick: "mealpick",
  subscription: "subscription",
  payment: "payment",
  done: "done",
} as const;

type subMealDraft = {
  meal: MealWithCook;
  quantity: number;
  deliveryHour: string;
  deliveryDay: string;
};

type StepData = {
  step: keyof typeof ONBBARDING_STEPS;
  tags: {
    interestedTags: MealTags[];
    dislikedTags: MealTags[];
  };
  mealpick: {
    meals: MealWithCook[];
  };
  subscription: {
    drafts: subMealDraft[];
  };
};

type TagsStepProps = {
  stepData: StepData;
  setStepData: (data: StepData) => void;
};

type MealPickStepProps = {
  meals: MealWithCook[];
  stepData: StepData;
  setStepData: (data: StepData) => void;
};

type SubscriptionStepProps = {
  meals: MealWithCook[];
  stepData: StepData;
  setStepData: (data: StepData) => void;
};

type StepToComponentProps = {
  stepData: StepData;
  setStepData: (data: StepData) => void;
  step: keyof typeof ONBBARDING_STEPS;
  meals: MealWithCook[];
};

function StepToComponent({
  step,
  stepData,
  setStepData,
  meals,
}: StepToComponentProps) {
  switch (step) {
    case ONBBARDING_STEPS.tags:
      return <TagsStep setStepData={setStepData} stepData={stepData} />;
    case ONBBARDING_STEPS.mealpick:
      return (
        <MealPickStep
          setStepData={setStepData}
          stepData={stepData}
          meals={meals}
        />
      );
    case ONBBARDING_STEPS.subscription:
      return (
        <SubscriptionStep
          setStepData={setStepData}
          stepData={stepData}
          meals={meals}
        />
      );
    // case ONBBARDING_STEPS.payment:
    //   return <PaymentStep setStepData={setStepData} stepData={stepData} />;
    default:
      return <div>404</div>;
  }
}

function TagsStep({ stepData, setStepData }: TagsStepProps): JSX.Element {
  // TODO
  // DISLIKES AND INTERESTS CAN'T INCLUDE THE SAME TAG

  const [interestedTags, setInterestedTags] = useState<MealTags[]>(
    stepData.tags.interestedTags ?? []
  );
  const [dislikedTags, setDislikedTags] = useState<MealTags[]>(
    stepData.tags.dislikedTags ?? []
  );

  useEffect(() => {
    setStepData({
      ...stepData,
      tags: {
        interestedTags,
        dislikedTags,
      },
    });
  }, [interestedTags, dislikedTags]);

  const canGoNext = interestedTags.length > 0 || dislikedTags.length > 0;

  function handleContinueClick() {
    // TODO
    // POST TO API
    if (canGoNext) setStepData({ ...stepData, step: "mealpick" });
  }

  return (
    <>
      <h2 className="text-xl font-bold">What are you interested in?</h2>
      <div className="flex flex-row flex-wrap gap-4">
        {Object.values(MealTags).map((tag) => (
          <button
            key={tag}
            // bg primary and white text if applied, light gray bg and black text if not applied
            className={`rounded px-4 py-2 ${
              interestedTags.includes(tag)
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-900"
            }`}
            onClick={() => {
              if (interestedTags.includes(tag)) {
                setInterestedTags(interestedTags.filter((t) => t !== tag));
              } else {
                setInterestedTags([...interestedTags, tag]);
              }
            }}
          >
            {mapMealTagToEmoji(tag)} {formatMealTag(tag)}{" "}
            {interestedTags.includes(tag) && (
              <span className="text-white">✓</span>
            )}
          </button>
        ))}
        {/* clear all */}
        {interestedTags.length > 0 && (
          <button
            className="rounded bg-gray-200 px-4 py-2 text-gray-900"
            onClick={() => {
              setInterestedTags([]);
            }}
          >
            Remove all
          </button>
        )}
      </div>
      <h2 className="text-xl font-bold">Your allergies/dislikes?</h2>
      <div className="flex flex-row flex-wrap gap-4">
        {Object.values(MealTags).map((tag) => (
          <button
            key={tag}
            // bg primary and white text if applied, light gray bg and black text if not applied
            className={`rounded px-4 py-2 ${
              dislikedTags.includes(tag)
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-900"
            }`}
            onClick={() => {
              if (dislikedTags.includes(tag)) {
                setDislikedTags(dislikedTags.filter((t) => t !== tag));
              } else {
                setDislikedTags([...dislikedTags, tag]);
              }
            }}
          >
            {mapMealTagToEmoji(tag)} {formatMealTag(tag)}{" "}
            {dislikedTags.includes(tag) && (
              <span className="text-white">✓</span>
            )}
          </button>
        ))}
        {/* clear all */}
        {dislikedTags.length > 0 && (
          <button
            className="rounded bg-gray-200 px-4 py-2 text-gray-900"
            onClick={() => {
              setDislikedTags([]);
            }}
          >
            Remove all
          </button>
        )}
      </div>

      <button
        className={`rounded bg-primary px-4 py-2 align-middle text-white ${
          canGoNext ? "" : "opacity-50 hover:cursor-not-allowed"
        }}`}
        onClick={handleContinueClick}
      >
        Continue
      </button>
    </>
  );
}

function MealPickStep({ meals, setStepData, stepData }: MealPickStepProps) {
  const [selectedMeals, setSelectedMeals] = useState<MealWithCook[]>(
    stepData.mealpick.meals ?? []
  );

  const canGoNext = selectedMeals.length > 0;

  function handleContinueClick() {
    // TODO
    // POST TO API
    setStepData({
      ...stepData,
      step: "subscription",
      mealpick: {
        meals: selectedMeals,
      },
    });
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Lets subscribe you to a meal!</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:px-[10rem]">
        {meals.map((meal) => (
          <OnboardingMealCard
            key={meal.id}
            meal={meal}
            onClick={() => {
              if (selectedMeals.includes(meal)) {
                setSelectedMeals(selectedMeals.filter((m) => m.id !== meal.id));
              } else {
                setSelectedMeals([...selectedMeals, meal]);
              }
            }}
          />
        ))}
      </div>
      <button
        className={`rounded bg-primary px-4 py-2 align-middle text-white ${
          canGoNext ? "" : "opacity-50 hover:cursor-not-allowed"
        }}`}
        onClick={handleContinueClick}
      >
        Continue
      </button>
    </div>
  );
}

function SubscriptionStep({
  meals,
  setStepData,
  stepData,
}: SubscriptionStepProps) {
  const [drafts, setDrafts] = useState<subMealDraft[]>(
    stepData.subscription.drafts ?? []
  );

  function handleChange(
    mealId: string,
    quantity: number,
    deliveryDay: string,
    deliveryHour: string
  ) {
    const meal = meals.find((m) => m.id === mealId)!;
    const draft = drafts.find((d) => d.meal === meal)!;

    if (draft) {
      draft.quantity = quantity;
      draft.deliveryDay = deliveryDay;
      draft.deliveryHour = deliveryHour;
    } else {
      setDrafts([
        ...drafts,
        {
          meal,
          quantity,
          deliveryDay,
          deliveryHour,
        },
      ]);
    }
  }

  const totalCost = drafts.reduce((acc, draft) => {
    return acc + draft.meal.price * draft.quantity;
  }, 0);

  function handleContinueClick() {
    setStepData({
      ...stepData,
      step: "payment",
      subscription: {
        drafts,
      },
    });
  }

  // SubMealTile for each meal
  return (
    <div>
      <h2 className="text-xl font-bold">You're subscribed to these meals!</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:px-[10rem]">
        {meals.map((meal) => (
          <SubMealTile key={meal.id} meal={meal} onChange={handleChange} />
        ))}
        <div className="rounded-lg p-4 shadow-lg">
          Total cost per week: ${totalCost}
        </div>
      </div>
      <button
        className="rounded bg-primary px-4 py-2 text-white"
        onClick={handleContinueClick}
      >
        Continue
      </button>
    </div>
  );
}

export async function action({ request, context }: LoaderArgs) {
  const formData = await request.formData();
  const interestedTags = JSON.parse(
    formData.get("interestedTags") as string
  ) as MealTags[];
  const dislikedTags = JSON.parse(
    formData.get("dislikedTags") as string
  ) as MealTags[];
  const meals = await getMealByTags(interestedTags, dislikedTags);

  return json({ meals });
}

const ProfileOnboarding = () => {
  const userProfile = useUserProfile();
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const [stepData, setStepData] = useState<StepData>({
    step: ONBBARDING_STEPS.tags,
    tags: {
      interestedTags: [],
      dislikedTags: [],
    },
    mealpick: {
      meals: [],
    },
    subscription: {
      drafts: [],
    },
  });

  useEffect(() => {
    if (!userProfile) navigate("/login");
    else if (userProfile.onboardingCompleted) navigate("/user/profile");
  }, [userProfile]);

  useEffect(() => {
    if (stepData.step === ONBBARDING_STEPS.mealpick) {
      const { interestedTags, dislikedTags } = stepData.tags;

      const recommendedMealForm = new FormData();
      recommendedMealForm.append(
        "interestedTags",
        JSON.stringify(interestedTags)
      );
      recommendedMealForm.append("dislikedTags", JSON.stringify(dislikedTags));
      fetcher.submit(recommendedMealForm, { method: "post" });
    }
  }, [stepData]);

  useEffect(() => {
    if (fetcher.data && stepData.step === ONBBARDING_STEPS.mealpick) {
      setStepData({
        ...stepData,
        mealpick: {
          meals: fetcher.data.meals,
        },
      });
    }
  }, [JSON.stringify(fetcher.data)]);

  const { step } = stepData;

  return (
    <div>
      <h1 className="text-2xl font-bold">Onboarding for {userProfile.name}</h1>
      <StepToComponent
        setStepData={setStepData}
        step={step}
        stepData={stepData}
        meals={stepData.mealpick.meals}
      />
    </div>
  );
};

export default ProfileOnboarding;
