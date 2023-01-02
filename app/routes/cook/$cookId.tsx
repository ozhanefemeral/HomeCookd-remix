// remix page where cookId is a param and is used in the loader function
// Path: app\routes\cook\$cookId.tsx

import { Form, useCatch, useLoaderData } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import { getCookById, getCookMeals } from "~/models/cook.server";


// get cookId from params and use it in the loader function
export async function loader({ request, params }: LoaderArgs) {
  const { cookId } = params as { cookId: string };
  const cook = await getCookById(cookId);
  const meals = await getCookMeals(cookId);
  return json({ meals, cook });
}

export default function CookPage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      {/* h1 as cook name */}
      <h1 className="text-2xl font-bold">{data.cook?.name}</h1>
    </div>
  );
}
