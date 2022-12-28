import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getSubscriptionById } from "~/models/subscription.server";
import { requireCookId } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const cookId = await requireCookId(request);
  invariant(params.subscriptionId, "subscriptionId not found");

  const subscription = await getSubscriptionById(params.subscriptionId, true);
  if (!subscription) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ subscription });
}

export async function action({ request, params }: ActionArgs) {
  const cookId = await requireCookId(request);
  invariant(params.subscriptionId, "subscriptionId not found");
  // todo: delete subscription
  return redirect("/subscriptions");
}

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.subscription.title}</h3>
      <hr className="my-4" />
      <ul>
        {data.subscription.subscriptionMeals.map((subMeal) => (
          <li key={subMeal.id}>
            <p>{subMeal.meal.title} - {subMeal.quantity} - {subMeal.price}</p>
          </li>
        ))}
      </ul>
      <p>
        User: {data.subscription.user.email}
      </p>
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
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
