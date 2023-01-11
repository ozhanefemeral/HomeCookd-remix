import type { Recipe } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getRecipeById(id: Recipe["id"]) {
  return prisma.recipe.findUnique({ where: { id } });
}