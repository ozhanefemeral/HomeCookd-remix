import type { Prisma, User, UserProfile } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

// export type Address should return the address type from prisma but without the created at and updated at fields

export type Address = Prisma.AddressGetPayload<{
  select: {
    id: true;
    title: true;
    body: true;
    type: true;
    userProfileId: true;
  };
}>;

export type createAddressInput = {
  addressBody: Address["body"];
  addressTitle: Address["title"];
  user: UserProfile["id"];
  addressType: Address["type"];
};

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      avatar: "https://i.pravatar.cc/300",
      name: "New User",
    },
  });

  // create user profile for the user then return user

  await prisma.userProfile.create({
    data: {
      userId: user.id,
      name: "New User",
    },
  });

  return user;
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(email: User["email"], password: string) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(password, userWithPassword.password);

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

export async function getUserProfileByUserId(id: User["id"]) {
  return prisma.userProfile.findUnique({ where: { userId: id } });
}

export async function getCookProfileByUserId(id: User["id"]) {
  return prisma.cookProfile.findUnique({ where: { userId: id } });
}

export async function getUserAddresses(id: UserProfile["id"]) {
  return prisma.address.findMany({ where: { userProfileId: id } });
}

export async function createAddress(address: createAddressInput) {

  return prisma.address.create({
    data: {
      body: address.addressBody,
      title: address.addressTitle,
      type: address.addressType,
      userProfileId: address.user,
    },
  });
}
