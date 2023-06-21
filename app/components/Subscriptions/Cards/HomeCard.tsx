import type { HomepageSubscription } from "~/models/subscription.server";
import CardTags from "../CardTags";
import ReserveCount from "../ReserveDetails";
import { Button } from "../../Button";
import { Icon } from "@iconify/react";
import { Tooltip } from "react-tooltip";
import type { SerializeFrom } from "@remix-run/server-runtime";

type Props = {
  subscription: SerializeFrom<HomepageSubscription>;
  handleSubscribeClick: (
    subscription: SerializeFrom<HomepageSubscription>
  ) => void;
};

const FeaturedSubscriptionHomePage = ({
  subscription,
  handleSubscribeClick,
}: Props) => {
  if (!subscription) return null;
  const { meal, cook } = subscription;

  const canOrder =
    typeof subscription.reservationCount === "number" && 
    subscription.reservationCount < subscription.limit;

  return (
    //card with max width of 360px
    <div className="xs:w-full relative flex flex-col divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:w-full md:min-w-[320px]">
      {/* meal image */}
      <div className="relative flex h-52 w-full flex-col items-center justify-center">
        <img
          src={meal.image || "https://dummyimage.com/256x256"}
          alt="meal"
          className="h-full w-full object-cover"
        />
        <div className="absolute -bottom-10 right-4 mt-10 h-20 w-20">
          <img
            className="h-full w-full rounded-full ring-4 ring-white"
            src={cook.avatar || "https://dummyimage.com/256x256"}
            alt="avatar"
          />
          <h3 className="pt-1 text-center text-sm font-semibold">
            {cook.name}
          </h3>
        </div>
      </div>

      <ReserveCount
        subscription={subscription}
      />

      <div className="flex h-full w-full flex-col gap-4 p-4">
        <div className="mb-2">
          <h1 className="mr-24 text-2xl font-bold">{subscription.title}</h1>
          <p className="text-sm">{subscription.catchphrase}</p>
        </div>
        {/* green 700, full width, rounded lg button "Order" */}

        {/* align button to bottom */}
        <div className="mt-auto">
          <CardTags tags={meal.tags} />
          <Button
            onClick={() => {canOrder && handleSubscribeClick(subscription)}}
            disabled={!canOrder}
            text="Subscribe"
            className="mt-4 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedSubscriptionHomePage;
