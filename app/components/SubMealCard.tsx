import { SubscriptionMeal } from "@prisma/client";
import { NavLink, useFetcher } from "@remix-run/react";
import { Tooltip } from "react-tooltip";
import { SubscriptionMealWithMeal } from "~/models/subscriptionMeal.server";
import { daysAbbrCapitalized, daysCapitalized, formatMealTag, mapMealTagToEmoji, sortMealTags } from "~/utils";

export default function SubMealCard({ subMeal }: { subMeal: SubscriptionMealWithMeal }) {
  const fetcher = useFetcher();

  return (
    <div className="border-solid border-2 p-2 rounded-lg">
      <div className="flex flex-col items-center justify-center w-full h-48 bg-gray-100 rounded-lg mb-2">
        <img
          className="object-cover object-center w-full h-full rounded-lg"
          src="https://dummyimage.com/720x600"
          alt={subMeal.meal.title}
          id={`tooltip-${subMeal.meal.id}-tags`}
        />
        <Tooltip
          place="left"
          anchorId={`tooltip-${subMeal.meal.id}-tags`}
        >
          <div className="flex flex-col flex-wrap gap-2">
            {sortMealTags(subMeal.meal.tags).map((tag) => (
              <span>
                {mapMealTagToEmoji(tag)} {formatMealTag(tag)}
              </span>
            ))}
          </div>
        </Tooltip>
      </div>
      <div className="flex flex-col items-start justify-between w-full mt-1">
        <h2 className="text-lg font-medium text-gray-900 title-font">
          {subMeal.meal.title}
        </h2>
        <div className="flex flex-row items-center mt-1" id={`tooltip-${subMeal.meal.id}`}>
          <p>
            <span className="font-bold">${subMeal.price}
            </span>
          </p>
          <svg
            className="w-5 h-5 text-black ml-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <Tooltip
            place="top"
            anchorId={`tooltip-${subMeal.meal.id}`}
            content={`$${subMeal.meal.price} x ${subMeal.quantity} = $${subMeal.price} total`}
          />
        </div>
      </div>

      <div className="flex flex-col items-start justify-between w-full mt-1">
        <p className="font-medium text-gray-900 title-font">
          {subMeal.deliveryHour} on {daysCapitalized[subMeal.deliveryDay]}
        </p>
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
          className="flex mx-auto text-white bg-red-500 py-2 px-4 hover:bg-red-600 rounded my-2"
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