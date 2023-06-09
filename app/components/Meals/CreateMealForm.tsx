import { useFetcher, useLoaderData, useTransition } from "@remix-run/react";
import { LoaderArgs, json } from "@remix-run/server-runtime";
import { requireUser } from "~/session.server";
import { Button } from "../Button";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser(request);

  return json({ user });
}

interface FormPageProps {
  currentPage: number;
}

function BasicInfo({ currentPage }: FormPageProps) {
  const show = currentPage === 1;

  return (
    <div className={`flex flex-col gap-4 ${show ? "block" : "hidden"}`}>
      <h1 className="text-2xl font-bold">Create Meal: Basic Info</h1>
      <div className="flex flex-col gap-4">
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="title">Meal Name</label>
          <input
            type="text"
            name="title"
            placeholder="Meal Name"
            className="w-full rounded-md border border-gray-300 p-2"
            id="title"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="description">Meal Description</label>
          <textarea
            name="description"
            placeholder="Meal Description"
            className="w-full rounded-md border border-gray-300 p-2"
            id="description"
          />
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex w-1/4 flex-col gap-1">
            <label htmlFor="price">Meal Price</label>
            <input
              type="number"
              name="price"
              placeholder="Meal Price"
              className="w-full rounded-md border border-gray-300 p-2"
              id="price"
            />
          </div>
          <div className="flex w-3/4 flex-col gap-1">
            <label htmlFor="image">Meal Image</label>
            <input
              type="file"
              name="image"
              placeholder="Meal Image"
              className="w-full rounded-md border border-gray-300 p-2"
              id="image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NutritionDetails({ currentPage }: FormPageProps) {
  const show = currentPage === 2;
  return (
    <div className={`flex flex-col gap-4 ${show ? "block" : "hidden"}`}>
      <h1 className="text-2xl font-bold">Create Meal: Nutrition Details</h1>
      <div className="flex flex-row flex-wrap gap-4">
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="ingredients">Ingredients</label>
          <Tooltip
            place="top"
            anchorId="ingredients"
            content="Separate ingredients with commas and use . for decimals"
          />
          <textarea
            name="ingredients"
            id="ingredients"
            placeholder="Example: 1.5 cups of flour, 2 cups of milk, 1 cup of sugar"
            className="rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="calories">Calories</label>
          <input
            type="number"
            name="calories"
            placeholder="Meal Calories"
            min={0}
            id="calories"
            step={20}
            className="rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="protein">Protein (g)</label>
          <input
            type="number"
            name="protein"
            placeholder="Meal Protein"
            min={0}
            id="protein"
            className="rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="fat">Fat (g)</label>
          <input
            type="number"
            name="fat"
            placeholder="Meal Fat"
            min={0}
            id="fat"
            className="rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="carbs">Carbs (g)</label>
          <input
            type="number"
            name="carbs"
            placeholder="Meal Carbs"
            min={0}
            id="carbs"
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>
    </div>
  );
}

function CreateMealForm() {
  const fetcher = useFetcher();
  const { state } = useTransition();
  const data = useLoaderData<typeof loader>();

  const { user } = data;
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <fetcher.Form
      action="/create-meal"
      method="post"
      encType="multipart/form-data"
    >
      {/* add overlay to block ui if state === "submitting" */}
      {state === "submitting" && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="rounded-md bg-white p-4">
            <h1 className="text-2xl font-bold">Creating Meal...</h1>
          </div>
        </div>
      )}
      <div className="p-4">
        <BasicInfo currentPage={currentPage} />
        <NutritionDetails currentPage={currentPage} />
        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center gap-1 pt-4">
            <Button
              text="Back"
              className="self-end justify-self-end"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              variant="tertiary"
              type="button"
            />
            {currentPage} / 2
            <Button
              text="Next"
              className="self-end justify-self-end"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === 2}
              variant="tertiary"
              type="button"
            />
          </div>
          {currentPage === 2 && (
            // todo: add validation & disable button if invalid/submission in progress
            <Button type="submit" text="Create Meal" className="mt-4" />
          )}
        </div>
      </div>
      <input type="hidden" name="userId" value={user.id} />
    </fetcher.Form>
  );
}

export default CreateMealForm;
