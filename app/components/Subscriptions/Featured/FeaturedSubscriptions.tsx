import { useState } from "react";
import type { HomepageSubscription } from "~/models/subscription.server";
import CardTags from "../CardTags";
import { Button } from "~/components/Button";
import { Tooltip } from "react-tooltip";
import { Icon } from "@iconify/react";
import type { SerializeFrom } from "@remix-run/server-runtime";
import ReserveCount from "../ReserveDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SubscriptionCard from "../Cards/HomeCard"

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
    <div className="relative flex rounded-lg border md:flex-row">
      <ReserveCount subscription={subscription} />
      <div className="w-2/3">
        <img
          src={subscription.meal.image}
          alt={subscription.title}
          className="rounded-tl-lg rounded-bl-lg object-cover"
        />
      </div>
      <div className="flex w-1/3 flex-[3] flex-col gap-4 p-4">
        <div>
          <h2 className="text-2xl font-bold">{subscription.title}</h2>
          <p className="text-md">{subscription.catchphrase}</p>
        </div>

        <div className="flex items-start gap-2">
          <div className="h-16 w-16">
            <img
              className="mr-2 rounded-lg object-cover"
              src={subscription.cook.avatar}
              alt={`${subscription.cook.name}'s avatar`}
            />
          </div>
          <span className="text-sm font-medium">{subscription.cook.name}</span>
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
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
    >
      {subscriptions.map((subscription, index) => (
        <SwiperSlide>
          <SubscriptionCard
            subscription={subscription}
            key={subscription.id}
            handleSubscribeClick={handleSubscribeClick}
          />
        </SwiperSlide>
      ))}
      {subscriptions.map((subscription, index) => (
        <SwiperSlide>
          <SubscriptionCard
            subscription={subscription}
            key={subscription.id}
            handleSubscribeClick={handleSubscribeClick}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
