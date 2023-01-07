import { SubscriptionMeal } from "@prisma/client";
import { NavLink, useFetcher } from "@remix-run/react";
import { SubscriptionMealWithMeal } from "~/models/subscriptionMeal.server";

export default function SubMealCard({ subMeal }: { subMeal: SubscriptionMealWithMeal }) {
  const fetcher = useFetcher();

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
        <p className="mt-1">${subMeal.meal.price} x {subMeal.quantity} = <span className="font-bold">${subMeal.price} total</span></p>
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

      {/* delete button */}
      <fetcher.Form
        method="post"
        action="/delete-subscription-meal"
        onClick={(e) => {
          if (!confirm("Are you sure you want to delete this meal?")) {
            e.preventDefault();
          }
        }}
      >
        {/* red delete button as submit */}
        <button
          type="submit"
          className="flex mx-auto text-white bg-red-500 py-1 px-2 hover:bg-red-600 rounded"
        >
          Delete
        </button>
        <input
          type="hidden"
          name="id"
          value={subMeal.id}
        />
      </fetcher.Form>
    </div>
  );
}