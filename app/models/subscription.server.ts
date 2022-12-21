import type { Subscription, User } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getUserSubscriptions(id: User["id"]) {
  return prisma.subscription.findMany({
    where: {
      userId: id,
    },
  });
}

export async function getSubscriptionById(id: Subscription["id"]) {
  return prisma.subscription.findUnique({
    where: {
      id,
    },
    include: {
      subscriptionMeals: {
        include: {
          meal: true,
        },
      },
    },
  });
}