import { getRandomMeals } from "~/models/meals.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { json, LoaderArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);

  const meals = await getRandomMeals();
  return json({ meals });
}

export default function HomePage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  // put meals as grid 
  return (
    <div>
      <main>
        {/* grid container */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 m-4">
          {data.meals.map((meal) => (
            <div className="flex flex-col items-center justify-end h-64 bg-gray-100 rounded-lg shadow-md p-4" key={meal.id}>
              <img
                className="object-cover w-full h-full rounded-lg"
                src="https://images.unsplash.com/photo-1542736884-8c9b6d6b4f9d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjJTIwY2F0JTIwYmFja2dy
                    b3VuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                alt=""
              />
              <h2 className="text-lg font-semibold text-gray-700">{meal.title}</h2>
              {/* button to subscribe */}
              <button className="px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
              <Link to="?subscribe=123">Subscribe</Link>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}