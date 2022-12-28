import type { Subscription } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getSubscriptionMeals(id: Subscription["id"]) {
  return prisma.subscriptionMeal.findMany({
    where: {
      subscriptionId: id,
    },
    include: {
      meal: true,
    }
  });
}

export async function getSubscriptionMealById(id: Subscription["id"]) {
  return prisma.subscriptionMeal.findUnique({
    where: {
      id,
    },
    include: {
      meal: true,
    }
  });
}

export async function deleteSubscriptionMeal(id: Subscription["id"]) {
  return prisma.subscriptionMeal.delete({
    where: {
      id,
    },
  });
}