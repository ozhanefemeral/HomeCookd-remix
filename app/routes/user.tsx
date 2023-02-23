import { Form, Link, Outlet, useLoaderData } from "@remix-run/react"
import { json, LoaderArgs } from "@remix-run/server-runtime";
import { getUserSubscriptions } from "~/models/subscription.server";
import { requireUserId } from "~/session.server";
import { useUserProfile } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const subscriptions = await getUserSubscriptions(userId);
  return json({ subscriptions });
}

const User = () => {
  const data = useLoaderData<typeof loader>();
  const profile = useUserProfile();

  return <div>
    <header className="flex items-center justify-between bg-slate-800 p-4 text-white mb-4">
      <h1 className="text-3xl font-bold">
        <Link to=".">{profile!.name}</Link>
      </h1>
      <Form action="/logout" method="post">
        <button
          type="submit"
          className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
        >
          Logout
        </button>
      </Form>
    </header>

    {/* buttons to navigate /profile and /subscriptions */}
    <Link to="profile" className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600">Profile</Link>
    <Link to="subscriptions" className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600">Subscriptions</Link>


    <Outlet />
  </div>
}

export default User