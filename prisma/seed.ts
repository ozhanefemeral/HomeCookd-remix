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

enum MealTags {
  VEGETARIAN = "VEGETARIAN",
  GLUTEN_FREE = "GLUTEN_FREE",
  DAIRY_FREE = "DAIRY_FREE",
  TRENDING = "TRENDING",
  NEW = "NEW",
  BIG_PORTION = "BIG_PORTION",
  HIGH_PROTEIN = "HIGH_PROTEIN",
}

const mealTags: MealTags[] = [
  MealTags.VEGETARIAN,
  MealTags.GLUTEN_FREE,
  MealTags.DAIRY_FREE,
  MealTags.TRENDING,
  MealTags.NEW,
  MealTags.BIG_PORTION,
  MealTags.HIGH_PROTEIN,
];

const generateRandomTags = () => {
  const getRandomIndex = () => Math.floor(Math.random() * mealTags.length);

  const randomTags = new Set<MealTags>();
  while (randomTags.size < 3) {
    randomTags.add(mealTags[getRandomIndex()]);
  }

  return randomTags;
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

  // pick 3 random tags

  const meals = await prisma.meal.createMany({
    // create 10 fake meals
    data: Array.from({ length: 10 }).map((_, i) => ({
      title: fakeMealNames[i * 4],
      price: Number(faker.commerce.price(5, 40, 0)),
      cookedBy: cook.username,
      // create random 3 tags for each meal
      tags: [...generateRandomTags()],
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
        price: mealsData[0].price,
        quantity: 1,
        deliveryDay: DeliveryDay.MONDAY,
        deliveryHour: "12:00",
      },
      {
        subscriptionId: subscriptions.id,
        mealId: mealsData[1].id,
        price: mealsData[1].price,
        quantity: 1,
        deliveryDay: DeliveryDay.SATURDAY,
        deliveryHour: "18:00",
      },
      {
        subscriptionId: subscriptions.id,
        mealId: mealsData[2].id,
        price: mealsData[2].price,
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
