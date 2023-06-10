import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

import type { User } from "~/models/user.server";
import type { UserProfile } from "@prisma/client";
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

function isUserProfile(userProfile: any): userProfile is UserProfile {
  return (
    userProfile &&
    typeof userProfile === "object" &&
    typeof userProfile.id === "string"
  );
}

export function useOptionalUserProfile(): UserProfile | undefined {
  const data = useMatchesData("root");

  if (!data || !isUserProfile(data.userProfile)) {
    return undefined;
  }
  return data.userProfile;
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
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

export function useUserProfile() {
  const maybeUserProfile = useOptionalUserProfile();
  if (!maybeUserProfile) {
    throw new Error(
      "No userProfile found in root loader, but userProfile is required by useUserProfile. If userProfile is optional, try useOptionalUserProfile instead."
    );
  }
  return maybeUserProfile;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}
export const deliveryHours = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

export const mapMealTagToEmoji = (tag: MealTags): string => {
  switch (tag) {
    case MealTags.VEGETARIAN:
      return "🥦";
    case MealTags.GLUTEN_FREE:
      return "🍞";
    case MealTags.DAIRY_FREE:
      return "🥛";
    case MealTags.BIG_PORTION:
      return "🍽";
    case MealTags.NEW:
      return "🔥";
    case MealTags.TRENDING:
      return "💎";
    case MealTags.HIGH_PROTEIN:
      return "🏋️‍♂️";
    default:
      return "";
  }
};

export const formatMealTag = (tag: MealTags): string => {
  switch (tag) {
    case MealTags.VEGETARIAN:
      return "Vegetarian";
    case MealTags.GLUTEN_FREE:
      return "Gluten Free";
    case MealTags.DAIRY_FREE:
      return "Dairy Free";
    case MealTags.BIG_PORTION:
      return "Big Portion";
    case MealTags.NEW:
      return "New";
    case MealTags.TRENDING:
      return "Trending";
    case MealTags.HIGH_PROTEIN:
      return "High Protein";
      case MealTags.LOW_FAT:
      return "Low Fat";
    default:
      return "";
  }
};

export const sortMealTags = (tags: MealTags[]) => {
};

export const mealTags = [
  {
    tag: MealTags.VEGETARIAN,
    emoji: "🥦",
    label: "Vegetarian",
  },
  {
    tag: MealTags.GLUTEN_FREE,
    emoji: "🍞",
    label: "Gluten Free",
  },
  {
    tag: MealTags.DAIRY_FREE,
    emoji: "🥛",
    label: "Dairy Free",
  },
  {
    tag: MealTags.BIG_PORTION,
    emoji: "🍽",
    label: "Big Portion",
  },
  {
    tag: MealTags.NEW,
    emoji: "🔥",
    label: "New",
  },
  {
    tag: MealTags.TRENDING,
    emoji: "💎",
    label: "Trending",
  },
  {
    tag: MealTags.HIGH_PROTEIN,
    emoji: "🏋️‍♂️",
    label: "High Protein",
  },
  {
    tag: MealTags.LOW_FAT,
    emoji: "🥗",
    label: "Low Fat",
  }
];

export const daysAbbrCapitalized = {
  MONDAY: "Mon",
  TUESDAY: "Tue",
  WEDNESDAY: "Wed",
  THURSDAY: "Thu",
  FRIDAY: "Fri",
  SATURDAY: "Sat",
  SUNDAY: "Sun",
};

export const daysCapitalized = {
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
  SATURDAY: "Saturday",
  SUNDAY: "Sunday",
};

export const orderHours = [
  // all hours with 30 minutes intervals
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

export const capitalizeFirstLetter = (string: string): string => {
  return `${string.charAt(0).toUpperCase()}${string.toLowerCase().slice(1)}`;
};

export function joinIngredients(ingredients: string[]) {
  return ingredients.join(", ")
}