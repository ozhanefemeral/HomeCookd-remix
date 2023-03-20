import type { Prisma, Subscription } from "@prisma/client";

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

export type SubscriptionMealWithMeal = Prisma.SubscriptionMealGetPayload<{
  include: {
    meal: true;
  };
}>;

export type SubscriptionWithCookAndMeal = Prisma.SubscriptionGetPayload<{
  include: {
    cook: true;
    meal: true
    };
  }
>;

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

// type for body of createSubscriptionMeal
export type CreateSubscriptionMealBody = {
  subscriptionId: Subscription["id"];
  mealId: Prisma.SubscriptionMealUncheckedCreateInput["mealId"];
  deliveryDay: Prisma.SubscriptionMealUncheckedCreateInput["deliveryDay"];
  quantity: Prisma.SubscriptionMealUncheckedCreateInput["quantity"];
  price: Prisma.SubscriptionMealUncheckedCreateInput["price"];
  deliveryHour: Prisma.SubscriptionMealUncheckedCreateInput["deliveryHour"];
};

export async function createSubscriptionMeal(body: CreateSubscriptionMealBody) {
  return prisma.subscriptionMeal.create({
    data: {
      mealId: body.mealId,
      subscriptionId: body.subscriptionId,
      deliveryDay: body.deliveryDay,
      deliveryHour: body.deliveryHour,
      quantity: body.quantity,
      price: body.price,
    }
  })
}