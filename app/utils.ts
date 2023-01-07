import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

import type { User } from "~/models/user.server";
import type { Cook } from "~/models/cook.server";
import { MealTags } from "@prisma/client";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

function isUser(user: any): user is User {
  return user && typeof user === "object" && typeof user.email === "string";
}

function isCook(cook: any): cook is Cook {
  return cook && typeof cook === "object" && typeof cook.email === "string";
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useOptionalCook(): Cook | undefined {
  const data = useMatchesData("root");

  if (!data || !isCook(data.cook)) {
    return undefined;
  }
  return data.cook;
}


export function useUser(): User {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}

export function useCook(): Cook {
  const maybeCook = useOptionalCook();
  if (!maybeCook) {
    throw new Error(
      "No cook found in root loader, but cook is required by useCook. If cook is optional, try useOptionalCook instead."
    );
  }
  return maybeCook;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}
export const deliveryHours = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

// [MealTags.VEGETARIAN]: "🌱",
// [MealTags.GLUTEN_FREE]: "🍞",
// [MealTags.DAIRY_FREE]: "🥛",
// [MealTags.BIG_PORTION]: "🍽️",
// [MealTags.NEW]: "🔥",
// [MealTags.TRENDING]: "💎",
export const mapTagToEmoji = {
  [MealTags.VEGETARIAN]: "🌱",
  [MealTags.GLUTEN_FREE]: "🍞",
  [MealTags.DAIRY_FREE]: "🥛",
  [MealTags.BIG_PORTION]: "🍽️",
  [MealTags.NEW]: "🔥",
  [MealTags.TRENDING]: "💎",
  [MealTags.HIGH_PROTEIN]: "🍗",
};