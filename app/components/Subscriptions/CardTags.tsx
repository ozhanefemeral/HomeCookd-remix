import type { Meal } from "@prisma/client";
import MealTag from "./MealTag";
import { SerializeFrom } from "@remix-run/server-runtime";

type Props = {
  tags: SerializeFrom<Meal>["tags"];
  justify?: "justify-between" | "justify-center" | "justify-start";
  wrap?: "wrap" | "nowrap";
};

function CardTags({ tags, justify = "justify-between", wrap ="nowrap" }: Props) {
  return (
    <div
      className={`flex flex-row items-center gap-2 md:items-end ${justify} ${wrap}`}
    >
      {tags.map((tag) => (
        <MealTag key={tag} tag={tag} />
      ))}
    </div>
  );
}

export default CardTags;
