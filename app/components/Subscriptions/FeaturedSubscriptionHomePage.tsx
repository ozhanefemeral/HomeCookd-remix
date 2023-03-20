import { Subscription } from "@prisma/client";
import { SubscriptionWithCookAndMeal } from "~/models/subscriptionMeal.server";
import { sortMealTags } from "~/utils";
import MealTagTooltip from "../MealTagTooltip";

const FeaturedSubscriptionHomePage = ({
  subscription,
}: {
  subscription: SubscriptionWithCookAndMeal;
}) => {
  const { meal, cook } = subscription;

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-lg shadow-lg">
      <div className="flex h-64 w-full flex-col items-center justify-center overflow-hidden bg-gray-100">
        {/* avatar on float left */}
        <div className="h-12 w-12 rounded-2xl">
          <img
            src="https://dummyimage.com/256x256"
            alt="avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <img
          src="https://dummyimage.com/256x256"
          alt="meal"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col space-y-2 py-4">
        <h1 className="text-center text-xl font-bold text-primary">
          {subscription.title}
        </h1>
        {/* <h3 className="text-center text-lg font-bold text-black">
          {subscription.price} ₺
        </h3> */}
        <div className="mt-2 flex flex-row items-start gap-4">
          {meal &&
            sortMealTags(meal.tags).map((tag) => (
              <MealTagTooltip
                tag={tag}
                key={`${meal.id}-${tag}`}
                id={`${meal.id}-${tag}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSubscriptionHomePage;