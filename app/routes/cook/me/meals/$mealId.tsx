import React from "react";

import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Button } from "~/components/Button";
import { getMealById } from "~/models/meals.server";
import CardTags from "~/components/Subscriptions/CardTags";

export async function loader({ request, params }: LoaderArgs) {
  const { mealId } = params as { mealId: string };
  invariant(mealId, "Meal ID is required");
  const meal = await getMealById(mealId);

  return json({ meal });
}

function $mealId() {
  const data = useLoaderData<typeof loader>();
  const { meal } = data;
  const navigate = useNavigate();

  function goBack() {
    navigate("/cook/me/subscriptions");
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">{meal.title} Details</h1>
      <hr className="my-4" />

      <p>
        Tags: <CardTags meal={meal} justify="justify-start" />
      </p>

      <p>Published subscriptions:</p>
    </section>
  );
}

export default $mealId;
