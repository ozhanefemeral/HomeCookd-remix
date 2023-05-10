import { MealWithCook } from "~/models/meals.server";

export default function MealCardBig({ meal }: { meal: MealWithCook }) {

  return (
    // big card with image on top and meal name, cook name and price on bottom
    <div className="flex flex-col items-center justify-center w-full overflow-hidden rounded-lg shadow-lg">
      <div className="flex flex-col items-center justify-center w-full h-64 overflow-hidden bg-gray-100">
        <img src="https://dummyimage.com/256x256" alt="meal" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col w-full space-y-2 py-4">
        <h1 className="text-xl font-bold text-center text-primary">{meal.title}</h1>
        {/* <p className="text-sm text-center text-gray-600">{meal.cook.name}</p> */}
        <h3 className="text-lg text-center text-black font-bold">{meal.price} ₺</h3>
      </div>
    </div>
  );
}