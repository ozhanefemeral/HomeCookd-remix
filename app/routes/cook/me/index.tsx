import { Link, Outlet } from "@remix-run/react";
import { LoaderArgs, json } from "@remix-run/server-runtime";
import React from "react";
import { getCookProfile, getUserProfile } from "~/session.server";
import { useUser } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const userProfile = await getUserProfile(request);
  const cookProfile = await getCookProfile(request);

  return json({
    userProfile,
    cookProfile,
  });
}

function index() {
  const user = useUser();

  return (
    <div>
      <p>Hello, {user.email}</p>
    </div>
  );
}

export default index;
