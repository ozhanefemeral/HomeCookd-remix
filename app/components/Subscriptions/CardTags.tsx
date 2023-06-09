import type { Meal } from "@prisma/client";
import MealTag from "./MealTag";

type Props = {
  meal: Meal;
  justify?: "justify-between" | "justify-center" | "justify-start";
  wrap?: "wrap" | "nowrap";
};

function CardTags({ meal, justify = "justify-between", wrap ="nowrap" }: Props) {
  return (
    <div
      className={`flex flex-row items-center gap-2 md:items-end ${justify} ${wrap}`}
    >
      {meal.tags.map((tag) => (
        <MealTag key={tag} tag={tag} meal={meal} />
      ))}
    </div>
  );
}

export default CardTags;
