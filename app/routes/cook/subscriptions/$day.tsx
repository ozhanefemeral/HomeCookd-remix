import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteSubscription } from "~/models/subscription.server";
import { getSubscriptionMealById, deleteSubscriptionMeal, getSubscriptionMealsByDay, DeliveryDay } from "~/models/subscriptionMeal.server";
import { requireCookId } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const cookId = await requireCookId(request);
  invariant(params.day, "day not found");

  const day = params.day as DeliveryDay;

  const subMeals = await getSubscriptionMealsByDay(day);
  if (!subMeals) {
    throw new Response("Not Found", { status: 404 });
  }

  // sort meals by delivery hour
  subMeals.sort((a, b) => {
    if (a.deliveryHour < b.deliveryHour) {
      return -1;
    }
    if (a.deliveryHour > b.deliveryHour) {
      return 1;
    }
    return 0;
  });

  return json({ subMeals });
}

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>();

  const count = data.subMeals.length;

  return (
    <div className="p-4">
      {/* tailwind h3 for count with sentence */}
      {count > 0 ?
        <h3 className="text-2xl font-bold text-center">You have {count} meals for this day 😍</h3> :
        <h3 className="text-2xl font-bold text-center">You have no meals for this day 🙄</h3>}
      <ul>
        {/* navlink to subscriotion meals */}
        {data.subMeals.map((subMeal) => (
          <li key={subMeal.id}>
            <a href={`/cook/subscriptions/meals/${subMeal.id}`}>
              {subMeal.meal.title} - {subMeal.quantity} - {subMeal.deliveryHour}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
