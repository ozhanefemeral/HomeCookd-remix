import { LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Outlet, useNavigate } from "@remix-run/react";
import { Button } from "~/components/Button";
import { getCookProfile, getUser, getUserProfile } from "~/session.server";
import { useUser } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const userProfile = await getUserProfile(request);
  const cookProfile = await getCookProfile(request);
  const user = await getUser(request);

  return json({
    userProfile,
    cookProfile,
    user,
  });
}

export default function SubscriptionsPage() {
  const user = useUser();
  const navigate = useNavigate();

  function goToSubscriptions() {
    navigate("/cook/me/subscriptions");
  }

  function goToMeals() {
    navigate("/cook/me/meals");
  }

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

      <main className="flex flex-col gap-4 p-4 md:flex-row">
        <ul className="flex flex-row gap-4 border-r border-gray-300 pr-4 md:flex-col">
          <li>
            <Button
              text="Your subscriptions"
              onClick={goToSubscriptions}
              variant="tertiary"
            />
          </li>
          <li>
            <Button text="Your meals" onClick={goToMeals} variant="tertiary" />
          </li>
        </ul>
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
