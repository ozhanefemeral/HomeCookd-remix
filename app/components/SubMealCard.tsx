import { SubscriptionMeal } from "@prisma/client";
import { SubscriptionMealWithMeal } from "~/models/subscriptionMeal.server";

export default function SubMealCard({ subMeal }: { subMeal: SubscriptionMealWithMeal }) {
  // card with tailwind, placeholder image at top, subMeal.meal.title as title, subMeal.meal.price as price, subMeal.meal.image as image

  return (
    <div className=" border-solid border-2 p-2 rounded">
      <div className="flex flex-col items-center justify-center w-full h-64 bg-gray-100 rounded-lg">
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
    </div>
  );
}