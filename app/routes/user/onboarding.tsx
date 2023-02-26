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
    drafts: subMealDraft[];
  };
};

type TagsStepProps = {
  interestedTags: MealTags[];
  setInterestedTags: (tags: MealTags[]) => void;
  dislikedTags: MealTags[];
  stepData: StepData;
  setStepData: (data: StepData) => void;
  setDislikedTags: (tags: MealTags[]) => void;
};

type MealPickStepProps = {
  meals: MealWithCook[];
  stepData: StepData;
  setStepData: (data: StepData) => void;
  nextStep: () => void;
};

type SubscriptionStepProps = {
  meals: MealWithCook[];
  stepData: StepData;
  setStepData: (data: StepData) => void;
  nextStep: () => void;
};

function TagsStep({
  interestedTags,
  setInterestedTags,
  dislikedTags,
  setDislikedTags,
}: TagsStepProps): JSX.Element {
  // TODO
  // DISLIKES AND INTERESTS CAN'T INCLUDE THE SAME TAG

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

function MealPickStep({ meals, nextStep }: MealPickStepProps) {
  const [selectedMeals, setSelectedMeals] = useState<MealWithCook[]>([]);

  const canGoNext = selectedMeals.length > 0;

  function handleClick() {
    // TODO
    // POST TO API
    if (canGoNext) nextStep();
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Lets subscribe you to a meal!</h2>
      {/* meal grids of 3 */}
      {/* tailwind grid */}
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
        onClick={handleClick}
      >
        Continue
      </button>
    </div>
  );
}

function SubscriptionStep({ meals, nextStep }: SubscriptionStepProps) {
  const [mealCounts, setMealCounts] = useState<
    Record<string, { count: number; deliveryDay: string; deliveryHour: string }>
  >({});

  function handleCountChange(
    mealId: string,
    count: number,
    deliveryDay: string,
    deliveryHour: string
  ) {
    setMealCounts({
      ...mealCounts,
      [mealId]: { count, deliveryDay, deliveryHour },
    });
  }

  const totalCost = Object.entries(mealCounts).reduce(
    (acc, [mealId, { count }]) => {
      const meal = meals.find((m) => m.id === mealId);
      if (!meal) return acc;
      return acc + meal.price * count;
    },
    0
  );

  // SubMealTile for each meal
  return (
    <div>
      <h2 className="text-xl font-bold">You're subscribed to these meals!</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:px-[10rem]">
        {meals.map((meal) => (
          <SubMealTile key={meal.id} meal={meal} onChange={handleCountChange} />
        ))}
        <div className="rounded-lg p-4 shadow-lg">
          Total cost per week: ${totalCost}
        </div>
      </div>
      <button
        className="rounded bg-primary px-4 py-2 text-white"
        onClick={nextStep}
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
  const [interestedTags, setInterestedTags] = useState<MealTags[]>([]);
  const [dislikedTags, setDislikedTags] = useState<MealTags[]>([]);
  const [step, setStep] = useState(0);
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

  // if dislikedTags or interestedTags is empty, disable the next button
  // also disable the next button if interestedTags and dislikedTags have the same tag
  const canGoNext =
    (interestedTags.length > 0 || dislikedTags.length > 0) && !hasSameTag();

  function hasSameTag() {
    return interestedTags.some((tag) => dislikedTags.includes(tag));
  }

  useEffect(() => {
    if (!userProfile) navigate("/login");
    else if (userProfile.onboardingCompleted) navigate("/user/profile");
  }, [userProfile]);

  useEffect(() => {
    if (step === 1) {
      // fetch recommended meals
      const recommendedMealForm = new FormData();
      recommendedMealForm.append(
        "interestedTags",
        JSON.stringify(interestedTags)
      );
      recommendedMealForm.append("dislikedTags", JSON.stringify(dislikedTags));
      fetcher.submit(recommendedMealForm, { method: "post" });
    }
  }, [step]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Onboarding for {userProfile.name}</h1>
      {/* tailwind buttons for next and back */}
      {/* if step is 0, show tags */}
      <button
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 disabled:bg-gray-500"
        onClick={() => setStep(step + 1)}
        disabled={step === 3 || !canGoNext}
      >
        Next
      </button>
      <button
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 disabled:bg-gray-500"
        onClick={() => setStep(step - 1)}
        disabled={step === 0}
      >
        Back
      </button>

      {step === 0 && (
        <TagsStep
          interestedTags={interestedTags}
          setInterestedTags={setInterestedTags}
          dislikedTags={dislikedTags}
          setDislikedTags={setDislikedTags}
          setStepData={setStepData}
          stepData={stepData}
        />
      )}
      {step === 1 && (
        <MealPickStep
          meals={fetcher.data?.meals || []}
          nextStep={() => setStep(step + 1)}
          setStepData={setStepData}
          stepData={stepData}
        />
      )}
      {step === 2 && (
        <SubscriptionStep
          meals={fetcher.data?.meals || []}
          nextStep={() => setStep(step + 1)}
          setStepData={setStepData}
          stepData={stepData}
        />
      )}

      {/* first, we need to know what food categories they are interested in */}
      {/* cards of meal tags */}
    </div>
  );
};

export default ProfileOnboarding;
