import { LoaderArgs, json } from "@remix-run/server-runtime";
import { getMealsByUserId } from "~/models/meals.server";
import { getUser } from "~/session.server";
import invariant from "tiny-invariant";
import {
  Outlet,
  useLoaderData,
  useMatches,
  useNavigate,
} from "@remix-run/react";
import { Button } from "~/components/Button";
import { Meal } from "@prisma/client";

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  invariant(user, "You must be logged in to view this page");
  const meals = await getMealsByUserId(user.id);

  return json({ meals });
}

function meals() {
  const data = useLoaderData<typeof loader>();
  const { meals } = data;

  const matches = useMatches();

  const { mealId } = matches[matches.length - 1].params;

  const navigate = useNavigate();
  const goBack = () => navigate("/cook/me");

  function viewMeal(meal: Meal) {
    navigate(`/cook/me/meals/${meal.id}`);
  }

  function isViewingMeal(meal: Meal) {
    return mealId === meal.id;
  }

  return (
    <div>
      <Button text="Go Back" onClick={goBack} variant="tertiary" />

      <h1 className="my-4 text-2xl font-bold">Meals</h1>

      <div className="flex">
        <table className="w-full md:w-1/2 border-spacing-2 border-separate">
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
              <tr key={meal.id} className={`${isViewingMeal(meal) ? "border-2 border-primary" : ""} p-2`}>
                <td>
                  <img src={meal.image} alt={meal.title} width={64} />
                </td>
                <td>{meal.title}</td>
                <td>{meal.price}</td>
                <td className="flex h-full items-center gap-2">
                  <Button
                    text="Publish"
                    icon="fluent:food-pizza-20-filled"
                    variant="primary"
                  />
                  <Button
                    text="View"
                    icon="ph:magnifying-glass-bold"
                    variant="secondary"
                    onClick={() => viewMeal(meal)}
                  />
                  <Button text="Delete" variant="tertiary" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="w-full md:w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default meals;
