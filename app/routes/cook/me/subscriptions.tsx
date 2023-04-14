import React from "react";

import { LoaderArgs, json } from "@remix-run/node";
import { getUser } from "~/session.server";
import invariant from "tiny-invariant";
import { getSubscriptionsByUserId } from "~/models/subscription.server";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { Button } from "~/components/Button";
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
  return (
    <div>
      <Button text="Go Back" onClick={goBack} variant="tertiary" />
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Image</th>
            <th className="text-left">Title</th>
            <th className="text-left">Price</th>
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
                />
                <Button
                  text="View Meal"
                  icon="ph:magnifying-glass-bold"
                  variant="secondary"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default subscriptions;
