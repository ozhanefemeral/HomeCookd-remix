import { Meal } from "@prisma/client";
import React from "react";
import { formatMealTag, mapMealTagToEmoji } from "~/utils";

function CardTags({ meal }: { meal?: Meal }) {
  return (
    <div className="absolute bottom-6 left-6 flex items-center gap-2">
      {meal!.tags.map((tag) => (
        <div
          className="rounded-lg bg-gray-200 px-2 py-1 text-xs text-gray-700"
          key={`${meal!.id}-${tag}`}
        >
          {mapMealTagToEmoji(tag)}
          {formatMealTag(tag)}
        </div>
      ))}
    </div>
  );
}

export default CardTags;
