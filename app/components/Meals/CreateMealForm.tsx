import { useFetcher, useLoaderData } from "@remix-run/react";
import { LoaderArgs, json } from "@remix-run/server-runtime";
import { requireUser } from "~/session.server";
import { Button } from "../Button";

export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser(request);

  return json({ user });
}

function CreateMealForm() {
  const fetcher = useFetcher();
  const data = useLoaderData<typeof loader>();

  const { user } = data;

  return (
    <fetcher.Form
      action="/create-meal"
      method="post"
      encType="multipart/form-data"
    >
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Create Meal</h1>
        <input type="hidden" name="userId" value={user.id} />
        <input
          type="text"
          name="title"
          placeholder="Meal Name"
          className="w-full rounded-md border border-gray-300 p-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Meal Description"
          className="w-full rounded-md border border-gray-300 p-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Meal Price"
          className="w-full rounded-md border border-gray-300 p-2"
        />
        <input
          type="file"
          name="image"
          placeholder="Meal Image"
          className="w-full rounded-md border border-gray-300 p-2"
        />
        <Button
          type="submit"
          text="Create Meal"
          className="self-end justify-self-end"
        />
      </div>
    </fetcher.Form>
  );
}

export default CreateMealForm;
