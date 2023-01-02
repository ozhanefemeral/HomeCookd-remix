import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import SubMealCard from "~/components/SubMealCard";

import { deleteSubscription, getSubscriptionById, getSubscriptionMeals } from "~/models/subscription.server";
import { requireUserId } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.subscriptionId, "subscriptionId not found");

  const subscription = await getSubscriptionById(params.subscriptionId);
  const subMeals = await getSubscriptionMeals(params.subscriptionId);
  if (!subscription) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ subscription, subMeals });
}

export async function action({ request, params }: ActionArgs) {
  // const userId = await requireUserId(request);
  // invariant(params.subscriptionId, "subscriptionId not found");
  // DELETE subscription
  if (!params.subscriptionId) {
    throw new Response("Not Found", { status: 404 });
  }
  await deleteSubscription(params.subscriptionId);

  return redirect("/user/subscriptions");
}

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.subscription.title}</h3>
      <div>
        <Form method="post"
          onSubmit={(event) => {
            if (!confirm("Are you sure?")) {
              event.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="rounded bg-red-500 mt-2 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400"
          >
            Delete
          </button>
        </Form>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {data.subMeals.map((subMeal) => (
          <SubMealCard key={subMeal.id} subMeal={subMeal} />
        ))}
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
