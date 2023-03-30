import { Meal, MealTags } from "@prisma/client";
import React from "react";
import { formatMealTag, mapMealTagToEmoji } from "~/utils";

type Props = {
  meal: Meal;
  tag: MealTags;
};

function Tag({ meal, tag }: Props) {
  return (
    <div
      className={`overflow-hidden overflow-ellipsis whitespace-nowrap rounded-lg border border-gray-300 bg-gray-100 px-2 py-1 text-sm text-black`}
      key={`${meal.id}-${tag}`}
    >
      {mapMealTagToEmoji(tag)}
      &nbsp;
      {formatMealTag(tag)}
    </div>
  );
}

export default Tag;
