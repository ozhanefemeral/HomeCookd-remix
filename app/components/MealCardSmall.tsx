import { SubscriptionMeal } from "@prisma/client";
import { Link, NavLink, useFetcher } from "@remix-run/react";
import { MealWithCook } from "~/models/meals.server";
import { mapMealTagToEmoji, sortMealTags } from "~/utils";
import MealTagTooltip from "./MealTagTooltip";

type MealCardSmallProps = {
  meal: MealWithCook;
  handleSubscribe: () => void;
}

export default function MealCardSmall({ meal, handleSubscribe }: MealCardSmallProps) {
  return (
    <div className=" border-solid border-2 p-2 rounded-lg relative">
      <div className="flex flex-row w-64 items-start">
        <img
          className="object-cover object-center w-24 h-24 rounded-lg"
          src="https://dummyimage.com/96x96"
          alt={meal.title}
        />
        <div className="flex flex-col ml-2 h-full justify-start">
          <NavLink to={`/meals/${meal.id}`}>
            <h3 className="text-md font-semibold text-primary">{meal.title}</h3>
          </NavLink>
          <NavLink to={`/cook/${meal.cook.username}`}>
            <h3 className="text-sm text-black">{meal.cook.name}</h3>
          </NavLink>
          {/* price */}
          <p className="text-sm text-black">${meal.price}</p>
        </div>
      </div>
      {/* map meal tags with corresponding emojis */}
      <div className="flex flex-row items-start gap-4 mt-2">
        {sortMealTags(meal.tags).map(tag => (
          <MealTagTooltip tag={tag} key={`${meal.id}-${tag}`} id={`${meal.id}-${tag}`} />
        ))}
      </div>

      <div
        className="flex flex-col items-end"
      >
        <input type="hidden" name="mealId" value={meal.id} />
        <button
          className="flex text-white bg-primary py-2 px-4 hover:bg-primary-dark rounded"
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}