import { SubscriptionMeal } from "@prisma/client";
import { NavLink } from "@remix-run/react";
import { SubscriptionMealWithMeal } from "~/models/subscriptionMeal.server";

export default function SubMealCard({ subMeal }: { subMeal: SubscriptionMealWithMeal }) {
  // card with tailwind, placeholder image at top, subMeal.meal.title as title, subMeal.meal.price as price, subMeal.meal.image as image

  return (
    <div className=" border-solid border-2 p-2 rounded-lg">
      <div className="flex flex-col items-center justify-center w-64 h-64 bg-gray-100 rounded-lg">
        <img
          className="object-cover object-center w-full h-full rounded-lg"
          src="https://dummyimage.com/720x600"
          alt={subMeal.meal.title}
        />
      </div>
      <div className="flex flex-col items-start justify-between w-full mt-4">
        <h2 className="text-lg font-medium text-gray-900 title-font">
          {subMeal.meal.title}
        </h2>
        <p className="mt-1">${subMeal.meal.price}</p>
      </div>
      <div className="flex items-center flex-wrap ">
        <NavLink className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" to={`/cook/${subMeal.meal.cookedBy}`}>
          See more from the same cook
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </NavLink>
      </div>
    </div>
  );
}