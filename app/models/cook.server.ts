import type { Cook } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { Cook } from "@prisma/client";

export async function getCookById(id: Cook["id"]) {
  return prisma.cook.findUnique({ where: { id } });
}

export async function getCookMeals(username: Cook["username"]) {
  return prisma.cook.findUnique({ where: { username } }).meals({
    include: {
      cook: true,
    },
  });
}

export async function getCookByUsername(username: Cook["username"]) {
  return prisma.cook.findUnique({ where: { username } });
}

export async function verifyLogin(
  email: Cook["email"],
  password: string
) {

  const cookWithPassword = await prisma.cook.findUnique({
    where: { email },
  });

  if (!cookWithPassword || !cookWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    cookWithPassword.password
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...cookWithoutPassword } = cookWithPassword;
  return cookWithoutPassword;
}
