import type { Meal, MealTags } from "@prisma/client";
import React from "react";
import { formatMealTag, mapMealTagToEmoji } from "~/utils";

type Props = {
  tag: MealTags;
};

function Tag({ tag }: Props) {
  return (
    <div
      className={`overflow-hidden overflow-ellipsis whitespace-nowrap rounded-lg border border-gray-300 bg-gray-100 px-2 py-1 text-sm text-black`}
      key={`${tag}`}
    >
      {mapMealTagToEmoji(tag)}
      &nbsp;
      {formatMealTag(tag)}
    </div>
  );
}

export default Tag;
