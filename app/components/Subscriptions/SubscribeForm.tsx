import { Meal, Subscription } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import { ActionArgs, json } from "@remix-run/server-runtime";
import React, { useEffect, useState } from "react";
import { HomepageSubscription } from "~/models/subscription.server";
import { ModalBase, ModalBaseProps } from "../Modals/ModalBase";
import CardTags from "./CardTags";
import ReserveCount from "./ReserveDetails";
import { Button } from "../Button";
import { useSubscribeFormContext } from "~/contexts/SubscribeModalContext";
import { useModalContext } from "~/contexts/ModalContext";
import invariant from "tiny-invariant";
import { joinIngredients } from "~/utils";

function SubscribeForm() {
  const [quantity, setQuantity] = useState(1);
  const fetcher = useFetcher();
  const { subscription } = useSubscribeFormContext();
  const { isEnabled, setIsEnabled } = useModalContext();

  invariant(subscription, "Subscription is required");

  const { meal, cook } = subscription;

  const totalPrice = meal?.price! * quantity;
  const canIncrement =
    quantity + subscription.reservationCount! < subscription.limit!;
  const canDecrement = quantity > 1;

  useEffect(() => {
    setQuantity(1);
  }, [isEnabled]);

  return (
    <fetcher.Form action="/order-subscription" method="post">
      <input
        type="hidden"
        name="deliveryTime"
        value={subscription?.orderHours[0]}
      />
      <input type="hidden" name="quantity" value={quantity} />
      <input type="hidden" name="subscriptionId" value={subscription?.id} />
      <div className="relative flex h-52 w-full flex-col items-center justify-center">
        <img
          src={meal!.image || "https://dummyimage.com/256x256"}
          alt="meal"
          className="h-full w-full rounded-t-lg object-cover"
        />
        <div className="absolute -bottom-10 right-6 mt-10 h-20 w-20">
          <img
            className="h-full w-full rounded-full ring-4 ring-white"
            src={cook!!.avatar || "https://dummyimage.com/256x256"}
            alt="avatar"
          />
        </div>
      </div>

      <ReserveCount
        subscription={subscription}
      />

      <div className="flex w-full flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{subscription!.title}</h1>
          <h3 className="text-sm">{cook!.name}</h3>
          <CardTags tags={meal.tags} justify="justify-start" />
          <details>
            <summary className="text-sm font-bold">Description</summary>
            <p>{meal.description}</p>
          </details>
          <details>
            <summary className="text-sm font-bold">Ingredients</summary>
            <p>{joinIngredients(meal.nutrition?.ingredients)} </p>
          </details>
        </div>

        <div className="flex gap-4">
          <select
            name="orderHour"
            id="orderHour"
            className="rounded-lg border border-gray-300 p-2"
          >
            <option value="" disabled selected>
              Order Hour
            </option>
            {subscription?.orderHours.map((orderHour) => (
              <option key={orderHour} value={orderHour}>
                {orderHour}
              </option>
            ))}
          </select>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100"
              onClick={() => canDecrement && setQuantity((prev) => prev - 1)}
            >
              -
            </button>
            <span className="text-xl font-bold">{quantity}</span>
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100"
              onClick={() => canIncrement && setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>

        <Button type="submit" text={`Subscribe (${totalPrice}₺)`} />
      </div>
    </fetcher.Form>
  );
}

export default SubscribeForm;
