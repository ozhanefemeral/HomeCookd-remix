import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import MealCardBig from "~/components/MealCardBig";
import { getCookByUsername, getCookMeals } from "~/models/cook.server";

export async function loader({ request, params }: LoaderArgs) {
  const { username } = params;
  if (!username) {
    return json({ meals: [], cook: null }, { status: 404 });
  }
  const meals = await getCookMeals(username);
  const cook = await getCookByUsername(username);
  return json({ meals, cook });
}

export default function CookMeals() {
  const data = useLoaderData<typeof loader>();
  return (
    // grid of meals with MealCardSmall
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 overflow-y-auto">
      {data.meals.map((meal) => (
        <MealCardBig key={meal.id} meal={meal} />
      ))}
    </div>
  );
}