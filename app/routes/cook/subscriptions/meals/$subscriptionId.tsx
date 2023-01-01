import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteSubscription } from "~/models/subscription.server";
import { getSubscriptionMealById, deleteSubscriptionMeal } from "~/models/subscriptionMeal.server";
import { requireCookId } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const cookId = await requireCookId(request);
  invariant(params.subscriptionId, "subscriptionId not found");

  const subMeal = await getSubscriptionMealById(params.subscriptionId);
  if (!subMeal) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ subMeal });
}

export async function action({ request, params }: ActionArgs) {
  const cookId = await requireCookId(request);
  invariant(params.subscriptionId, "subscriptionId not found");

  await deleteSubscriptionMeal(params.subscriptionId);
  return redirect("/cook/subscriptions");
}

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.subMeal.meal.title}</h3>
      <hr className="my-4" />
      <p>Total Price: {data.subMeal.meal.price}</p>
      {/* quantity: */}
      <p>Quantity:{data.subMeal.quantity}</p>
      <p>Delivery Date: {data.subMeal.deliveryDay} - {data.subMeal.deliveryHour}</p>
      <Form method="post"
        onSubmit={(event) => {
          if (!confirm("Are you sure?")) {
            event.preventDefault();
          }
        }}
      >
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
