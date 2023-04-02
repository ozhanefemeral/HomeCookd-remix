import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { getUserProfileByUserId, User } from "~/models/user.server";
import { getUserById } from "~/models/user.server";
import { Cook, getCookById } from "./models/cook.server";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

const USER_SESSION_KEY = "userId";
const COOK_SESSION_KEY = "cookId";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getUserId(
  request: Request
): Promise<User["id"] | undefined> {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (userId === undefined) return null;

  const user = await getUserById(userId);
  if (user) return user;

  throw await logout(request);
}

export async function getUserProfile(request: Request) {
  const userId = await getUserId(request);
  if (userId === undefined) return null;

  const userProfile = await getUserProfileByUserId(userId);
  if (userProfile) return userProfile;

  throw await logout(request);
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const userId = await getUserId(request);
  if (!userId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function requireUser(request: Request) {
  const userId = await requireUserId(request);

  const user = await getUserById(userId);
  if (user) return user;

  throw await logout(request);
}

export async function requireUserProfile(request: Request) {
  const userId = await requireUserId(request);

  const userProfile = await getUserProfileByUserId(userId);
  if (userProfile) return userProfile;

  throw await logout(request);
}

export async function createUserSession({
  request,
  userId,
  remember,
  redirectTo,
}: {
  request: Request;
  userId: string;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

export async function getCookId(
  request: Request
): Promise<Cook["id"] | undefined> {
  const session = await getSession(request);
  const cookId = session.get(COOK_SESSION_KEY);
  return cookId;
}

export async function getCook(request: Request) {
  const cookId = await getCookId(request);
  if (cookId === undefined) return null;

  const cook = await getCookById(cookId);
  if (cook) return cook;

  throw await logout(request);
}

export async function requireCookId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const cookId = await getCookId(request);
  if (!cookId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return cookId;
}

export async function requireCook(request: Request) {
  const cookId = await requireCookId(request);

  const cook = await getCookById(cookId);
  if (cook) return cook;

  throw await logout(request);
}

export async function createCookSession({
  request,
  cookId,
  remember,
  redirectTo,
}: {
  request: Request;
  cookId: string;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(COOK_SESSION_KEY, cookId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}


