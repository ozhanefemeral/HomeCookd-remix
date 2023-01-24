import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";


import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getUserSubscriptions } from "~/models/subscription.server";
import { Tooltip } from "react-tooltip";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const subscriptions = await getUserSubscriptions(userId);
  return json({ subscriptions });
}

export default function SubscriptionsPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <div className="flex flex-col">

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Subscription
          </Link>

          <hr />

          {data.subscriptions.length === 0 ? (
            <p className="p-4">No subscriptions yet</p>
          ) : (
            <ol>
              {data.subscriptions.map((subscription) => (
                <li key={subscription.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={subscription.id}
                  >
                    📝 {subscription.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
