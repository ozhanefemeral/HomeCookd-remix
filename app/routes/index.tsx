import { Link, useLoaderData } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import { useEffect, useState } from "react";
import FeaturedSubscriptionHomePage from "~/components/Subscriptions/FeaturedSubscriptionHomePage";
import SubscribeModal from "~/components/Subscriptions/SubscribeModal";
import { getFeaturedSubscriptions } from "~/models/subscription.server";
import { SubscriptionWithCookAndMeal } from "~/models/subscriptionMeal.server";

import { useOptionalCook, useOptionalUser } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  // const userId = await requireUserId(request);
  const subscriptions = await getFeaturedSubscriptions();
  return json({ subscriptions });
}

export default function Index() {
  const user = useOptionalUser();
  const cook = useOptionalCook();

  const { subscriptions } = useLoaderData<typeof loader>();
  const [clickedSubscription, setClickedSubscription] =
    useState<SubscriptionWithCookAndMeal>();
  const [mealModalEnabled, setMealModalEnabled] = useState(false);

  useEffect(() => {
    // console.log("subscriptions", subscriptions);
  }, [subscriptions]);

  function handleSubscribeClick(subscription: SubscriptionWithCookAndMeal) {
    setClickedSubscription(subscription);
    setMealModalEnabled(true);
  }

  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative sm:overflow-hidden sm:rounded-2xl">
            {/* each element is FeaturedSubscriptionHomePage */}
            <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-6xl">
              Today's Specials!
            </h1>
            {/* 3 cards in a row  */}

            <div className="relative grid grid-cols-1 gap-y-12 gap-x-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {subscriptions.map((subscription) => (
                <FeaturedSubscriptionHomePage
                  subscription={subscription}
                  handleSubscribeClick={handleSubscribeClick}
                />
              ))}
            </div>

            {mealModalEnabled && (
              <SubscribeModal
                open={mealModalEnabled}
                subscription={clickedSubscription}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
