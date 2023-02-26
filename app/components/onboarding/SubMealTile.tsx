import { useEffect, useState } from "react";
import { MealWithCook } from "~/models/meals.server";
import { formatMealTag, mapMealTagToEmoji } from "~/utils";

type MealCardProps = {
  meal: MealWithCook;
  onChange: (mealId: string, count: number) => void;
};

export default function SubMealTile({ meal, onChange }: MealCardProps) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    onChange(meal.id, count);
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
        </div>
        <div className="flex flex-col gap-2">
          <button disabled={count <= 1} onClick={() => setCount(count - 1)}>
            -
          </button>
          <span>{count}</span>
          <button disabled={count >= 10} onClick={() => setCount(count + 1)}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}
