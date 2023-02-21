import type { Meal, Cook, Prisma, MealTags } from "@prisma/client";

import { prisma } from "~/db.server";

export type MealWithCook = Prisma.MealGetPayload<{
  include: {
    cook: true;
  };
}>;

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

export async function getAllMeals() {
  return prisma.meal.findMany({
    include: {
      cook: true,
    }
  });
}

export async function createMeal(
  data: Prisma.MealCreateInput
) {
  return prisma.meal.create({
    data: {
      ...data,
    },
  });
}

// get 5 random meal which includes interested tags but not including disliked tags

export async function getMealByTags(
  interested: MealTags[],
  dislikedTags: MealTags[]
) {
  return prisma.meal.findMany({
    where: {
      tags: {
        hasSome: interested,
      },
      NOT: {
        tags: {
          hasSome: dislikedTags,
        },
      },
    },
    take: 5,
    orderBy: {
      id: "asc",
    },
  });
}
