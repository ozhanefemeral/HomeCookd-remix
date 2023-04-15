import React from "react";

import { LoaderArgs, json } from "@remix-run/node";
import { getUser } from "~/session.server";
import invariant from "tiny-invariant";
import { getSubscriptionsByUserId } from "~/models/subscription.server";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
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

  const navigate = useNavigate();
  const goBack = () => navigate("/cook/me");

  function viewOrders(subscription: HomepageSubscription) {
    navigate(`/cook/me/subscriptions/${subscription.id}`);
  }

  function viewMeal(subscription: HomepageSubscription) {
    navigate(`/cook/me/meals/${subscription.meal.id}`);
  }

  return (
    <div>
      <Button text="Go Back" onClick={goBack} variant="tertiary" />

      <h1 className="text-2xl font-bold my-4">Subscriptions</h1>

      <div className="flex flex-wrap">
        <table className="md:w-1/2 w-full">
          <thead>
            <tr>
              <th className="text-left">Image</th>
              <th className="text-left">Title</th>
              <th className="text-left">Price</th>
              <th className="text-left">Reservations</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription) => (
              <tr key={subscription.id}>
                <td>
                  <img
                    src={subscription.meal.image}
                    alt={subscription.title}
                    width={64}
                  />
                </td>
                <td>{subscription.title}</td>
                <td>{subscription.price}</td>
                <td>
                  {subscription.reservationCount}/{subscription.limit}
                </td>
                <td className="flex gap-2">
                  <Button
                    text="Repeat"
                    icon="fluent:food-pizza-20-filled"
                    variant="primary"
                  />
                  <Button
                    text="View Orders"
                    variant="secondary"
                    icon="mdi:people"
                    onClick={() => viewOrders(subscription)}
                  />
                  <Button
                    text="View Meal"
                    icon="ph:magnifying-glass-bold"
                    variant="secondary"
                    onClick={() => viewMeal(subscription)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default subscriptions;
