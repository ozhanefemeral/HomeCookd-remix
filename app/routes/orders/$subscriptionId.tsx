import { useLoaderData } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import { getSubscriptionOrderById } from "~/models/subscription.server";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.subscriptionId, "subscriptionId not found");

  const subscriptionOrder = await getSubscriptionOrderById(
    params.subscriptionId
  );

  invariant(subscriptionOrder, "subscriptionOrder not found");

  return json({ subscriptionOrder });
}

export default function SubscriptionOrder() {
  const data = useLoaderData<typeof loader>();
  const { subscriptionOrder } = data;

  return (
    <div>
      <h1>{subscriptionOrder.subscription.meal.title}</h1>
    </div>
  );
}