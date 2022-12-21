import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  console.log("seeding database... 🌱");

  const email = "efe@example.com";

  // cleanup the existing database
  await prisma.subscriptionMeal.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.meal.deleteMany();
  await prisma.cook.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("1234567890", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const cook = await prisma.cook.create({
    data: {
      name: faker.name.firstName(),
      email: faker.internet.email(),
    }
  });

  const meals = await prisma.meal.createMany({
    data: [
      {
        title: faker.commerce.productName(),
        cookId: cook.id,
        price: Number(faker.commerce.price(5, 40, 0)),
      },
      {
        title: faker.commerce.productName(),
        cookId: cook.id,
        price: Number(faker.commerce.price(5, 40, 0)),
      },
      {
        title: faker.commerce.productName(),
        cookId: cook.id,
        price: Number(faker.commerce.price(5, 40, 0)),
      },
    ],
  });

  const subscriptions = await prisma.subscription.create({
    data: {
      title: faker.commerce.productName(),
      cookId: cook.id,
      price: Number(faker.commerce.price(5, 40, 0)),
      userId: user.id,
      start: faker.date.past(),
      end: faker.date.future(),
    }
  })

  // cast meals to prisma meal type and resolve Cannot access 'PrismaClient.meal' because 'PrismaClient' is a type, but not a namespace.

  const mealsData = await prisma.meal.findMany();

  // each subscription meal has a price that is 10% off the meal price and rounded to the nearest without decimal
  const subscriptionMeals = await prisma.subscriptionMeal.createMany({
    data: [
      {
        subscriptionId: subscriptions.id,
        mealId: mealsData[0].id,
        price: Math.round(Number(mealsData[0].price * 0.9)),
        quantity: 1,
      },
      {
        subscriptionId: subscriptions.id,
        mealId: mealsData[1].id,
        price: Math.round(Number(mealsData[0].price * 0.9)),
        quantity: 1,
      },
      {
        subscriptionId: subscriptions.id,
        mealId: mealsData[2].id,
        price: Math.round(Number(mealsData[0].price * 0.9)),
        quantity: 1,
      },
    ],
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
