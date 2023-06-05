import React from "react";

import { LoaderArgs, json } from "@remix-run/node";
import { getUser } from "~/session.server";
import invariant from "tiny-invariant";
import { getSubscriptionsByUserId } from "~/models/subscription.server";
import { Outlet, useLoaderData, useMatches, useNavigate } from "@remix-run/react";
import { Button } from "~/components/Button";
import { HomepageSubscription } from "~/models/subscription.server";
export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  invariant(user, "You must be logged in to view this page");
  const subscriptions = await getSubscriptionsByUserId(user.id);
  return json({ subscriptions });
}

function subscriptions() {
  const data = useLoaderData<typeof loader>();
  const { subscriptions } = data;

  const matches = useMatches();
  const navigate = useNavigate();
  const goBack = () => navigate("/cook/me");

  const { subscriptionId } = matches[matches.length - 1].params;

  function viewOrders(subscription: HomepageSubscription) {
    navigate(`/cook/me/subscriptions/${subscription.id}`);
  }

  function viewMeal(subscription: HomepageSubscription) {
    navigate(`/cook/me/meals/${subscription.meal.id}`);
  }

  function createSubscription(subscription: HomepageSubscription) {
    navigate(`createSubscription/${subscription.id}`);
  }

  function isSelectedSubscription(subscription: HomepageSubscription) {
    return subscriptionId === subscription.id;
  }


  return (
    <div>
      <h1 className="my-4 text-2xl font-bold">Subscriptions</h1>
      <Button text="Go Back" onClick={goBack} variant="tertiary" />

      <hr className="my-4" />

      <div className="flex flex-col md:flex-row gap-4">
        {/* <table className="w-full md:w-1/2">
          <thead>
            <tr>
              <th className="text-left">Image</th>
              <th className="text-left">Title</th>
              <th className="text-left">Price</th>
              <th className="text-left">Reservations</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table> */}
        

        <div className="flex w-full flex-col gap-4 md:w-1/2">
          {/* headers for each field */}
          {subscriptions.map((subscription) => (
            <div
              className={`p-2 flex flex-row gap-4 items-center rounded-md ${
                isSelectedSubscription(subscription) ? "bg-orange-100" : ""
              }`}
              key={subscription.id}
            >
              <div>
                <img
                  src={subscription.meal.image}
                  alt={subscription.title}
                  width={64}
                />
              </div>
              <div className="font-bold">{subscription.title}</div>
              <div>{subscription.price}$</div>
              <div>Reserved:
                {subscription.reservationCount}/{subscription.limit} 
              </div>
              <div className="flex h-full items-center gap-2 ml-auto">
                <Button
                  text="Repeat"
                  icon="fluent:food-pizza-20-filled"
                  variant="primary"
                  onClick={() => createSubscription(subscription)}
                />
                <Button
                  text="Orders"
                  variant="secondary"
                  icon="mdi:people"
                  onClick={() => viewOrders(subscription)}
                />
                <Button
                  text="Meal"
                  icon="ph:magnifying-glass-bold"
                  variant="secondary"
                  onClick={() => viewMeal(subscription)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex w-full md:w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default subscriptions;
