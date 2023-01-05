import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteSubscriptionMeal } from "~/models/subscriptionMeal.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const commentId = formData.get("id");

  invariant(commentId, "id is required");

  try {
    await deleteSubscriptionMeal(commentId.toString());
    return json({ status: 200 });
  } catch (e) {
    return json(e, { status: 500 });
  }
};
