import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";
import { createSubscriptionMeal, DeliveryDay } from "~/models/subscriptionMeal.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const deliveryHour = formData.get("deliveryHour");
  const deliveryDay = formData.get("deliveryDay");
  const quantity = formData.get("quantity");
  const subscriptionId = formData.get("subscriptionId");
  const mealId = formData.get("mealId");
  const mealBody = formData.get("mealBody")
  // convert mealBody to Meal type
  const meal = JSON.parse(mealBody as string)
  const price = meal.price * parseInt(quantity as string)

  // check if all the required fields are present
  invariant(deliveryHour, "deliveryHour is required");
  invariant(deliveryDay, "deliveryDay is required");
  invariant(quantity, "quantity is required");
  invariant(subscriptionId, "subscriptionId is required");
  invariant(mealId, "mealId is required");

  try {
    await createSubscriptionMeal({
      subscriptionId: subscriptionId as string,
      mealId: mealId as string,
      deliveryDay: deliveryDay as DeliveryDay,
      deliveryHour: deliveryHour as string,
      quantity: parseInt(quantity as string),
      price
    })

    redirect(`/subscription/${subscriptionId}`);

    return json({ status: 201 });
  } catch (e) {
    return json(e, { status: 500 });
  }
};
