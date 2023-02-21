// simple div with h1 for now

import { formatMealTag, mapMealTagToEmoji, useUserProfile } from "~/utils";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { MealTags } from "@prisma/client";

const ONBBARDING_STEPS = ["tags", "schedule", "payment", "done"];

const ProfileOnboarding = () => {
  const userProfile = useUserProfile();
  const navigate = useNavigate();
  const [appliedTags, setAppliedTags] = useState<MealTags[]>([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!userProfile) navigate("/login")
    else if (userProfile.onboardingCompleted) navigate("/user/profile")
  }, [userProfile]);

  return <div>
    <h1 className="text-2xl font-bold">Onboarding for {userProfile.name}</h1>
    {/* tailwind buttons for next and back */}
    {/* if step is 0, show tags */}
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 disabled:bg-gray-500 px-4 rounded" onClick={() => setStep(step + 1)} disabled={step === 3}>Next</button>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold disabled:bg-gray-500 py-2 px-4 rounded" onClick={() => setStep(step - 1)} disabled={step === 0}>Back</button>

    {step === 0 && <div>
      <h2 className="text-xl font-bold">What are you interested in?</h2>
      <div className="flex flex-row gap-4 flex-wrap">
        {Object.values(MealTags).map((tag) => (
          <button
            key={tag}
            // bg primary and white text if applied, light gray bg and black text if not applied
            className={`rounded px-4 py-2 ${appliedTags.includes(tag) ? "bg-primary text-white" : "bg-gray-200 text-gray-900"
              }`}
            onClick={() => {
              if (appliedTags.includes(tag)) {
                setAppliedTags(appliedTags.filter((t) => t !== tag));
              } else {
                setAppliedTags([...appliedTags, tag]);
              }
            }}
          >
            {mapMealTagToEmoji(tag)} {formatMealTag(tag)} {appliedTags.includes(tag) && <span className="text-white">✓</span>}
          </button>
        ))}
        {/* clear all */}
        {appliedTags.length > 0 && (
          <button
            className="rounded px-4 py-2 bg-gray-200 text-gray-900"
            onClick={() => {
              setAppliedTags([]);
            }}
          >
            Remove all
          </button>
        )}
      </div>
    </div>}

    {/* first, we need to know what food categories they are interested in */}
    {/* cards of meal tags */}
  </div>;
}

export default ProfileOnboarding