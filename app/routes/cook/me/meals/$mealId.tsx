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
    <section>
      <h1 className="text-2xl font-bold">
        <img src={meal.image} className="w-2/4" alt="" />
        {meal.title} Details</h1>
      <hr className="my-4" />

      <p className="mb-2">
        Tags: <CardTags meal={meal} justify="justify-start" />
      </p>

      <p className="mb-2">Published: {meal.totalPublished}</p>
      <p className="mb-2">Ordered: {meal.totalOrdered}</p>
      <p className="mb-2">Earned: {meal.totalEarned}</p>


    </section>
  );
}

export default $mealId;
