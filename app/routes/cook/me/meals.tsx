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
import { useModalContext } from "~/contexts/ModalContext";
import CreateMealForm from "~/components/Meals/CreateMealForm";

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
  const { isEnabled, setIsEnabled, setModalChildren } = useModalContext();

  function viewMeal(meal: Meal) {
    navigate(`/cook/me/meals/${meal.id}`);
  }

  function isViewingMeal(meal: Meal) {
    return mealId === meal.id;
  }

  function handleCreateMeal() {
    setIsEnabled(true);
    setModalChildren(<CreateMealForm />);
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Meals</h1>
      <div className="flex flex-row gap-4">
        <Button
          text="Create Meal"
          icon="ph:plus-bold"
          variant="primary"
          onClick={handleCreateMeal}
        />
        <Button text="Go Back" onClick={goBack} variant="tertiary" />
      </div>

      <hr className="my-4" />

      <div className="flex flex-col-reverse gap-4 md:flex-row">
        <div className="flex w-full flex-col md:w-1/2">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className={`flex flex-row items-center gap-4 rounded-md p-2 ${
                isViewingMeal(meal) ? "bg-orange-100" : ""
              }`}
            >
              <div>
                <img src={meal.image} alt={meal.title} width={64} />
              </div>
              <div>{meal.title}</div>
              <div>{meal.price}$</div>
              <div className="ml-auto flex h-full items-center gap-4">
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
              </div>
            </div>
          ))}
        </div>

        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default meals;
