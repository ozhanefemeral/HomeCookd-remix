//

import { Meal, Subscription } from "@prisma/client";
import { useFetcher, useSearchParams } from "@remix-run/react";
import { useState, useEffect } from "react";
import { deliveryHours } from "~/utils";

type Props = {
  subscription: Subscription;
  meal: Meal;
  open: boolean;
};

export default function SubscribeMealModal({ subscription, meal, open }: Props) {

  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const fetcher = useFetcher();
  const [searchParams, setSearchParams] = useSearchParams();

  // return null if open is false, meal is undefined, or subscription is undefined

  useEffect(() => {
    setQuantity(1);
    if (open && meal && subscription) {
      setShow(true);
    }
    else {
      setShow(false);
    }
  }, [subscription, meal, open])


  function handleClose() {
    setSearchParams({ subscribe: "false", mealId: "", subscriptionId: "" });
  }

  if (!open || !meal || !subscription) return null;

  const totalPrice = meal.price * quantity;

  return (
    <fetcher.Form
      action="/create-subscription-meal"
      method="post"
    >
      <input type="hidden" name="mealBody" value={JSON.stringify(meal)} />
      <input type="hidden" name="subscriptionId" value={subscription.id} />
      <input type="hidden" name="mealId" value={meal.id} />
      <div className="fixed inset-0 bg-black opacity-50" />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-2xl font-bold mb-4">Subscribe to {meal.title}</h2>
          <div className="mt-4">
            <label htmlFor="deliveryDay" className="font-semibold">Delivery Day</label>
            <br />
            <select
              id="deliveryDay"
              name="deliveryDay"
            >
              <option value="MONDAY">Monday</option>
              <option value="TUESDAY">Tuesday</option>
              <option value="WEDNESDAY">Wednesday</option>
              <option value="THURSDAY">Thursday</option>
              <option value="FRIDAY">Friday</option>
              <option value="SATURDAY">Saturday</option>
              <option value="SUNDAY">Sunday</option>
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="deliveryHour" className="font-semibold">Delivery Hour</label>
            <br />
            <select
              id="deliveryHour"
              name="deliveryHour"
            >
              {deliveryHours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4">
            <label htmlFor="quantity" className="font-semibold">Quantity</label>
            <br></br>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min={1}
              defaultValue={1}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <p>
              <span className="font-semibold">Total Price is ${totalPrice} </span>
            </p>
          </div>
          <div className="flex justify-end">
            <div
              className="bg-red-500 text-white rounded-lg px-4 py-2 mr-2 hover:cursor-pointer"
              onClick={handleClose}
            >
              Cancel
            </div>
            <button
              className="bg-primary text-white rounded-lg px-4 py-2"
              type="submit"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </fetcher.Form>
  );
}