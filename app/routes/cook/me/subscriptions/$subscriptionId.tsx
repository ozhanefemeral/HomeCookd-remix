import React from "react";

import { LoaderArgs, json } from "@remix-run/node";
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

  return json({ orders, subscription });
}

function $subscriptionId() {
  const data = useLoaderData<typeof loader>();
  const { orders, subscription } = data;
  const navigate = useNavigate();

  function goBack() {
    navigate("/cook/me/subscriptions");
  }

  return (
    <div>
      {/* <Button text="Go Back" onClick={goBack} variant="tertiary" /> */}

      <section>
        <h1 className="text-2xl font-bold">{subscription.title} Details</h1>
      </section>
    </div>
  );
}

export default $subscriptionId;
