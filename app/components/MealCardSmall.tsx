import { SubscriptionMeal } from "@prisma/client";
import { NavLink } from "@remix-run/react";
import { MealWithCook } from "~/models/meals.server";

export default function MealCardSmall({ meal }: { meal: MealWithCook }) {

  return (
    <div className=" border-solid border-2 p-2 rounded-lg relative">
      <div className="flex flex-row w-64 h-20 items-start">
        <img
          className="object-cover object-center w-16 h-16 rounded-lg"
          src="https://dummyimage.com/64x64"
          alt={meal.title}
        />
        <div className="flex flex-col ml-2 h-full justify-start">
          <NavLink to={`/meals/${meal.id}`}>
            <h3 className="text-md font-semibold text-primary">{meal.title}</h3>
          </NavLink>
          <NavLink to={`/cook/${meal.cook.id}`}>
            <h3 className="text-sm text-black">{meal.cook.name}</h3>
          </NavLink>
          {/* price */}
          <p className="text-sm text-black">${meal.price}</p>
        </div>
      </div>
      <div className="absolute bottom-1 right-1">
        {/* 🔥 💎 🌿 🏋️‍♀️ 👪 */}
      </div>
    </div>
  );
}