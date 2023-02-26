import { useEffect, useState } from "react";
import { MealWithCook } from "~/models/meals.server";
import { deliveryHours, formatMealTag, mapMealTagToEmoji } from "~/utils";

type MealCardProps = {
  meal: MealWithCook;
  onChange: (
    mealId: string,
    count: number,
    deliveryDay: string,
    deliveryHour: string
  ) => void;
};

export default function SubMealTile({ meal, onChange }: MealCardProps) {
  const [count, setCount] = useState(1);
  const [deliveryDay, setDeliveryDay] = useState("MONDAY");
  const [deliveryHour, setDeliveryHour] = useState("12:00");

  useEffect(() => {
    onChange(meal.id, count, deliveryDay, deliveryHour);
  }, [count]);

  return (
    <div className="rounded-lg p-4 shadow-lg">
      <div className="flex flex-row justify-between gap-4 align-middle">
        <img
          src={meal.image}
          alt={meal.title}
          className="h-20 w-20 rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 align-bottom">
            <h3 className="text-lg font-bold">{meal.title}</h3>
            <span>by {meal.cook.name}</span>
          </div>
          {/* meal tags */}
          <div className="flex flex-row flex-wrap gap-2">
            {meal.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-200 px-2 py-1 text-gray-900"
              >
                {mapMealTagToEmoji(tag)} {formatMealTag(tag)}
              </span>
            ))}
          </div>
          <div className="flex flex-row gap-8">
            <div>
              <label htmlFor="deliveryDay" className="font-semibold">
                Delivery Day
              </label>
              <br />
              <select
                id="deliveryDay"
                name="deliveryDay"
                onChange={(e) => setDeliveryDay(e.target.value)}
              >
                <option value="MONDAY">Monday</option>
                <option value="TUESDAY">Tuesday</option>
                <option value="WEDNESDAY">Wednesday</option>
                <option value="THURSDAY">Thursday</option>
                <option value="FRIDAY">Friday</option>
                <option value="SATURDAY">Saturday</option>
                <option value="SUNDAY">Sunday</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="deliveryHour"
                className="whitespace-nowrap font-semibold"
              >
                Delivery Hour
              </label>
              <br />
              <select
                id="deliveryHour"
                name="deliveryHour"
                onChange={(e) => setDeliveryHour(e.target.value)}
              >
                {deliveryHours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="quantity" className="font-semibold">
                Quantity
              </label>
              <br></br>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min={1}
                defaultValue={1}
                onChange={(e) => setCount(parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
