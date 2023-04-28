import { Subscription } from "@prisma/client";
import { HomepageSubscription } from "~/models/subscription.server";
import { mapMealTagToEmoji, formatMealTag } from "~/utils";
import CardTags from "../CardTags";
import ReserveCount from "../ReserveCount";
import { Button } from "../../Button";
import { Icon } from "@iconify/react";
import { Tooltip } from "react-tooltip";

type Props = {
  subscription: HomepageSubscription;
  handleSubscribeClick: (subscription: HomepageSubscription) => void;
};

const FeaturedSubscriptionHomePage = ({
  subscription,
  handleSubscribeClick,
}: Props) => {
  const { meal, cook } = subscription;

  const canOrder = subscription.reservationCount < subscription.limit;

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
          <div
            className="slate-900 mt-2 flex items-center justify-center gap-1 text-lg font-bold"
            id={subscription.id}
          >
            <Icon icon="ic:round-access-time" width={18} />
            {subscription.orderHours[0]}
          </div>
          <Tooltip place="left" anchorId={subscription.id} className="tooltip">
            {subscription.orderHours.map((hour) => (
              <div className="text-md flex items-center justify-center gap-1 font-bold">
                {hour}
              </div>
            ))}
          </Tooltip>
        </div>
      </div>

      <ReserveCount
        reservationCount={subscription.reservationCount}
        limit={subscription.limit}
      />

      <div className="flex h-full w-full flex-col gap-4 p-4">
        <div className="mb-2">
          <h1 className="mr-24 text-2xl font-bold">{subscription.title}</h1>
          <h3 className="text-sm">{cook.name}</h3>
        </div>
        {/* green 700, full width, rounded lg button "Order" */}

        {/* align button to bottom */}
        <div className="mt-auto">
          <CardTags meal={meal} />
          <Button
            onClick={() => handleSubscribeClick(subscription!)}
            disabled={!canOrder}
            text="Sipariş Ver"
            className="mt-4 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedSubscriptionHomePage;
