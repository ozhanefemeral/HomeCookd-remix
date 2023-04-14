import { LoaderArgs, json } from "@remix-run/server-runtime";
import React from "react";
import { getMealsByUserId } from "~/models/meals.server";
import { getUser } from "~/session.server";
import invariant from "tiny-invariant";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { Button } from "~/components/Button";

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  invariant(user, "You must be logged in to view this page");
  const meals = await getMealsByUserId(user.id);

  return json({ meals });
}

function meals() {
  const data = useLoaderData<typeof loader>();
  const { meals } = data;

  const navigate = useNavigate();
  const goBack = () => navigate("/cook/me");

  return (
    <div>
      <Button text="Go Back" onClick={goBack} variant="tertiary" />
      {/* a table to show meals. columns in order:  image, title, price, and last column has a button */}
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
          {meals.map((meal) => (
            <tr key={meal.id}>
              <td>
                <img src={meal.image} alt={meal.title} width={64} />
              </td>
              <td>{meal.title}</td>
              <td>{meal.price}</td>
              <td className="flex gap-2">
                <Button
                  text="Publish"
                  icon="fluent:food-pizza-20-filled"
                  variant="primary"
                />
                <Button
                  text="View"
                  icon="ph:magnifying-glass-bold"
                  variant="secondary"
                />
                <Button text="Delete" variant="tertiary" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default meals;
