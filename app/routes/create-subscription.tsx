import { ActionFunction, json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { createSubscription, createSubscriptionInput } from "~/models/subscription.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const orderHours = formData.get("orderHours");
  const limit = formData.get("limit");
  const price = formData.get("price");
  const mealId = formData.get("mealId");
  const cookedBy = formData.get("cookedBy");

  invariant(title, "title is required");
  invariant(orderHours, "orderHours is required");
  invariant(limit, "limit is required");
  invariant(price, "price is required");
  invariant(mealId, "mealId is required");
  invariant(cookedBy, "cookedBy is required");

  const subscription: createSubscriptionInput = {
    title: title as string,
    orderHours: [orderHours as string],
    // limit is a number
    limit: parseInt(limit as string, 10),
    price: parseInt(price as string, 10),
    meal: mealId as string,
    cook: cookedBy as string,
  };
  try {
    await createSubscription(subscription);
    return json({ status: 201 });
  } catch (e) {
    console.log(e);
    return json(e, { status: 500 });
  }
};
