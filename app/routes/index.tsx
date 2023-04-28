import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import { useEffect, useState } from "react";
import { Button } from "~/components/Button";
import SubscriptionCard from "~/components/Subscriptions/Cards/HomeCard";
import SubscribeModal from "~/components/Subscriptions/SubscribeModal";
import {
  getFeaturedSubscriptions,
  getTodaysSubscriptions,
  HomepageSubscription,
} from "~/models/subscription.server";

import AppLogo from "../assets/svg/enfes_logo.svg";
import { useOptionalCook, useOptionalUser } from "~/utils";
import { FeaturedSubscriptions } from "~/components/Subscriptions/Featured/FeaturedSubscriptions";
import { useSubscribeModalContext } from "~/contexts/SubscribeModalContext";

export async function loader({ request }: LoaderArgs) {
  // const userId = await requireUserId(request);
  const featuredSubscriptions = await getFeaturedSubscriptions();
  const todaysSubscriptions = await getTodaysSubscriptions();
  return json({ featuredSubscriptions, todaysSubscriptions });
}

export default function Index() {
  const user = useOptionalUser();
  const navigate = useNavigate();
  const {
    isEnabled: mealModalEnabled,
    subscription: clickedSubscription,
    setIsEnabled: setMealModalEnabled,
    setSubscription: setClickedSubscription,
  } = useSubscribeModalContext();

  const { featuredSubscriptions, todaysSubscriptions } =
    useLoaderData<typeof loader>();

  function handleSubscribeClick(subscription: HomepageSubscription) {
    if (user) {
      setClickedSubscription(subscription);
      setMealModalEnabled(true);
    } else {
      navigate("/login");
    }
  }

  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      {mealModalEnabled && (
        <SubscribeModal
          subscription={clickedSubscription}
          isEnabled={mealModalEnabled}
          setIsEnabled={setMealModalEnabled}
        />
      )}
      <Link
        to="/"
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
        }}
      >
        <img src={AppLogo} width={80} />
      </Link>
      {user && (
        <Link to="/cook/me" className="absolute top-4 right-4">
          <Button
            text="Dashboard"
            variant="primary"
            icon="fluent:food-pizza-20-filled"
          />
        </Link>
      )}
      {!user && (
        <Link to="/login" className="absolute top-4 right-4">
          <Button
            text="Login"
            variant="primary"
            icon="fluent:food-pizza-20-filled"
          />
        </Link>
      )}

      <div className="mt-16 w-full sm:pb-16">
        <div className="sm:px-6 lg:px-8">
          <FeaturedSubscriptions
            subscriptions={featuredSubscriptions}
            handleSubscribeClick={handleSubscribeClick}
          />
        </div>

        <div className="mt-16 sm:pb-16 md:mx-4">
          <h3 className="mb-2 ml-4 text-4xl font-bold tracking-tight">
            Around you 📍
          </h3>
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 p-4  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {todaysSubscriptions.map((subscription) => (
              <SubscriptionCard
                subscription={subscription}
                handleSubscribeClick={handleSubscribeClick}
                key={subscription.id}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
