import { NavLink, useLoaderData } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import { getCookSubscriptions } from "~/models/subscription.server";
import { requireCookId } from "~/session.server";
import { DeliveryDay } from "~/models/subscriptionMeal.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const cookId = await requireCookId(request);
  const subscriptions = await getCookSubscriptions(cookId);
  // map days of week to numbers so we can sort them
  const dayMap = {
    MONDAY: 0,
    TUESDAY: 1,
    WEDNESDAY: 2,
    THURSDAY: 3,
    FRIDAY: 4,
    SATURDAY: 5,
    SUNDAY: 6,
  }

  // sort subscriptions by delivery day
  subscriptions.sort((a, b) => {
    if (dayMap[a.deliveryDay] < dayMap[b.deliveryDay]) {
      return -1;
    }
    if (dayMap[a.deliveryDay] > dayMap[b.deliveryDay]) {
      return 1;
    }
    return 0;
  });

  return json({ subscriptions });
}

export default function AllSubscriptions() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>All Subscriptions</h1>
      <ul>
        {data.subscriptions.map((subscription) => (
          <li key={subscription.id}>
            <NavLink
              className={({ isActive }) =>
                `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
              }
              to={`../meals/${subscription.id}`}
            >
              📝 {subscription.meal.title} - {subscription.deliveryDay}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}