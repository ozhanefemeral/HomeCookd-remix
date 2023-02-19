import { useUserProfile } from "~/utils";

const EditProfile = () => {
  const profile = useUserProfile();
  return (
    <div>
      {/* tailwind h1 */}
      <h1 className="text-xl font-bold">Edit Profile</h1>
      <p>
        {profile?.name}
      </p>
    </div>
  );
};

export default EditProfile;