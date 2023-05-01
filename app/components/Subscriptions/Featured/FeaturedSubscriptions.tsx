import { useState } from "react";
import { HomepageSubscription } from "~/models/subscription.server";
import CardTags from "../CardTags";
import { Button } from "~/components/Button";
import { Tooltip } from "react-tooltip";
import { Icon } from "@iconify/react";

type Props = {
  subscriptions: HomepageSubscription[];
  handleSubscribeClick: (subscription: HomepageSubscription) => void;
};

type CardProps = {
  subscription: HomepageSubscription;
  handleSubscribeClick: (subscription: HomepageSubscription) => void;
  index: number;
};

const FeaturedCard = ({
  subscription,
  handleSubscribeClick,
  index,
}: CardProps) => {
  const anchorId = `featured-subscription-${index}`;
  return (
    <div className="flex flex-col rounded-lg border md:flex-row">
      <div className="h-auto w-96 md:mb-0">
        <img
          src={subscription.meal.image}
          alt={subscription.title}
          className="h-full rounded-tl-lg rounded-bl-lg object-cover"
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
          <div
            className="slate-900 my-2 flex w-fit items-center gap-1 text-lg font-bold"
            id={anchorId}
          >
            <Icon icon="ic:round-access-time" width={18} />
            {subscription.orderHours[0]}
          </div>
          <Tooltip
            place="right"
            anchorId={anchorId}
            className="tooltip"
          >
            {subscription.orderHours.map((hour) => (
              <div className="text-lg flex items-center justify-center gap-1 font-bold" key={hour}>
                {hour}
              </div>
            ))}
          </Tooltip>
          <CardTags meal={subscription.meal} justify="justify-start" />
          <Button
            text="Subscribe"
            variant="primary"
            className="mt-4 w-full"
            onClick={() => handleSubscribeClick(subscription)}
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
    <div className="flex flex-nowrap gap-8 overflow-x-auto pb-4 w-screen px-2 md:px-4">
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
