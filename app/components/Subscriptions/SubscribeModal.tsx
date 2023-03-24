import { Meal, Subscription } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { SubscriptionWithCookAndMeal } from "~/models/subscriptionMeal.server";

type Props = {
  subscription?: SubscriptionWithCookAndMeal;
  open: boolean;
};

function SubscribeModal({ subscription, open }: Props) {
  const [quantity, setQuantity] = useState(1);
  const fetcher = useFetcher();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setQuantity(1);
    if (open && subscription) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [subscription, open]);

  return (
    <fetcher.Form action="/create-subscription-meal" method="post">
      <div className="fixed inset-0 bg-black opacity-50" />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="rounded-lg bg-white p-4 shadow-lg">
          This is the modal
          <button className="w-full rounded-lg bg-green-700 py-2 text-white">
            Sipariş Ver
          </button>
        </div>
      </div>
    </fetcher.Form>
  );
}

export default SubscribeModal;
