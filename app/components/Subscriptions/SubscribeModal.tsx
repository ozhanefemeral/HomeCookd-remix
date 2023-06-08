import { Meal, Subscription } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import { ActionArgs, json } from "@remix-run/server-runtime";
import React, { useEffect, useState } from "react";
import { HomepageSubscription } from "~/models/subscription.server";
import { ModalBase, ModalBaseProps } from "../Modals/ModalBase";
import CardTags from "./CardTags";
import ReserveCount from "./ReserveCount";
import { Button } from "../Button";
import { useSubscribeModalContext } from "~/contexts/SubscribeModalContext";

type Props = {
} & ModalBaseProps;

function SubscribeModal({ ...otherProps }: Props) {
  const [quantity, setQuantity] = useState(1);
  const fetcher = useFetcher();
  const { subscription, isEnabled, setIsEnabled } = useSubscribeModalContext();

  const { meal, cook } = subscription;

  const totalPrice = meal?.price! * quantity;
  const canIncrement =
    quantity + subscription.reservationCount! < subscription.limit!;
  const canDecrement = quantity > 1;

  useEffect(() => {
    setQuantity(1);
    if (isEnabled && subscription) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [subscription, isEnabled]);

  return (
    <ModalBase
      open={isEnabled}
      setOpen={setIsEnabled}
      trigger={
        <button className="w-full rounded-lg bg-amber-600 py-2 text-white">
          Subscribe ({totalPrice}₺)
        </button>
      }
    >
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

          {/* meal tags */}
        </div>

        <ReserveCount
          reservationCount={subscription!.reservationCount!}
          limit={subscription!.limit}
        />

        <div className="flex w-full flex-col gap-4 p-6">
          <div>
            <h1 className="text-2xl font-bold">{subscription!.title}</h1>
            <h3 className="mb-2 text-sm">{cook!.name}</h3>
            <CardTags meal={meal} justify="justify-start" />
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
    </ModalBase>
  );
}

export default SubscribeModal;
