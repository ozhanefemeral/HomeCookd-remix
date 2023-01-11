import { LoaderArgs, json } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import RecipeCard from "~/components/RecipeCard";
import { getCookByUsername, getCookRecipes } from "~/models/cook.server";

export async function loader({ request, params }: LoaderArgs) {
  const { username } = params;
  if (!username) {
    return json({ recipes: [], cook: null }, { status: 404 });
  }
  const recipes = await getCookRecipes(username);
  const cook = await getCookByUsername(username);
  return json({ recipes, cook });
}

export default function Recipes() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <div className="grid grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3 lg:grid-cols-4">
        {data.recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}
