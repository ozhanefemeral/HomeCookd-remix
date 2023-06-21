import React from "react";

import type { LoaderArgs} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  getOrdersBySubscriptionId,
  getSubscriptionById,
} from "~/models/subscription.server";
import invariant from "tiny-invariant";
import { Button } from "~/components/Button";

export async function loader({ request, params }: LoaderArgs) {
  const { subscriptionId } = params as { subscriptionId: string };
  invariant(subscriptionId, "Subscription ID is required");
  const orders = await getOrdersBySubscriptionId(subscriptionId);
  const subscription = await getSubscriptionById(subscriptionId);

  invariant(orders, "Orders not found");
  invariant(subscription, "Subscription not found");

  return json({ orders, subscription });
}

function $subscriptionId() {
  const data = useLoaderData<typeof loader>();
  const { orders, subscription } = data;
  const navigate = useNavigate();

  function goBack() {
    navigate("/cook/me/subscriptions");
  }

  const isEmpty = orders.length === 0;

  return (
    <section className="w-full border p-4">
      <h1 className="text-2xl font-bold">{subscription.title} Details</h1>
      <hr className="my-4" />
      {isEmpty && <p className="text-center">No orders yet 👀</p>}
      {!isEmpty && (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Quantity</th>
              <th className="text-left">Total Price</th>
              <th className="text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.user.profile?.name}</td>
                <td>{order.quantity}</td>
                <td>{order.quantity * subscription?.price}</td>
                <td>{order.address.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default $subscriptionId;
