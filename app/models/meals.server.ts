import type { Meal, Cook } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getMealsByCookId(id: Cook["id"]) {
  return prisma.meal.findMany({
    where: {
      cookId: id,
    },
  });
}

export async function getMealById(id: Meal["id"]) {
  return prisma.meal.findUnique({
    where: {
      id,
    },
  });
}

export async function getRandomMeals() {
  return prisma.meal.findMany({
    take: 3,
    orderBy: {
      id: "asc",
    },
  });
}

export async function getRandomMeal() {
  return prisma.meal.findFirst({
  });
}