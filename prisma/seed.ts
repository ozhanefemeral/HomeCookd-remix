import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { faker } from '@faker-js/faker';

// generate 50 fake meal names
const fakeMealNames = [
  "Chicken and Broccoli",
  "Chicken and Rice",
  "Chicken Curry",
  "Chicken Fajitas",
  "Stir Fry",
  "Tacos",
  "Chicken Tikka Masala",
  "Tortilla Soup",
  "Vegetable Soup",
  "Dumplings",
  "oodles",
  "Pasta",
  "Baked Potatoes",
  "Chicken and Vegetables",
  "Chicken Parmesan",
  "Pot Pie",
  "Veggie Burgers",
  "Meatloaf",
  "Meatballs",
  "Burgers",
  "Pizza",
  "Salmon",
  "Shrimp",
  "Tuna",
  "Steak",
  "Pork Chops",
  "Chicken Nuggets",
  "Fried Chicken",
  "Chicken Tenders",
  "Chicken Salad",
  "Chicken Quesadillas",
  "Hamburgers",
  "Cheeseburgers",
  "Hot Dogs",
  "Mac and Cheese",
  "Lasagna",
  "Spaghetti",
  "Ravioli",
  "Tacos",
  "Enchiladas",
  "Burritos",
  "Salad",
]

const prisma = new PrismaClient();

enum DeliveryDay {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

async function seed() {
  console.log("seeding database... 🌱");

  const email = "efe@example.com";

  // cleanup the existing database
  await prisma.subscriptionMeal.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.meal.deleteMany();
  await prisma.cook.deleteMany();
  await prisma.user.deleteMany();

  const userPassword = await bcrypt.hash("1234567890", 10);
  const cookPassword = await bcrypt.hash("1234567890", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: userPassword
    },
  });

  const cook = await prisma.cook.create({
    data: {
      name: faker.name.fullName(),
      email: "cook@example.com",
      password: cookPassword,
      username: "the-cook",
    }
  });

  const cookProfile = await prisma.cookProfile.create({
    data: {
      username: cook.username,
      banner: faker.image.imageUrl(),
      avatar: faker.image.avatar(),
      description: faker.lorem.paragraph(),
      instagram: faker.internet.url(),
      facebook: faker.internet.url(),
      youtube: faker.internet.url(),
    }
  })

  const meals = await prisma.meal.createMany({
    // create 10 fake meals
    data: Array.from({ length: 10 }).map((_, i) => ({
      title: fakeMealNames[i * 4],
      price: Number(faker.commerce.price(5, 40, 0)),
      cookedBy: cook.username,
    })),
  });

  const subscriptions = await prisma.subscription.create({
    data: {
      title: "My First Subscription",
      price: Number(faker.commerce.price(5, 40, 0)),
      userId: user.id,
      start: faker.date.past(),
      end: faker.date.future(),
    }
  })

  const recipes = await prisma.recipe.createMany({
    data: Array.from({ length: 10 }).map((_, i) => ({
      title: fakeMealNames[i * 3],
      body: faker.lorem.paragraph(),
      username: cook.username,
    })),
  });

  const mealsData = await prisma.meal.findMany();

  const subscriptionMeals = await prisma.subscriptionMeal.createMany({
    data: [
      {
        subscriptionId: subscriptions.id,
        mealId: mealsData[0].id,
        price: Math.round(Number(mealsData[0].price * 0.9)),
        quantity: 1,
        deliveryDay: DeliveryDay.MONDAY,
        deliveryHour: "12:00",
      },
      {
        subscriptionId: subscriptions.id,
        mealId: mealsData[1].id,
        price: Math.round(Number(mealsData[1].price * 0.9)),
        quantity: 1,
        deliveryDay: DeliveryDay.SATURDAY,
        deliveryHour: "18:00",
      },
      {
        subscriptionId: subscriptions.id,
        mealId: mealsData[2].id,
        price: Math.round(Number(mealsData[2].price * 0.9)),
        quantity: 1,
        deliveryDay: DeliveryDay.SUNDAY,
        deliveryHour: "10:00",
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
