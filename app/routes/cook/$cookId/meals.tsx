// get cook id by params and fetch meals
import { Outlet, useLoaderData } from "@remix-run/react";
import { json, LoaderArgs, LoaderFunction } from "@remix-run/server-runtime";
import MealCardSmall from "~/components/MealCardSmall";
import { getCookById } from "~/models/cook.server";
import { getMealsByCookId } from "~/models/meals.server";

export async function loader({ request, params }: LoaderArgs) {
  const cookId = params.cookId as string;
  const meals = await getMealsByCookId(cookId);
  const cook = await getCookById(cookId);
  return json({ meals, cook });
}

export default function CookMeals() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      {/* Meals h3 */}
      <h3 className="text-2xl font-bold">Meals</h3>
      {/* meals */}
      {data.meals.map((meal) => (
        <MealCardSmall key={meal.id} meal={meal} />
      ))}
    </div>
  );
}