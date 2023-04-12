import { Subscription } from "@prisma/client";
import { HomepageSubscription } from "~/models/subscription.server";
import { mapMealTagToEmoji, formatMealTag } from "~/utils";
import CardTags from "./CardTags";
import ReserveCount from "./ReserveCount";
import { Button } from "../Button";
import { Icon } from "@iconify/react";

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
    <div className="xs:w-full relative flex flex-col divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:w-full md:w-96">
      {/* meal image */}
      <div className="relative flex h-52 w-full flex-col items-center justify-center">
        <img
          src={meal.image || "https://dummyimage.com/256x256"}
          alt="meal"
          className="h-full w-full object-cover"
        />
        <div className="absolute -bottom-10 right-6 mt-10 h-20 w-20">
          <img
            className="h-full w-full rounded-full ring-4 ring-white"
            src={cook.cookProfile?.avatar || "https://dummyimage.com/256x256"}
            alt="avatar"
          />
          <div className="slate-900 mt-2 flex items-center justify-center gap-1 text-lg font-bold">
            <Icon icon="material-symbols:nest-clock-farsight-analog-outline" width={18}/>
            {subscription.orderHours[0]}
          </div>
        </div>
      </div>

      <ReserveCount
        reservationCount={subscription.reservationCount}
        limit={subscription.limit}
      />

      <div className="flex w-full flex-col gap-4 p-6">
        <div>
          <h1 className="text-2xl font-bold">{subscription.title}</h1>
          <h3 className="text-sm">{cook.cookProfile?.name}</h3>
        </div>
        {/* green 700, full width, rounded lg button "Order" */}
        <CardTags meal={meal} />
        {/* <button
          className={`w-full rounded-lg bg-amber-600 py-2 text-white ${
            !canOrder && "cursor-not-allowed opacity-50"
          }`}
         
        >
          Sipariş Ver
        </button> */}
        <Button
          onClick={() => handleSubscribeClick(subscription!)}
          disabled={!canOrder}
          text="Sipariş Ver"
        />
      </div>
    </div>
  );
};

export default FeaturedSubscriptionHomePage;
