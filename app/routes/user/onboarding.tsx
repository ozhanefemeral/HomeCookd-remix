// simple div with h1 for now

import {
  daysCapitalized,
  formatMealTag,
  mapMealTagToEmoji,
  useUserProfile,
} from "~/utils";
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

export type SubMealDraft = {
  meal: MealWithCook;
  quantity: number;
  deliveryHour: string;
  deliveryDay: DeliveryDay;
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
    drafts: SubMealDraft[];
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

type PaymentStepProps = {
  stepData: StepData;
  setStepData: (data: StepData) => void;
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
    case ONBBARDING_STEPS.payment:
      return <PaymentStep setStepData={setStepData} stepData={stepData} />;
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
    </>
  );
}

function MealPickStep({ meals, setStepData, stepData }: MealPickStepProps) {
  const [selectedMeals, setSelectedMeals] = useState<MealWithCook[]>(
    stepData.mealpick.meals ?? []
  );

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
    </div>
  );
}

function SubscriptionStep({
  meals,
  setStepData,
  stepData,
}: SubscriptionStepProps) {
  const [drafts, setDrafts] = useState<SubMealDraft[]>(
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

  useEffect(() => {
    setStepData({
      ...stepData,
      subscription: {
        drafts,
      },
    });
  }, [drafts]);

  // SubMealTile for each meal
  return (
    <div>
      <h2 className="text-xl font-bold">You're subscribed to these meals!</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:px-[10rem]">
        {meals.map((meal) => (
          <SubMealTile key={meal.id} meal={meal} onChange={handleChange} />
        ))}
      </div>
    </div>
  );
}

function PaymentStep({ stepData }: PaymentStepProps) {
  // map meals to days of the week and group by day
  const [daysWithDrafts, setDaysWithDrafts] = useState({
    MONDAY: [],
    TUESDAY: [],
    WEDNESDAY: [],
    THURSDAY: [],
    FRIDAY: [],
    SATURDAY: [],
    SUNDAY: [],
  } as { [key in DeliveryDay]: SubMealDraft[] });

  const { drafts } = stepData.subscription;
  useEffect(() => {
    let draftsMappedToDays = {
      MONDAY: [],
      TUESDAY: [],
      WEDNESDAY: [],
      THURSDAY: [],
      FRIDAY: [],
      SATURDAY: [],
      SUNDAY: [],
    } as { [key in DeliveryDay]: SubMealDraft[] };

    drafts.forEach((draft) => {
      draftsMappedToDays[draft.deliveryDay].push(draft);
    });

    setDaysWithDrafts(draftsMappedToDays);
  }, []);

  const totalCost = drafts.reduce((acc, draft) => {
    return acc + draft.meal.price * draft.quantity || 0;
  }, 0);

  return (
    <div>
      <h2 className="text-xl font-bold">Payment</h2>
      {/* if mobile columns, if not flex row for days of the week */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:px-[10rem]">
        {Object.entries(daysWithDrafts).map(([day, drafts]) => {
          // if day is empty return null
          if (drafts.length === 0) return null;
          return (
            <div key={day}>
              <h3 className="text-lg font-bold">{day}</h3>
              {drafts.map((draft) => (
                <OnboardingMealCard
                  key={draft.meal.id}
                  draftMeal={draft}
                  draft
                  meal={draft.meal}
                />
              ))}
            </div>
          );
        })}
        <div className="rounded-lg p-4 shadow-lg">
          Total cost per week: ${totalCost}
        </div>
      </div>
    </div>
  );
}

function canGoNextStep(
  step: keyof typeof ONBBARDING_STEPS,
  stepData: StepData
) {
  switch (step) {
    case "tags":
      return stepData.tags.interestedTags.length > 0;
    case "mealpick":
      return stepData.mealpick.meals.length > 0;
    case "subscription":
      return stepData.subscription.drafts.length > 0;
    default:
      return false;
  }
}

function getNextStep(step: keyof typeof ONBBARDING_STEPS) {
  switch (step) {
    case "tags":
      return "mealpick";
    case "mealpick":
      return "subscription";
    case "subscription":
      return "payment";
    default:
      return "tags";
  }
}

function getPreviousStep(step: keyof typeof ONBBARDING_STEPS) {
  switch (step) {
    case "tags":
      return "tags";
    case "mealpick":
      return "tags";
    case "subscription":
      return "mealpick";
    default:
      return "subscription";
  }
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

  const canGoNext = canGoNextStep(step, stepData);
  const canGoBack = step !== ONBBARDING_STEPS.tags;

  return (
    <div>
      <h1 className="my-2 text-2xl font-bold">
        Onboarding for {userProfile.name}
      </h1>

      <div className="flex">
        <button
          className="mr-2 rounded bg-primary px-4 py-2 text-white disabled:opacity-50"
          onClick={() => {
            setStepData({
              ...stepData,
              step: getPreviousStep(step),
            });
          }}
          disabled={!canGoBack}
        >
          Back
        </button>
        <button
          className="rounded bg-primary px-4 py-2 text-white disabled:opacity-50"
          onClick={() => {
            setStepData({
              ...stepData,
              step: getNextStep(step),
            });
          }}
          disabled={!canGoNext}
        >
          Next
        </button>
      </div>

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
