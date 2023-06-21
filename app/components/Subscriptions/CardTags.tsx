import type { Meal } from "@prisma/client";
import MealTag from "./MealTag";
import type { SerializeFrom } from "@remix-run/server-runtime";

type Props = {
  tags: SerializeFrom<Meal>["tags"];
  justify?: "justify-start" | "justify-center" | "justify-between";
  wrap?: "flex-wrap" | "flex-nowrap";
};

function CardTags({ tags, justify = "justify-start", wrap ="flex-nowrap" }: Props) {
  return (
    <div
      className={`flex flex-row w-full items-center gap-2 md:items-end ${justify} ${wrap}`}
    >
      {tags.map((tag) => (
        <MealTag key={tag} tag={tag} />
      ))}
    </div>
  );
}

export default CardTags;
