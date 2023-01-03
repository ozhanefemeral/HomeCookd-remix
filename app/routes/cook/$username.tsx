// remix page where username is a param and is used in the loader function
// Path: app\routes\cook\$username.tsx

import { Form, Outlet, useCatch, useLoaderData } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import { getCookByUsername, getCookMeals } from "~/models/cook.server";


// get username from params and use it in the loader function
export async function loader({ request, params }: LoaderArgs) {
  const { username } = params as { username: string };
  const cook = await getCookByUsername(username);
  // if (!cook) return json({ cook: null }, { status: 404 });
  const meals = await getCookMeals(cook!.id);
  return json({ meals, cook });
}

export default function CookPage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="p-4">
      {/* h1 as cook name */}
      <h1 className="text-2xl font-bold">{data.cook?.name}</h1>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
