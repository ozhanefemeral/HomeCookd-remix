import { Meal, Prisma, User } from "@prisma/client";

import { prisma } from "~/db.server";

const selectMealDetail = Prisma.validator<Prisma.MealArgs>()({
  include: {
    cook: true,
    nutrition: true,
  },
});

export type MealDetail = Prisma.MealGetPayload<typeof selectMealDetail> & {
  totalEarned: number;
  totalOrdered: number;
  totalPublished: number;
};

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

export async function getMealsByUserId(cookedBy: User["id"]) {
  return prisma.meal.findMany({
    where: {
      cookedBy
    },
  });
}

export async function getMealDetails(id: Meal["id"]) {
  const meal = await prisma.meal.findUnique({
    where: {
      id,
    },
    include: {
      nutrition: true,
    }
  }) as MealDetail;

  const totalPublished = await prisma.subscription.findMany({
    where: {
      mealId: id,
    },
    include: {
      orders: true,
    }
  });

  // each order in the subscription has quantity
  // earned can be calculated by multiplying the quantity with the price and summing it up
  const totalEarned = totalPublished.reduce((acc, curr) => {
    return acc + curr.orders.reduce((acc, curr) => {
      return acc + curr.quantity * meal.price;
    }, 0);
  }, 0);

  // total ordered is sum of all quantities in all orders
  const totalOrdered = totalPublished.reduce((acc, curr) => {
    return acc + curr.orders.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);
  }, 0);

  return {
    ...meal,
    totalEarned,
    totalOrdered,
    totalPublished: totalPublished.length,
  };
}