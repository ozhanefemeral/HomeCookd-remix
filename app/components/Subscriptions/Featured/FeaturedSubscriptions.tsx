import { useState } from "react";
import type { HomepageSubscription } from "~/models/subscription.server";
import CardTags from "../CardTags";
import { Button } from "~/components/Button";
import { Tooltip } from "react-tooltip";
import { Icon } from "@iconify/react";
import type { SerializeFrom } from "@remix-run/server-runtime";
import ReserveCount from "../ReserveDetails";

type Props = {
  subscriptions: SerializeFrom<HomepageSubscription>[];
  handleSubscribeClick: (
    subscription: SerializeFrom<HomepageSubscription>
  ) => void;
};

type CardProps = {
  subscription: SerializeFrom<HomepageSubscription>;
  handleSubscribeClick: (
    subscription: SerializeFrom<HomepageSubscription>
  ) => void;
  index: number;
};

const FeaturedCard = ({
  subscription,
  handleSubscribeClick,
  index,
}: CardProps) => {
  const anchorId = `featured-subscription-${index}`;
  return (
    <div className="relative flex flex-col rounded-lg border md:flex-row">
      <ReserveCount subscription={subscription} />
      <div className="h-auto w-96 md:mb-0">
        <img
          src={subscription.meal.image}
          alt={subscription.title}
          className="h-full rounded-tl-lg rounded-bl-lg object-cover"
        />
      </div>
      <div className="flex w-full flex-[3] flex-col gap-4 p-4">
        <div>
          <img
            className="mr-2 h-16 w-16 rounded-lg object-cover"
            src={subscription.cook.avatar}
            alt={`${subscription.cook.name}'s avatar`}
          />
          <span className="text-lg font-medium">{subscription.cook.name}</span>
        </div>

        <div>
          <h2 className="text-2xl font-bold">{subscription.title}</h2>
          <p className="text-md">{subscription.catchphrase}</p>
        </div>

        <div className="mt-auto">
          <CardTags tags={subscription.meal.tags} justify="justify-start" />
          <Button
            text="Subscribe"
            variant="primary"
            className="mt-4 w-full"
            onClick={() => handleSubscribeClick(subscription!)}
          />
        </div>
      </div>
    </div>
  );
};

export const FeaturedSubscriptions = ({
  subscriptions,
  handleSubscribeClick,
}: Props) => {
  return (
    <div className="flex w-full flex-nowrap gap-8 overflow-x-auto pb-4">
      {subscriptions.map((subscription, index) => (
        <FeaturedCard
          subscription={subscription}
          key={subscription.id}
          handleSubscribeClick={handleSubscribeClick}
          index={index}
        />
      ))}
    </div>
  );
};
