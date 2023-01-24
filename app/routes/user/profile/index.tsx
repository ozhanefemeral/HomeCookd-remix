import { Link } from "@remix-run/react";

const ProfileIndex = () => {
  return <div>
    <h1 className="text-2xl font-bold">Profile</h1>
    <Link to="edit" className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600">Edit</Link>
  </div>;

}


export default ProfileIndex;