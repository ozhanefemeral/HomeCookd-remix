import React from "react";

import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Button } from "~/components/Button";
import { getMealById, getMealDetails } from "~/models/meals.server";
import CardTags from "~/components/Subscriptions/CardTags";

export async function loader({ request, params }: LoaderArgs) {
  const { mealId } = params as { mealId: string };
  invariant(mealId, "Meal ID is required");
  const meal = await getMealDetails(mealId);

  return json({ meal });
}

function $mealId() {
  const data = useLoaderData<typeof loader>();
  const { meal } = data;

  return (
    <section className="border p-4">
      <div className="flex gap-4">
        <img src={meal.image} className="w-2/4" alt="" />
        <div>
          <h1 className="w-full text-center text-2xl font-bold">
            {meal.title} Details
          </h1>
          <p className="mb-2">
            Tags: <CardTags meal={meal} justify="justify-start" wrap="wrap" />
          </p>

          <p className="mb-2">Published: {meal.totalPublished}</p>
          <p className="mb-2">Ordered: {meal.totalOrdered}</p>
          <p className="mb-2">Earned: {meal.totalEarned}</p>
        </div>
      </div>
    </section>
  );
}

export default $mealId;
