import { Subscription } from "@prisma/client";
import { SubscriptionWithCookAndMeal } from "~/models/subscriptionMeal.server";
import { mapMealTagToEmoji, formatMealTag } from "~/utils";
import MealTagTooltip from "../MealTagTooltip";

const FeaturedSubscriptionHomePage = ({
  subscription,
}: {
  subscription: SubscriptionWithCookAndMeal;
}) => {
  const { meal, cook } = subscription;

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
            src={cook.avatar || "https://dummyimage.com/256x256"}
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {subscription.orderHours[1]}
          </div>
        </div>

        {/* meal tags */}
        <div className="absolute bottom-6 left-6 flex items-center gap-2">
          {meal.tags.map((tag) => (
            <div className="rounded-lg bg-gray-200 px-2 py-1 text-xs text-gray-700">
              {mapMealTagToEmoji(tag)}
              {formatMealTag(tag)}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-6 left-6 flex items-center gap-2 rounded-lg bg-gray-200 px-3 py-2 text-xs text-gray-700">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 1.90267C7.35829 1.49647 7.83179 1.20901 8.35747 1.07853C8.88316 0.948053 9.43612 0.980749 9.94277 1.17227C10.4494 1.36379 10.8857 1.70505 11.1937 2.15064C11.5016 2.59623 11.6665 3.12503 11.6665 3.66667C11.6665 4.20831 11.5016 4.7371 11.1937 5.18269C10.8857 5.62829 10.4494 5.96955 9.94277 6.16107C9.43612 6.35259 8.88316 6.38528 8.35747 6.25481C7.83179 6.12433 7.35829 5.83687 7 5.43067M9 13H1V12.3333C1 11.2725 1.42143 10.2551 2.17157 9.50491C2.92172 8.75476 3.93913 8.33333 5 8.33333C6.06087 8.33333 7.07828 8.75476 7.82843 9.50491C8.57857 10.2551 9 11.2725 9 12.3333V13ZM9 13H13V12.3333C13.0001 11.6311 12.8153 10.9413 12.4643 10.3331C12.1133 9.72498 11.6083 9.21995 11.0002 8.86881C10.3922 8.51767 9.70234 8.33279 9.00014 8.33277C8.29795 8.33274 7.60812 8.51757 7 8.86867M7.66667 3.66667C7.66667 4.37391 7.38572 5.05219 6.88562 5.55229C6.38552 6.05238 5.70724 6.33333 5 6.33333C4.29276 6.33333 3.61448 6.05238 3.11438 5.55229C2.61428 5.05219 2.33333 4.37391 2.33333 3.66667C2.33333 2.95942 2.61428 2.28115 3.11438 1.78105C3.61448 1.28095 4.29276 1 5 1C5.70724 1 6.38552 1.28095 6.88562 1.78105C7.38572 2.28115 7.66667 2.95942 7.66667 3.66667Z"
            stroke="#383838"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {subscription.reserveCount} / {subscription.limit}
      </div>

      {/* <div className="mt-2 flex flex-row items-start gap-4">
          {meal &&
            sortMealTags(meal.tags).map((tag) => (
              <MealTagTooltip
                tag={tag}
                key={`${meal.id}-${tag}`}
                id={`${meal.id}-${tag}`}
              />
            ))}
        </div> */}
      <div className="flex w-full flex-col p-6">
        <h1 className="text-2xl font-bold">{subscription.title}</h1>
        <h3 className="mt-2 mb-8 text-sm">{cook.name}</h3>
        {/* green 700, full width, rounded lg button "Sipariş Ver" */}
        <button className="w-full rounded-lg bg-green-700 py-2 text-white">
          Sipariş Ver
        </button>
      </div>
    </div>
  );
};

export default FeaturedSubscriptionHomePage;
