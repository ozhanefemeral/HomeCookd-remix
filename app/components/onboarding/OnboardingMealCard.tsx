import { useState } from "react";
import { MealWithCook } from "~/models/meals.server";
import { formatMealTag, mapMealTagToEmoji } from "~/utils";

type MealCardProps = {
  meal: MealWithCook;
  onClick?: () => void;
};

export default function OnboardingMealCard({ meal, onClick }: MealCardProps) {
  const [isSelected, setIsSelected] = useState(false);

  const clickHandler = (e: React.MouseEvent) => {
    setIsSelected(!isSelected);
    onClick?.();
  };

  return (
    <div
      className={`rounded-lg p-4 shadow-lg hover:cursor-pointer ${
        isSelected && "bg-violet-400"
      }`}
      onClick={clickHandler}
    >
      {/* image on top, meal name and cook name below */}
      <div className="flex flex-col">
        <img src={meal.image} alt={meal.title} className="rounded-lg" />
        <div className="my-2">
          <h3 className="text-lg font-bold">{meal.title}</h3>
          <span>by {meal.cook.name}</span>
        </div>
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
  );
}
