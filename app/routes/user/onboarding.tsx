// simple div with h1 for now

import { useUserProfile } from "~/utils";
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

    {/* first, we need to know what food categories they are interested in */}
    {/* cards of meal tags */}
  </div>;
}

export default ProfileOnboarding