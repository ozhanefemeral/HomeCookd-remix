import { useLoaderData } from "@remix-run/react";
import { LoaderArgs } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import CreateSubscriptionForm from "~/components/Subscriptions/CreateSubscriptionForm";
import {
  getSubscriptionWithMeal,
} from "~/models/subscription.server";
import { requireUser } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser(request);
  const subscriptionId = params.subscriptionId;

  invariant(user, "You must be logged in to view this page");
  invariant(subscriptionId, "You must provide a subscription id");

  const subscription = await getSubscriptionWithMeal(subscriptionId);

  return { user, subscription };
}

function createSubscription() {
  const data = useLoaderData<typeof loader>();
  const { user, subscription } = data;

  return (
    <div>
      {/* tailwind h1 */}
      <h1 className="text-2xl font-bold">Repeat Subscription</h1>
      <CreateSubscriptionForm user={user} />
    </div>
  );
}

export default createSubscription;
