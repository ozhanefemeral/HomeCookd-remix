import type { Subscription, SubscriptionMeal, User } from "@prisma/client";

import { prisma } from "~/db.server";

export type HomepageSubscription = Subscription & {
  reservationCount?: number;
};

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
    },
  });
}

export async function getSubscriptionById(
  id: Subscription["id"],
  includeUser = false
) {
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
    },
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
  const price = body.meals.reduce(
    (acc: number, meal: SubscriptionMeal) => acc + meal.price,
    0
  );

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

export async function getFeaturedSubscriptions() {
  // get 3 random subscriptions
  const subscriptions = (await prisma.subscription.findMany({
    // random 3 subscriptions
    take: 3,
    include: {
      cook: true,
      meal: true,
    },
  })) as HomepageSubscription[];

  // find how many reservations each subscription has
  const reservations = await prisma.subscriptionOrder.findMany({
    where: {
      subscriptionId: {
        in: subscriptions.map((s) => s.id),
      },
    },
    select: {
      subscriptionId: true,
      quantity: true,
    },
  });

  // add reservations to subscriptions
  return subscriptions.map((s) => {
    const _s = s;

    // each reservation has a quantity so we need to sum them
    _s.reservationCount = reservations
      .filter((r) => r.subscriptionId === s.id)
      .reduce((acc, r) => acc + r.quantity, 0);

    return _s;
  });
}

export async function orderSubscription(
  id: Subscription["id"],
  quantity: number,
  deliveryTime: Date,
  userId: User["id"]
) {
  const subscription = await prisma.subscription.findUnique({
    where: {
      id,
    },
    select: {
      orders: true,
      limit: true,
    },
  });

  const totalOrders = subscription!.orders.reduce(
    (acc, order) => acc + order.quantity,
    0
  );

  if (
    !subscription ||
    totalOrders + quantity > subscription.limit
  ) {
    return null;
  }

  return prisma.subscriptionOrder.create({
    data: {
      subscriptionId: id,
      quantity,
      deliveryTime,
      userId,
    },
  });
}
