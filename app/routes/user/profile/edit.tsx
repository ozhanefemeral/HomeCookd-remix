import { json, LoaderArgs } from "@remix-run/server-runtime";
import { redirect } from "react-router";
import { getUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");
  return json({});
}

const EditProfile = () => {
  return (
    <div>
      {/* tailwind h1 */}
      <h1 className="text-xl font-bold">Edit Profile</h1>
    </div>
  );
};

export default EditProfile;