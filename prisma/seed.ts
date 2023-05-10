import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

// generate 50 fake meal names
const fakeMealNames = [
  "Chicken Fajitas",
  "Chicken and Broccoli",
  "Chicken and Rice",
  "Chicken Curry",
  "Pierogi Ukrainskie",
  "Tacos",
  "Chicken Tikka Masala",
  "Tortilla Soup",
  "Chicken Noodle Soup",
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
];

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
  LOW_FAT = "LOW_FAT",
}

const mealTags: MealTags[] = [
  MealTags.VEGETARIAN,
  MealTags.GLUTEN_FREE,
  MealTags.DAIRY_FREE,
  MealTags.TRENDING,
  MealTags.NEW,
  MealTags.BIG_PORTION,
  MealTags.HIGH_PROTEIN,
  MealTags.LOW_FAT,
];

const generateRandomTags = () => {
  const getRandomIndex = () => Math.floor(Math.random() * mealTags.length);

  const randomTags = new Set<MealTags>();
  while (randomTags.size < 3) {
    randomTags.add(mealTags[getRandomIndex()]);
  }

  return randomTags;
};

async function seed() {
  console.log("seeding database... 🌱");

  const email = "efe@example.com";

  // cleanup the existing database
  await prisma.subscriptionOrder.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.meal.deleteMany();
  await prisma.user.deleteMany();
  await prisma.userProfile.deleteMany();
  await prisma.cookProfile.deleteMany();
  await prisma.address.deleteMany();

  const userPassword = await bcrypt.hash("1234567890", 10);
  const cookPassword = await bcrypt.hash("1234567890", 10);
  const name = faker.name.fullName();

  // const user = await prisma.user.create({
  //   data: {
  //     email,
  //     name,
  //     password: userPassword,
  //     avatar: faker.image.avatar(),
  //   },
  // });

  // const user2 = await prisma.user.create({
  //   data: {
  //     email: "ozzy@example.com",
  //     name: "Ozzy Osbourne",
  //     password: userPassword,
  //     avatar: faker.image.avatar(),
  //   },
  // });

  // const userProfile = await prisma.userProfile.create({
  //   data: {
  //     name,
  //     interests: [...generateRandomTags()],
  //     dislikes: [...generateRandomTags()],
  //     userId: user.id,
  //   },
  // });

  // const userProfile2 = await prisma.userProfile.create({
  //   data: {
  //     name: faker.name.fullName(),
  //     interests: [...generateRandomTags()],
  //     dislikes: [...generateRandomTags()],
  //     userId: user2.id,
  //   },
  // });

  // const cookProfile = await prisma.cookProfile.create({
  //   data: {
  //     userId: user.id,
  //     banner: faker.image.imageUrl(),
  //     description: faker.lorem.paragraph(),
  //     instagram: faker.internet.url(),
  //     facebook: faker.internet.url(),
  //     youtube: faker.internet.url(),
  //   },
  // });

  // const cookProfile2 = await prisma.cookProfile.create({
  //   data: {
  //     userId: user2.id,
  //     banner: faker.image.imageUrl(),
  //     description: faker.lorem.paragraph(),
  //     instagram: faker.internet.url(),
  //     facebook: faker.internet.url(),
  //     youtube: faker.internet.url(),
  //   },
  // });

  // a generic user, userProfile, and cookProfile based on a spanish chef
  const spanishUser = await prisma.user.create({
    data: {
      email: "spanish@example.com",
      name: "Jose Andres",
      password: userPassword,
      avatar: faker.image.avatar(),
    },
  });

  const spanishUserProfile = await prisma.userProfile.create({
    data: {
      name: "Jose Andres",
      interests: [...generateRandomTags()],
      dislikes: [...generateRandomTags()],
      userId: spanishUser.id,
    },
  });

  const spanishCookProfile = await prisma.cookProfile.create({
    data: {
      userId: spanishUser.id,
      banner: faker.image.imageUrl(),
      description: faker.lorem.paragraph(),
      instagram: faker.internet.url(),
      facebook: faker.internet.url(),
      youtube: faker.internet.url(),
    },
  });

  // a generic user, userProfile, and cookProfile based on a Polish chef
  const polishUser = await prisma.user.create({
    data: {
      email: "polish@example.com",
      name: "Dominika",
      password: userPassword,
      avatar: faker.image.avatar(),
    },
  });

  const polishUserProfile = await prisma.userProfile.create({
    data: {
      name: "Dominika",
      interests: [...generateRandomTags()],
      dislikes: [...generateRandomTags()],
      userId: polishUser.id,
    },
  });

  const polishCookProfile = await prisma.cookProfile.create({
    data: {
      userId: polishUser.id,
      banner: faker.image.imageUrl(),
      description: faker.lorem.paragraph(),
      instagram: faker.internet.url(),
      facebook: faker.internet.url(),
      youtube: faker.internet.url(),
    },
  });

  // a generic user, userProfile, and cookProfile based on a Lebanese chef
  const lebaneseUser = await prisma.user.create({
    data: {
      email: "lebanese@example.com",
      name: "Kamal Mouzawak",
      password: userPassword,
      avatar: faker.image.avatar(),
    },
  });

  const lebaneseUserProfile = await prisma.userProfile.create({
    data: {
      name: "Kamal Mouzawak",
      interests: [...generateRandomTags()],
      dislikes: [...generateRandomTags()],
      userId: lebaneseUser.id,
    },
  });

  const lebaneseCookProfile = await prisma.cookProfile.create({
    data: {
      userId: lebaneseUser.id,
      banner: faker.image.imageUrl(),
      description: faker.lorem.paragraph(),
      instagram: faker.internet.url(),
      facebook: faker.internet.url(),
      youtube: faker.internet.url(),
    },
  });

  const consumerUser = await prisma.user.create({
    data: {
      email: "consumer@example.com",
      name: "Consumer",
      password: userPassword,
      avatar: faker.image.avatar(),
    },
  });

  const consumerUserProfile = await prisma.userProfile.create({
    data: {
      name: "Consumer",
      interests: [...generateRandomTags()],
      dislikes: [...generateRandomTags()],
      userId: consumerUser.id,
    },
  });

  await prisma.address.createMany({
    data: [
      {
        title: "Home",
        body: faker.address.streetAddress() + " " + faker.address.city(),
        userProfileId: consumerUserProfile.id,
        type: "HOME",
      },
      {
        title: "Work",
        body: faker.address.streetAddress() + " " + faker.address.city(),
        userProfileId: consumerUserProfile.id,
        type: "WORK",
      },
      {
        title: "Other",
        body: faker.address.streetAddress() + " " + faker.address.city(),
        userProfileId: consumerUserProfile.id,
        type: "OTHER",
      },
    ],
  });

  const addresses = await prisma.address.findMany({
    where: {
      userProfileId: consumerUserProfile.id,
    },
  });

  await prisma.meal.createMany({
    data: [
      {
        title: "Classic Tacos",
        price: 28,
        cookedBy: spanishUser.id,
        image:
          "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
        tags: [MealTags.NEW, MealTags.TRENDING, MealTags.HIGH_PROTEIN],
      },
      {
        title: "Pierogi Ukraińskie",
        price: 42,
        cookedBy: polishUser.id,
        image:
          "https://images.unsplash.com/photo-1662116663511-9d79d49da183?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
        tags: [MealTags.VEGETARIAN, MealTags.TRENDING, MealTags.LOW_FAT],
      },
      {
        title: "Falafel",
        price: 32,
        cookedBy: lebaneseUser.id,
        image:
          "https://images.unsplash.com/photo-1547058881-aa0edd92aab3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        tags: [MealTags.VEGETARIAN, MealTags.LOW_FAT, MealTags.HIGH_PROTEIN],
      },
    ],
  });

  const meals = await prisma.meal.findMany();

  await prisma.subscription.createMany({
    data: [
      {
        title: "Taco Tuesday",
        price: 28,
        orderHours: ["12:00", "18:00"],
        limit: 40,
        cookedBy: spanishUser.id,
        mealId: meals[0].id,
      },
      {
        title: "Pierogi Ukraińskie",
        price: 42,
        orderHours: ["12:00", "18:00"],
        limit: 10,
        cookedBy: polishUser.id,
        mealId: meals[1].id,
      },
      {
        title: "Late Night Falafel",
        price: 32,
        orderHours: ["21:00", "23:00"],
        limit: 10,
        cookedBy: lebaneseUser.id,
        mealId: meals[2].id,
      },
    ],
  });

  const subscriptions = await prisma.subscription.findMany();

  // const recipes = await prisma.recipe.createMany({
  //   data: Array.from({ length: 10 }).map((_, i) => ({
  //     title: fakeMealNames[i * 3],
  //     body: faker.lorem.paragraph(),
  //     username: cook.username,
  //   })),
  // });

  const mealsData = await prisma.meal.findMany();

  const subscriptionOrders = await prisma.subscriptionOrder.createMany({
    data: [
      {
        subscriptionId: subscriptions[0].id,
        quantity: faker.datatype.number({
          min: 1,
          max: 5,
        }),
        userId: consumerUser.id,
        // deliveryTime is DateTime
        deliveryTime: faker.date.future(),
        addressId: addresses[0].id,
      },
      {
        subscriptionId: subscriptions[1].id,
        quantity: faker.datatype.number({
          min: 1,
          max: 5,
        }),
        userId: consumerUser.id,
        deliveryTime: faker.date.future(),
        addressId: addresses[1].id,
      },
      {
        subscriptionId: subscriptions[2].id,
        userId: consumerUser.id,
        quantity: faker.datatype.number({
          min: 1,
          max: 5,
        }),
        deliveryTime: faker.date.future(),
        addressId: addresses[2].id,
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
