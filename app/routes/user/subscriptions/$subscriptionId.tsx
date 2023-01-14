import { Meal, MealTags } from "@prisma/client";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import invariant from "tiny-invariant";
import MealCardSmall from "~/components/MealCardSmall";
import SubMealCard from "~/components/SubMealCard";
import SubscribeMealModal from "~/components/SubscribeMealModal";
import { getAllMeals, MealWithCook } from "~/models/meals.server";

import { deleteSubscription, getSubscriptionById, getSubscriptionMeals } from "~/models/subscription.server";
import { requireUserId } from "~/session.server";
import { formatMealTag, mapMealTagToEmoji } from "~/utils";

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.subscriptionId, "subscriptionId not found");

  const subscription = await getSubscriptionById(params.subscriptionId);
  const subMeals = await getSubscriptionMeals(params.subscriptionId);
  const recommendedMeals = await getAllMeals();

  if (!subscription) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ subscription, subMeals, recommendedMeals });
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

export default function SubscriptionPage() {
  const data = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { subscription, subMeals, recommendedMeals } = data

  const [filteredMeals, setFilteredMeals] = useState<MealWithCook[]>(recommendedMeals);
  const [appliedTags, setAppliedTags] = useState<MealTags[]>([]);

  const showSubscribeMealModal = searchParams.get("subscribe") && searchParams.get("mealId") && searchParams.get("subscriptionId");

  const [clickedMeal, setClickedMeal] = useState<Meal>();

  function handleSubscribe(meal: Meal) {
    setClickedMeal(meal);
    setSearchParams({ subscribe: "true", mealId: meal.id, subscriptionId: subscription.id });
  }

  useEffect(() => {
    if (appliedTags.length === 0) {
      setFilteredMeals(recommendedMeals);
    } else {
      setFilteredMeals(
        recommendedMeals.filter((meal) => {
          return appliedTags.every((tag) => meal.tags.includes(tag));
        })
      );
    }
  }, [appliedTags, recommendedMeals]);

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
      {/* map submealcards with horizontal scroll */}
      <div className="flex flex-row gap-4 flex-nowrap overflow-x-auto py-4">
        {subMeals.map((subMeal) => (
          <SubMealCard key={subMeal.id} subMeal={subMeal} />
        ))}
      </div>

      <hr />

      {/* more meals */}
      <div className="mt-4">
        <h3 className="text-xl font-bold my-2">Discover more</h3>
        {/* filter */}
        <div className="flex flex-row gap-4 flex-wrap">
          {Object.values(MealTags).map((tag) => (
            <button
              key={tag}
              // bg primary and white text if applied, light gray bg and black text if not applied
              className={`rounded px-4 py-2 ${appliedTags.includes(tag) ? "bg-primary text-white" : "bg-gray-200 text-gray-900"
                }`}
              onClick={() => {
                if (appliedTags.includes(tag)) {
                  setAppliedTags(appliedTags.filter((t) => t !== tag));
                } else {
                  setAppliedTags([...appliedTags, tag]);
                }
              }}
            >
              {mapMealTagToEmoji(tag)} {formatMealTag(tag)} {appliedTags.includes(tag) && <span className="text-white">✓</span>}
            </button>
          ))}
          {/* clear all */}
          {appliedTags.length > 0 && (
            <button
              className="rounded px-4 py-2 bg-gray-200 text-gray-900"
              onClick={() => {
                setAppliedTags([]);
              }}
            >
              Show all
            </button>
          )}
        </div>
        {/* smaller, chip sized food cards */}
        <div className="flex flex-row gap-4 flex-wrap mt-4">
          {filteredMeals.map((meal) => (
            <MealCardSmall key={meal.id} meal={meal} handleSubscribe={() => handleSubscribe(meal)} />
          ))}
        </div>
      </div>

      <SubscribeMealModal meal={clickedMeal!} subscription={subscription!} open={!!showSubscribeMealModal} />
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
