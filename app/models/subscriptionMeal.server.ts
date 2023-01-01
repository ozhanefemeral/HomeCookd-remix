import type { Subscription } from "@prisma/client";

import { prisma } from "~/db.server";

export enum DeliveryDay {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

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

export async function getSubscriptionMealsByDay(day: string) {
  // capitalize deliveryDay and check if it's a valid DeliveryDay
  day = day.toUpperCase();
  if (!Object
    .values(DeliveryDay)
    .includes(day as DeliveryDay)) {
    throw new Error("Invalid delivery day");
  }

  // convert deliveryDay to DeliveryDay
  const deliveryDay = DeliveryDay[day as DeliveryDay];

  return prisma.subscriptionMeal.findMany({
    where: {
      deliveryDay
    },
    include: {
      meal: true,
    }
  });
}