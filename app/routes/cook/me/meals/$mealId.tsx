import React from "react";

import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Button } from "~/components/Button";
import { getMealById, getMealDetails } from "~/models/meals.server";
import CardTags from "~/components/Subscriptions/CardTags";
import { joinIngredients } from "~/utils";

export async function loader({ request, params }: LoaderArgs) {
  const { mealId } = params as { mealId: string };
  invariant(mealId, "Meal ID is required");
  const meal = await getMealDetails(mealId);

  return json({ meal });
}

function $mealId() {
  const data = useLoaderData<typeof loader>();
  const { meal } = data;

  const { nutrition } = meal;

  return (
    <section className="border p-4 rounded-md">
      <div className="flex gap-4">
        <img src={meal.image} className="w-2/4" alt="" />
        <div>
          <h1 className="w-full text-center text-2xl font-bold">
            {meal.title} Details
          </h1>

          <p className="mb-2">Published: {meal.totalPublished}</p>
          <p className="mb-2">Ordered: {meal.totalOrdered}</p>
          <p className="mb-2">Earned: {meal.totalEarned}</p>
        </div>
      </div>
      <div className="my-4">
        <CardTags meal={meal} justify="justify-start" wrap="wrap" />
      </div>
      {nutrition && (
        <div className="flex gap-4 my-4">
          <div className="w-full">
            <h1 className="text-xl font-bold">Nutrition</h1>
            <ul>
              <li>Calories: {nutrition.calories}</li>
              <li>Carbs: {nutrition.carbs}</li>
              <li>Fat: {nutrition.fat}</li>
              <li>Protein: {nutrition.protein}</li>
            </ul>
          </div>
          <div>
            <h1 className="text-xl font-bold">Ingredients</h1>
            {nutrition.ingredients && (
              <p>{joinIngredients(nutrition.ingredients)}</p>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button text="Edit" />
        <Button text="Delete" variant="tertiary" />
      </div>
    </section>
  );
}

export default $mealId;
