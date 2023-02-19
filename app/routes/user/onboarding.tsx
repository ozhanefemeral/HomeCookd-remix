// simple div with h1 for now

import { useUserProfile } from "~/utils";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

const ProfileOnboarding = () => {
  const userProfile = useUserProfile();
  const navigate = useNavigate();


  useEffect(() => {
    if (!userProfile) navigate("/login")
    else if (userProfile.onboardingCompleted) navigate("/user/profile")
  }, [userProfile]);

  return <div>
    <h1 className="text-2xl font-bold">Onboarding</h1>
  </div>;
}

export default ProfileOnboarding