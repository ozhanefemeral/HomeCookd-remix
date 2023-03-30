import { Meal } from "@prisma/client";
import { type } from "os";
import React from "react";
import { formatMealTag, mapMealTagToEmoji } from "~/utils";

type Props = {
  meal: Meal;
  isCentered?: boolean;
};

function CardTags({ meal, isCentered = false }: Props) {
  return (
    <div
      className={`flex flex-col items-center gap-2 md:flex-row md:items-end ${
        isCentered ? "justify-center" : "justify-between"
      }`}
    >
      {meal!.tags.map((tag) => (
        <div
          className={`overflow-hidden overflow-ellipsis whitespace-nowrap rounded-lg border border-gray-300 bg-gray-100 px-2 py-1 text-sm text-black`}
          key={`${meal!.id}-${tag}`}
        >
          {mapMealTagToEmoji(tag)}
          &nbsp;
          {formatMealTag(tag)}
        </div>
      ))}
    </div>
  );
}

export default CardTags;
