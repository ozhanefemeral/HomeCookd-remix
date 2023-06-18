import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";
import { orderSubscription } from "~/models/subscription.server";
import { getUserId, getUserProfile } from "~/session.server";
import { getUser } from "../session.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const form_quantity = formData.get("quantity") as string;
  const form_deliveryTime = formData.get("deliveryTime") as string;
  const subscriptionId = formData.get("subscriptionId") as string;
  const addressId = formData.get("addressId") as string;

  // get current datetime and set the hour to form deliveryTime
  const deliveryTime = new Date();
  // form_deliveryTime is a string like "12:00" so you need to split it and convert it to a number
  const [hours, minutes] = form_deliveryTime.split(":");
  deliveryTime.setHours(Number(hours));
  deliveryTime.setMinutes(Number(minutes));

  const quantity = Number(form_quantity);
  const user = await getUser(request);
  const userId = user?.id;

  // check if all the required fields are present
  invariant(form_quantity, "quantity is required");
  invariant(subscriptionId, "subscriptionId is required");
  invariant(userId, "userId is required");
  invariant(addressId, "addressId is required");

  try {
    const order = await orderSubscription(
      subscriptionId,
      quantity,
      deliveryTime,
      userId,
      addressId,
    );

    invariant(order, "order is required");
    return redirect(`/orders/${order.id}`);

    // return json({ status: 201 });
  } catch (e) {
    console.log(e);

    return json(e, { status: 500 });
  }
};
