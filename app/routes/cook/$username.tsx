// remix page where username is a param and is used in the loader function
// Path: app\routes\cook\$username.tsx

import { Form, NavLink, Outlet, useCatch, useLoaderData } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import { getCookByUsername, getCookMeals, getCookProfile } from "~/models/cook.server";


// get username from params and use it in the loader function
export async function loader({ request, params }: LoaderArgs) {
  const { username } = params as { username: string };
  const cook = await getCookByUsername(username);
  // if (!cook) return json({ cook: null }, { status: 404 });
  const meals = await getCookMeals(cook!.id);
  const profile = await getCookProfile(cook!.username);
  return json({ meals, cook, profile });
}

export default function CookPage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="p-4">
      {/* div background from profile.banner and top right cook avatar. at bottom left cook name and profile.description*/}
      <div className="flex flex-col items-center justify-center h-96 bg-cover bg-center  bg-blend-darken bg-no-repeat" style={{ backgroundImage: `url(${data.profile!.banner})` }} >
        <div className="flex flex-col items-center justify-center w-32 h-32 overflow-hidden rounded-full bg-gray-100">
          <img src={data.profile!.avatar} alt="avatar" className="w-full h-full object-cover" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-center text-white">{data.cook!.name}</h1>
        <p className="mt-2 text-sm text-center text-white">{data.profile!.description}</p>
        <div className="flex mt-4 space-x-4">
          <a
            href={data.profile!.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline font-bold"
          >
            Instagram
          </a>
          <span className="w-px h-6 bg-white rounded-full"></span>
          <a
            href={data.profile!.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline font-bold"
          >
            Youtube
          </a>
          <span className="w-px h-6 bg-white rounded-full"></span>
          <a
            href={data.profile!.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline font-bold"
          >
            Facebook
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center my-4 space-y-4">
        <div className="flex space-x-4 text-primary font-bold">
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
