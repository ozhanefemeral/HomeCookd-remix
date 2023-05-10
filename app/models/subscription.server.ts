import type { Subscription, SubscriptionOrder, User } from "@prisma/client";
import { Prisma } from "@prisma/client";

import { prisma } from "~/db.server";
// export type HomepageSubscription = Subscription & {
//   reservationCount?: number;
// };

export type createSubscriptionInput = {
  title: Subscription["title"];
  orderHours: Subscription["orderHours"];
  limit: Subscription["limit"];
  meal: Subscription["mealId"];
  price: Subscription["price"];
  cook: Subscription["cookedBy"];
};

const selectSubscriptionWithMeal = Prisma.validator<Prisma.SubscriptionArgs>()({
  include: {
    meal: true,
  },
});

export type SubscriptionWithMeal = Prisma.SubscriptionGetPayload<
  typeof selectSubscriptionWithMeal
>;

const selectHomepageSubscription = Prisma.validator<Prisma.SubscriptionArgs>()({
  include: {
    cook: true,
    meal: true,
  },
});

export type HomepageSubscription = Prisma.SubscriptionGetPayload<
  typeof selectHomepageSubscription
> & {
  reservationCount: number;
};

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

export async function deleteSubscription(id: Subscription["id"]) {
  return prisma.subscription.delete({
    where: {
      id,
    },
  });
}

export async function createSubscription(subscription: createSubscriptionInput) {
  return prisma.subscription.create({
    data: {
      title: subscription.title,
      orderHours: subscription.orderHours,
      limit: subscription.limit,
      mealId: subscription.meal,
      price: subscription.price,
      cookedBy: subscription.cook,
    }
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

  if (!subscription || totalOrders + quantity > subscription.limit) {
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

export async function getSubscriptionOrderById(id: SubscriptionOrder["id"]) {
  return prisma.subscriptionOrder.findUnique({
    where: {
      id,
    },
    include: {
      subscription: {
        include: {
          meal: true,
          cook: true,
        },
      },
    },
  });
}

export async function getSubscriptionsByUserId(id: User["id"]) {
  const subscriptions = (await prisma.subscription.findMany({
    where: {
      cookedBy: id,
    },
    include: {
      meal: true,
    },
  })) as HomepageSubscription[];

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

  return subscriptions.map((s) => {
    const _s = s;

    _s.reservationCount = reservations
      .filter((r) => r.subscriptionId === s.id)
      .reduce((acc, r) => acc + r.quantity, 0);

    return _s;
  });
}

export async function getOrdersBySubscriptionId(id: Subscription["id"]) {
  return prisma.subscriptionOrder.findMany({
    where: {
      subscriptionId: id,
    },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  });
}

export async function getTodaysSubscriptions(page = 0, limit = 8) {
  const subscriptions = (await prisma.subscription.findMany({
    where: {
      dateStart: {
        gte: new Date(),
      },
    },
    include: {
      cook: true,
      meal: true,
    },
    skip: page * limit,
    take: limit,
  })) as HomepageSubscription[];

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

  return subscriptions.map((s) => {
    const _s = s;

    _s.reservationCount = reservations
      .filter((r) => r.subscriptionId === s.id)
      .reduce((acc, r) => acc + r.quantity, 0);

    return _s;
  });
}

// a function for getting subscriptions that orderHours is less than 2 hours
// orderHours are type string[] such as ["12:00", "13:00", "14:00"]
// so we need to get the current hour and check if it is less than 2 hours
export async function getExpiringSubscriptions(page = 0, limit = 8) {
  const hourNow = new Date().getHours();
  const hourRange = [`${hourNow}:00`, `${hourNow + 1}:00`, `${hourNow + 2}:00`];

  const subscriptions = (await prisma.subscription.findMany({
    where: {
      orderHours: {
        hasSome: hourRange.map((h) => h.toString()),
      },
    },
    include: {
      cook: true,
      meal: true,
    },
    skip: page * limit,
    take: limit,
  })) as HomepageSubscription[];

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

  return subscriptions.map((s) => {
    const _s = s;

    _s.reservationCount = reservations
      .filter((r) => r.subscriptionId === s.id)
      .reduce((acc, r) => acc + r.quantity, 0);

    return _s;
  });
}

export async function getSubscriptionWithMeal(id: Subscription["id"]) {
  return prisma.subscription.findUnique({
    where: {
      id,
    },
    include: {
      meal: true,
    },
  });
}
