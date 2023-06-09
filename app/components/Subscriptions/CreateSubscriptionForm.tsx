import { LoaderArgs } from "@remix-run/server-runtime";
import {
  getSubscriptionWithMeal,
} from "~/models/subscription.server";
import { requireUser } from "~/session.server";
import { orderHours } from "~/utils";
import { Button } from "../Button";
import { useFetcher, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser(request);
  const subscriptionId = params.subscriptionId;

  invariant(user, "You must be logged in to view this page");
  invariant(subscriptionId, "You must provide a subscription id");

  const subscription = await getSubscriptionWithMeal(subscriptionId);

  return { user, subscription };
}

function CreateSubscriptionForm() {
  const fetcher = useFetcher();
  const data = useLoaderData<typeof loader>();
  const { user, subscription } = data;

  return (
    <fetcher.Form action="/create-subscription" method="post">
      {/* meal image with max width of 360px */}
      <div className="flex flex-row flex-wrap gap-4 py-4">
        <img
          src={subscription?.meal.image}
          alt={subscription?.meal.title}
          style={{ maxWidth: 360, maxHeight: 80 }}
        />
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="rounded-md border p-2"
            defaultValue={subscription?.title}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="orderHours">Order Hours</label>
          <select name="orderHours" className="rounded-md border p-2">
            {orderHours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="limit">Limit</label>
          <input
            type="number"
            name="limit"
            placeholder="Limit"
            className="rounded-md border p-2"
            min={1}
            defaultValue={1}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="rounded-md border p-2"
            defaultValue={subscription?.price}
            min={1}
          />
        </div>
        <input type="hidden" name="cookedBy" value={user.id} />
        <input type="hidden" name="mealId" value={subscription?.meal.id} />
        <Button type="submit" text="Create Subscription" className="self-end justify-self-end"/>
      </div>
    </fetcher.Form>
  );
}

export default CreateSubscriptionForm;
