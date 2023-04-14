import { LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { useUser } from "~/utils";

// TODO
// AUTOMATICALLY NAVIGATE TO THAT DAY OF THE WEEK

export default function SubscriptionsPage() {
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="p-4">
        <ul>
          <li>
            <Link
              to="/cook/me/subscriptions"
              className="text-3xl font-bold text-primary"
            >
              Your subscriptions
            </Link>
          </li>
          <li>
            <Link
              to="/cook/me/meals"
              className="text-3xl font-bold text-primary"
            >
              Your meals
            </Link>
          </li>
        </ul>

        <div className="flex-1 pt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
