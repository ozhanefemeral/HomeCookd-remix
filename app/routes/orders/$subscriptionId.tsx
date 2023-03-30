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

  const dateNow = new Date();
  const deliveryDateTime = new Date(subscriptionOrder.deliveryTime);
  const diffTime = Math.abs(deliveryDateTime.getTime() - dateNow.getTime());

  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.ceil((diffTime / (1000 * 60)) % 60);

  return (
    <div>
      {/* delivery hour minus dateNow for how much time left */}
      <h1 className="py-6 text-2xl font-bold">
        {diffHours} hours {diffMinutes} minutes left <br />
        <span className="text-xl font-normal">
          for you to have your <br />{" "}
        </span>
        {subscriptionOrder.subscription.meal.title}
      </h1>
    </div>
  );
}