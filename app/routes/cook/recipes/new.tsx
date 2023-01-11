import { useLoaderData } from '@remix-run/react';
import { ActionArgs, json, LoaderArgs } from '@remix-run/server-runtime';
import react from 'react';
import { requireCookId } from '~/session.server';

export async function loader({ request }: ActionArgs) {
  const cookId = requireCookId(request, "/cook/login");
  return json({ cookId });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    ingredients: formData.get("ingredients") as string,
    instructions: formData.get("instructions") as string,
    image: formData.get("image") as string,
    cook: formData.get("cookId") as string,
  }
  return {
    status: 201
  }
}

export default function NewRecipe() {
  const data = useLoaderData();

  // form with tailwind
  return <>
    <form action="/cook/recipes/new" method="post">
      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" cols={30} rows={10}></textarea>
      </div>
      <div className="flex flex-col">
        <label htmlFor="ingredients">Ingredients</label>
        <textarea name="ingredients" id="ingredients" cols={30} rows={10}></textarea>
      </div>
      <div className="flex flex-col">
        <label htmlFor="instructions">Instructions</label>
        <textarea name="instructions" id="instructions" cols={30} rows={10}></textarea>
      </div>
      <div className="flex flex-col">
        <label htmlFor="image">Image</label>
        <input type="file" name="image" id="image" />
      </div>
      <input type="hidden" name="cookId" value={data.cookId} />
      <button type="submit">Submit</button>
    </form>
  </>
}