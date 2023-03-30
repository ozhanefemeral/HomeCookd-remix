import { Meal } from "@prisma/client";
import MealTag from "./MealTag";

type Props = {
  meal: Meal;
  isCentered?: boolean;
};

function CardTags({ meal, isCentered = false }: Props) {
  return (
    <div
      className={`md:just flex flex-row items-center gap-2 md:items-end ${
        isCentered ? "justify-center" : "justify-between"
      }`}
    >
      {meal.tags.map((tag) => (
        <MealTag key={tag} tag={tag} meal={meal} />
      ))}
    </div>
  );
}

export default CardTags;
