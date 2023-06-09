import type { CookProfile, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { CookProfile } from "@prisma/client";

export async function getCookProfileById(id: User["id"]) {
  return prisma.cookProfile.findUnique({ where: { userId: id } });
}
