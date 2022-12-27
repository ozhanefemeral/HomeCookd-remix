import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useMemo, useState } from 'react'
import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import { useFetcher, useLoaderData, useSearchParams, useSubmit } from '@remix-run/react';
import { useEffect } from 'react';
import { useUser } from '~/utils';
import { requireUserId } from '~/session.server';
import { getSubscriptionMeals, getUserSubscriptions } from '~/models/subscription.server';
import { Subscription } from '@prisma/client';
import { getMealById } from '~/models/meals.server';

export async function loader({ request }: LoaderArgs) {
  // meal comes from the query string
  const userId = await requireUserId(request);
  const searchParams = new URL(request.url).searchParams;
  const mealId = searchParams.get("meal");
  const meal = await getMealById(mealId as string);
  const subscriptions = await getUserSubscriptions(userId);
  // const user = useUser();
  return json({ mealId, subscriptions, meal });
}

export async function action({ params }: ActionArgs) {
  console.log(params);
  return json({ params });
}

export default function SubscribeToMealModal() {
  let [isOpen, setIsOpen] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSubscription, setSelectedSubscription] = useState("0");
  const { mealId, subscriptions, meal } = useLoaderData();
  const submit = useSubmit();
  const fetcher = useFetcher();
  
  function closeModal() {
    window.history.back();
    setIsOpen(false);
  }

  const totalPrice = quantity * meal.price;

  // when selectedSubscription changes, fetch the subscription meals

  function handleSubscriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedSubscription(e.target.value);
    submit(e.target);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <div className="fixed inset-0 bg-black bg-opacity-60" />

        {/* <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
        </Transition.Child> */}

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Subscribe to meal: {meal.title}
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Fill out the form below to subscribe to this meal.
                </p>
              </div>

              <div className="mt-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>

              <div className="mt-4">
                <p>
                  Total price: <span className="font-bold">${totalPrice}</span>
                </p>
              </div>

              <div className="mt-4">
                <select onChange={handleSubscriptionChange} value={selectedSubscription}>
                  <option value="0" disabled>Select a subscription</option>
                  {subscriptions.map((subscription: Subscription) => (
                    <option key={subscription.id} value={subscription.id}>
                      {subscription.title}
                    </option>
                  ))}
                </select>
              </div>

              <p>
                {selectedSubscription}
              </p>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                  Yummy!
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
