import { Meal } from "@prisma/client";
import MealTag from "./MealTag";

type Props = {
  meal: Meal;
  justify?: "justify-between" | "justify-center" | "justify-start";
};

function CardTags({ meal, justify = "justify-between" }: Props) {
  return (
    <div
      className={`md:just flex flex-row items-center gap-2 md:items-end ${justify}`}
    >
      {meal.tags.map((tag) => (
        <MealTag key={tag} tag={tag} meal={meal} />
      ))}
    </div>
  );
}

export default CardTags;
