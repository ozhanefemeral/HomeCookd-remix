import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import type { LoaderArgs, SerializeFrom } from "@remix-run/server-runtime";
import { useEffect, useState } from "react";
import { Button } from "~/components/Button";
import SubscriptionCard from "~/components/Subscriptions/Cards/HomeCard";
import SubscribeForm from "~/components/Subscriptions/SubscribeForm";
import { json } from "@remix-run/node";
import type { HomepageSubscription } from "~/models/subscription.server";
import {
  getExpiringSubscriptions,
  getFeaturedSubscriptions,
  getTodaysSubscriptions,
} from "~/models/subscription.server";

import AppLogo from "../assets/img/homecookd_logo.png";
import { useOptionalUser } from "~/utils";
import { FeaturedSubscriptions } from "~/components/Subscriptions/Featured/FeaturedSubscriptions";
import { useSubscribeFormContext } from "~/contexts/SubscribeModalContext";
import { useModalContext } from "~/contexts/ModalContext";

export async function loader({ request }: LoaderArgs) {
  // const userId = await requireUserId(request);
  const featuredSubscriptions = (await getFeaturedSubscriptions()) || [];
  const todaysSubscriptions = (await getTodaysSubscriptions()) || [];
  const expiringSubscriptions = (await getExpiringSubscriptions()) || [];
  return json({
    featuredSubscriptions,
    todaysSubscriptions,
    expiringSubscriptions,
  });
}

export default function Index() {
  const user = useOptionalUser();
  const navigate = useNavigate();
  const { setSubscription: setClickedSubscription } = useSubscribeFormContext();
  const { setModalChildren } = useModalContext();

  const { featuredSubscriptions, todaysSubscriptions, expiringSubscriptions } =
    useLoaderData<typeof loader>();

  function handleSubscribeClick(
    subscription: SerializeFrom<HomepageSubscription>
  ) {
    if (user) {
      setClickedSubscription(subscription);
      setModalChildren(<SubscribeForm />);
    } else {
      navigate("/login");
    }
  }

  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <Link
        to="/"
        style={{
          position: "absolute",
          top: "16px",
          left: "32px",
        }}
      >
        <img src={AppLogo} width={120} alt="Enfes Logo" />
      </Link>
      {user && (
        <Link to="/cook/me" className="absolute top-4 right-8">
          <Button
            text="Dashboard"
            variant="primary"
            icon="fluent:food-pizza-20-filled"
          />
        </Link>
      )}
      {!user && (
        <Link to="/login" className="absolute top-4 right-8">
          <Button
            text="Login"
            variant="primary"
            icon="fluent:food-pizza-20-filled"
          />
        </Link>
      )}

      <div className="flex w-full flex-col gap-8 px-8 pt-20 sm:pb-16">
        <FeaturedSubscriptions
          subscriptions={featuredSubscriptions}
          handleSubscribeClick={handleSubscribeClick}
        />

        {expiringSubscriptions.length > 0 && (
          <div>
            <h3 className="pb-4 text-4xl font-bold tracking-tight">
              Expiring Soon ⏳
            </h3>
            <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
              {expiringSubscriptions.map((subscription) => (
                <SubscriptionCard
                  subscription={subscription}
                  handleSubscribeClick={handleSubscribeClick}
                  key={subscription.id}
                />
              ))}
            </div>
          </div>
        )}

        {todaysSubscriptions.length > 0 && (
          <div>
            <h3 className="pb-4 text-4xl font-bold tracking-tight">
              Today's Specials 🍕
            </h3>
            <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {todaysSubscriptions.map((subscription) => (
                <SubscriptionCard
                  subscription={subscription}
                  handleSubscribeClick={handleSubscribeClick}
                  key={subscription.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
