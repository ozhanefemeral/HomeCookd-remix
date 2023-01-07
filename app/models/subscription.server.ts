import type { Subscription, SubscriptionMeal, User } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getUserSubscriptions(id: User["id"]) {
  return prisma.subscription.findMany({
    where: {
      userId: id,
    },
  });
}

export async function getCookSubscriptions(id: User["id"]) {
  return prisma.subscriptionMeal.findMany({
    where: {
      cookId: id,
    },
    include: {
      meal: true,
    }
  });
}

export async function getSubscriptionById(id: Subscription["id"], includeUser = false) {
  return prisma.subscription.findUnique({
    where: {
      id,
    },
  });
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

export async function deleteSubscription(id: Subscription["id"]) {
  return prisma.subscription.delete({
    where: {
      id,
    },
  });
}

export async function createSubscription(body: any) {
  // first subscription,
  // then subscriptionMeals
  // then connect subscriptionMeals to subscription
  const price = body.meals.reduce((acc: number, meal: SubscriptionMeal) => acc + meal.price, 0);

  // change meals field with meal.id and cook with meal.cookId
  body.meals = body.meals.map((meal: any) => {

    const _meal = meal;
    _meal.mealId = meal.meal.id;
    delete _meal.meal;

    return _meal;
  });



  return prisma.subscription.create({
    data: {
      userId: body.user,
      subscriptionMeals: {
        create: body.meals,
      },
      title: body.title,
      end: body.end,
      start: body.startDate,
      price,
    },
  });
}