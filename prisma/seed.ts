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
  SEA_FOOD = "SEA_FOOD",
  COMFORT_FOOD = "COMFORT_FOOD",
  MIDDLE_EASTERN = "MIDDLE_EASTERN",
  ITALIAN = "ITALIAN",
  COLD = "COLD",
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
  MealTags.SEA_FOOD,
  MealTags.COMFORT_FOOD,
  MealTags.MIDDLE_EASTERN,
  MealTags.ITALIAN,
  MealTags.COLD,
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
      name: "Mikołaj",
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

  await prisma.meal.create({
    data: {
      title: "Classic Tacos",
      price: 28,
      cookedBy: spanishUser.id,
      image:
        "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
      tags: [MealTags.NEW, MealTags.TRENDING, MealTags.HIGH_PROTEIN],
      description:
        "Indulge in the essence of Mexico with our delicious homemade Tacos. Each Taco is a pocket of joy, handcrafted with love and filled to the brim with an exquisite blend of flavors. The crunch of the freshly toasted tortilla meets the succulence of seasoned ground beef, perfectly complemented by the zestiness of fresh tomatoes and lettuce. Topped off with creamy shredded cheese, a dollop of homemade guacamole, and a splash of tangy salsa, this Mexican delight will transport you to the vibrant streets of Mexico. Make your mealtime a fiesta with our scrumptious, soul-satisfying Tacos!",
      nutrition: {
        create: {
          title: "Homemade Taco",
          ingredients: [
            "Soft Corn Tortillas",
            "Ground Beef",
            "Taco Seasoning",
            "Romaine Lettuce",
            "Fresh Tomatoes",
            "Red Onion",
            "Jalapenos",
            "Shredded Cheddar Cheese",
            "Guacamole",
            "Salsa",
            "Sour Cream",
            "Cilantro",
          ],
          calories: 260,
          protein: 12,
          fat: 14,
          carbs: 20,
        },
      },
    },
  });

  await prisma.meal.createMany({
    data: [
      {
        title: "Pierogi Ukraińskie",
        price: 42,
        cookedBy: polishUser.id,
        image:
          "https://images.unsplash.com/photo-1662116663511-9d79d49da183?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
        tags: [MealTags.VEGETARIAN, MealTags.TRENDING, MealTags.LOW_FAT],
        description:
          "Zanurz się w smaku prawdziwej polskiej tradycji z naszymi domowymi pierogami. Te starannie przygotowane kieszonki szczęścia są wypełnione najwyższej jakości składnikami, takimi jak kremowy ser, świeże ziemniaki i delikatna cebula, a potem perfekcyjnie ugotowane do osiągnięcia idealnego balansu między chrupiącym brzegiem a miękkim wnętrzem. Każdy gryz jest świadectwem rzemiosła i przynosi komfort, który tylko domowe gotowanie może zapewnić. Odkryj prawdziwy smak Polski z naszymi pysznymi pierogami!",
      },
      {
        title: "Falafel",
        price: 32,
        cookedBy: lebaneseUser.id,
        image:
          "https://images.unsplash.com/photo-1547058881-aa0edd92aab3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        tags: [MealTags.VEGETARIAN, MealTags.LOW_FAT, MealTags.HIGH_PROTEIN],
        description:
          "Delve into an aromatic journey to the Middle East with our savory Falafel. These golden, crunchy gems are expertly crafted from a blend of chickpeas, aromatic herbs, and a symphony of spices, fried to a crispy perfection while retaining a tender, flavorful interior. Tucked in a warm pita bread with a generous splash of tangy tahini sauce, crisp lettuce, fresh tomatoes, and pickled cucumbers, each bite is an explosion of rich, earthy flavors and textures. This vegan delight is not just a meal; it's a taste adventure that brings the vibrant spirit of Middle Eastern street food right to your doorstep. Try our Falafel – it's more than food, it's an experience!",
      },
      {
        title: "Tortilla Española",
        price: 38,
        cookedBy: spanishUser.id,
        image:
          "https://images.unsplash.com/photo-1599232288126-7dbd2127db14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        tags: [MealTags.VEGETARIAN, MealTags.TRENDING, MealTags.COMFORT_FOOD],
        description:
          "Experience the taste of Spain with our Tortilla Española. This classic Spanish omelette is made with eggs, potatoes, and onions, resulting in a hearty and flavorful dish. Served warm with a side of fresh salad, each slice is a delicious combination of textures and a true representation of Spanish culinary heritage. Enjoy the authentic flavors of Tortilla Española and immerse yourself in Spanish gastronomy.",
      },
      {
        title: "Kibbeh",
        price: 36,
        cookedBy: lebaneseUser.id,
        image:
          "https://plus.unsplash.com/premium_photo-1667546202642-e3c506786caa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=873&q=80",
        tags: [
          MealTags.MIDDLE_EASTERN,
          MealTags.HIGH_PROTEIN,
          MealTags.TRENDING,
        ],
        description:
          "Transport your taste buds to Lebanon with our Kibbeh. These savory meatballs are made with ground beef or lamb, cracked wheat, onions, and a blend of aromatic spices. Deep-fried to perfection, each bite offers a crispy exterior and a juicy, flavorful center. Served with a side of refreshing tzatziki sauce and a medley of pickles, Kibbeh is a beloved dish in Lebanese cuisine that will leave you wanting more.",
      },
      {
        title: "Gazpacho",
        price: 28,
        cookedBy: spanishUser.id,
        image:
          "https://images.unsplash.com/photo-1662469827900-e2d865491f53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2F6cGFjaG98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1400&q=60",
        tags: [MealTags.VEGETARIAN, MealTags.LOW_FAT, MealTags.COLD],
        description:
          "Cool down with a refreshing bowl of Gazpacho, a chilled Spanish soup. Made with ripe tomatoes, cucumbers, bell peppers, garlic, and a hint of olive oil, this vibrant soup bursts with flavors and nutrients. Served with a drizzle of extra virgin olive oil and garnished with fresh herbs, Gazpacho is the perfect way to enjoy the essence of summer in Spain.",
      },
      {
        title: "Pulpo a la Gallega",
        price: 45,
        cookedBy: spanishUser.id,
        image:
          "https://images.unsplash.com/photo-1526243070121-8040f7c9cc1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2N0b3B1cyUyMG1lYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1400&q=60",
        tags: [MealTags.SEA_FOOD, MealTags.TRENDING, MealTags.HIGH_PROTEIN],
        description:
          "Indulge in the taste of Galicia with our Pulpo a la Gallega, also known as Galician-style octopus. Tender octopus is boiled to perfection and then seasoned with sea salt, Spanish paprika, and drizzled with extra virgin olive oil. Served on a bed of sliced potatoes, each bite offers a delightful combination of flavors and textures. Experience the rich culinary heritage of Spain with this beloved seafood dish.",
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
        catchphrase: "Taste the homemade fiesta with our Tacos!",
      },
      {
        title: "Pierogi Ukraińskie",
        price: 42,
        orderHours: ["15:00", "18:00"],
        limit: 10,
        cookedBy: polishUser.id,
        mealId: meals[1].id,
        catchphrase: "Odkryj smak Ukrainy w naszych Pierogach",
      },
      {
        title: "Late Night Falafel",
        price: 32,
        orderHours: ["21:00", "23:00"],
        limit: 10,
        cookedBy: lebaneseUser.id,
        mealId: meals[2].id,
        catchphrase: "Spice up your nights!",
      },
      {
        title: "Tortilla Española",
        price: 38,
        orderHours: ["12:00", "18:00"],
        limit: 10,
        cookedBy: spanishUser.id,
        mealId: meals[3].id,
        catchphrase: "Experience the taste of Spain!",
      },
      {
        title: "Kibbeh",
        price: 36,
        orderHours: ["19:00", "20:00", "21:00"],
        limit: 40,
        cookedBy: lebaneseUser.id,
        mealId: meals[4].id,
        catchphrase: "Transport your taste buds to Lebanon!",
      },
      {
        title: "Gazpacho",
        price: 28,
        orderHours: ["10:00", "11:00", "12:00"],
        limit: 10,
        cookedBy: spanishUser.id,
        mealId: meals[5].id,
        catchphrase: "Cool down with a refreshing bowl of Gazpacho!",
      },
      {
        title: "Pulpo a la Gallega",
        price: 45,
        // different order hours
        orderHours: ["12:00", "18:00", "20:00"],
        limit: 10,
        cookedBy: spanishUser.id,
        mealId: meals[6].id,
        catchphrase: "Indulge in the taste of Galicia!",
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
      {
        subscriptionId: subscriptions[4].id,
        userId: consumerUser.id,
        quantity: 40,
        deliveryTime: faker.date.future(),
        addressId: addresses[0].id,
      },
      {
        subscriptionId: subscriptions[3].id,
        userId: consumerUser.id,
        quantity: 10,
        deliveryTime: faker.date.future(),
        addressId: addresses[0].id,
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
