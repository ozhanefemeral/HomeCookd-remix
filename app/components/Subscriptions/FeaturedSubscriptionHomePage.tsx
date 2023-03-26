import { Subscription } from "@prisma/client";
import { HomepageSubscription } from "~/models/subscription.server";
import { SubscriptionWithCookAndMeal } from "~/models/subscriptionMeal.server";
import { mapMealTagToEmoji, formatMealTag } from "~/utils";
import MealTagTooltip from "../MealTagTooltip";
import CardTags from "./CardTags";
import ReserveCount from "./ReserveCount";

type Props = {
  subscription?: HomepageSubscription;
  handleSubscribeClick: (subscription: HomepageSubscription) => void;
};

const FeaturedSubscriptionHomePage = ({
  subscription,
  handleSubscribeClick,
}: Props) => {
  const { meal, cook } = subscription! || {};

  return (
    //card with max width of 360px
    <div className="xs:w-full relative flex flex-col divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:w-full md:w-96">
      {/* meal image */}
      <div className="relative flex h-52 w-full flex-col items-center justify-center">
        <img
          src={meal!.image || "https://dummyimage.com/256x256"}
          alt="meal"
          className="h-full w-full object-cover"
        />
        <div className="absolute -bottom-10 right-6 mt-10 h-20 w-20">
          <img
            className="h-full w-full rounded-full ring-4 ring-white"
            src={cook!.avatar || "https://dummyimage.com/256x256"}
            alt="avatar"
          />
          <div className="slate-900 mt-5 flex items-center justify-center gap-2 text-lg font-bold">
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 4.33333V7L9 9M13 7C13 7.78793 12.8448 8.56815 12.5433 9.2961C12.2417 10.0241 11.7998 10.6855 11.2426 11.2426C10.6855 11.7998 10.0241 12.2417 9.2961 12.5433C8.56815 12.8448 7.78793 13 7 13C6.21207 13 5.43185 12.8448 4.7039 12.5433C3.97595 12.2417 3.31451 11.7998 2.75736 11.2426C2.20021 10.6855 1.75825 10.0241 1.45672 9.2961C1.15519 8.56815 1 7.78793 1 7C1 5.4087 1.63214 3.88258 2.75736 2.75736C3.88258 1.63214 5.4087 1 7 1C8.5913 1 10.1174 1.63214 11.2426 2.75736C12.3679 3.88258 13 5.4087 13 7Z"
                stroke="#3F3F46"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {subscription!.orderHours[0]}
          </div>
        </div>

        {/* meal tags */}
        <CardTags meal={meal} />
      </div>

      <ReserveCount
        reserveCount={subscription!.reservationCount}
        limit={subscription!.limit}
      />

      <div className="flex w-full flex-col p-6">
        <h1 className="text-2xl font-bold">{subscription!.title}</h1>
        <h3 className="mt-2 mb-8 text-sm">{cook!.name}</h3>
        {/* green 700, full width, rounded lg button "Sipariş Ver" */}
        <button
          className="w-full rounded-lg bg-green-700 py-2 text-white"
          onClick={() => handleSubscribeClick(subscription!)}
        >
          Sipariş Ver
        </button>
      </div>
    </div>
  );
};

export default FeaturedSubscriptionHomePage;
