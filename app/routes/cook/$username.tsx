// remix page where username is a param and is used in the loader function
// Path: app\routes\cook\$username.tsx

import {
  Form,
  NavLink,
  Outlet,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import { getCookByUsername, getCookMeals } from "~/models/cook.server";
import { getCookProfileByUserId } from "~/models/user.server";

// get username from params and use it in the loader function
export async function loader({ request, params }: LoaderArgs) {
  const { username } = params as { username: string };
  const cook = await getCookByUsername(username);
  // if (!cook) return json({ cook: null }, { status: 404 });
  const meals = await getCookMeals(cook!.id);
  const profile = await getCookProfileByUserId(cook!.username);
  return json({ meals, cook, profile });
}

export default function CookPage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="p-4">
      {/* div background from profile.banner and top right cook avatar. at bottom left cook name and profile.description*/}
      <div
        className="flex h-96 flex-col items-center justify-center bg-cover bg-center  bg-no-repeat bg-blend-darken"
        style={{ backgroundImage: `url(${data.profile!.banner})` }}
      >
        <div className="flex h-32 w-32 flex-col items-center justify-center overflow-hidden rounded-full bg-gray-100">
          <img
            src={data.profile!.avatar}
            alt="avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="mt-4 text-center text-2xl font-bold text-white">
          {data.cook!.name}
        </h1>
        <p className="mt-2 text-center text-sm text-white">
          {data.profile!.description}
        </p>
        <div className="mt-4 flex space-x-4">
          <a
            href={data.profile!.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-white underline"
          >
            Instagram
          </a>
          <span className="h-6 w-px rounded-full bg-white"></span>
          <a
            href={data.profile!.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-white underline"
          >
            Youtube
          </a>
          <span className="h-6 w-px rounded-full bg-white"></span>
          <a
            href={data.profile!.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-white underline"
          >
            Facebook
          </a>
        </div>
      </div>

      <div className="my-4 flex flex-col items-center justify-center space-y-4">
        <div className="flex space-x-4 font-bold text-primary">
          <NavLink to="meals">
            <h3 className="text-2xl">Meals</h3>
          </NavLink>
          <NavLink to="recipes">
            <h3 className="text-2xl">Recipes</h3>
          </NavLink>
          <NavLink to="reservation">
            <h3 className="text-2xl">Reservation</h3>
          </NavLink>
        </div>
      </div>

      <div className="flex-1">
        <hr className="mb-4" />
        <Outlet />
      </div>
    </div>
  );
}
