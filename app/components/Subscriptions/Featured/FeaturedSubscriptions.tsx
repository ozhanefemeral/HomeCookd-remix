import { useState } from "react";
import { HomepageSubscription } from "~/models/subscription.server";
import CardTags from "../CardTags";
import { Button } from "~/components/Button";

type Props = {
  subscriptions: HomepageSubscription[];
};

type CardProps = {
  subscription: HomepageSubscription;
};

const FeaturedCard = ({ subscription }: CardProps) => {
  return (
    <div className="flex flex-col rounded-lg border md:flex-row">
      <div className="h-auto w-96 md:mb-0">
        <img
          src={subscription.meal.image}
          alt={subscription.title}
          className="rounded-tl-lg rounded-bl-lg"
        />
      </div>
      <div className="flex w-full flex-[3] flex-col gap-4 p-4">
        <div className="flex">
          <img
            className="mr-2 h-24 w-24 rounded-lg object-cover"
            src={subscription.cook.avatar}
            alt={`${subscription.cook.name}'s avatar`}
          />
          <span className="text-lg font-medium">{subscription.cook.name}</span>
        </div>
        <h2 className="text-3xl font-bold">{subscription.title}</h2>

        <div className="mt-auto">
          <CardTags meal={subscription.meal} justify="justify-start" />
          <Button text="Subscribe" variant="primary" className="mt-4 w-full" />
        </div>
      </div>
    </div>
  );
};

export const FeaturedSubscriptions = ({ subscriptions }: Props) => {
  return (
    <div className="flex flex-nowrap gap-4 overflow-x-auto pb-4">
      {subscriptions.map((subscription, index) => (
        // <div className="">
        <FeaturedCard subscription={subscription} key={subscription.id} />
        // </div>
      ))}
    </div>
  );
};
