import { Meal } from "@prisma/client";
import React from "react";
import { formatMealTag, mapMealTagToEmoji } from "~/utils";

function CardTags({ meal }: { meal?: Meal }) {
  return (
    <div className="flex flex-col items-center justify-between gap-2 md:flex-row md:items-end">
      {meal!.tags.map((tag) => (
        <div
          className="rounded-lg px-2 py-1 text-sm text-black bg-gray-100 border-gray-300 border overflow-ellipsis whitespace-nowrap overflow-hidden"
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
