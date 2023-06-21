import { Icon } from "@iconify/react";
import { SerializeFrom } from "@remix-run/server-runtime";
import React from "react";
import { Tooltip } from "react-tooltip";
import { HomepageSubscription } from "~/models/subscription.server";

function ReserveCount({
  subscription,
}: {
  subscription: SerializeFrom<HomepageSubscription>;
}) {
  const { reservationCount, limit } = subscription;
  return (
    <div className="absolute top-4 left-4 flex flex-col items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-dark">
      <div className="flex items-center gap-2">
        <Icon icon="ic:sharp-people-outline" width={18} className="text-dark" />
        {reservationCount} / {limit}
      </div>

      <div className="flex items-center gap-2" id={subscription.id}>
        <Icon icon="ic:round-access-time" width={18} />
        {subscription.orderHours[0]}
        <Tooltip place="left" anchorId={subscription.id} className="tooltip">
          {subscription.orderHours.map((hour) => (
            <div
              className="text-md flex items-center justify-center gap-1 font-bold"
              key={hour}
            >
              {hour}
            </div>
          ))}
        </Tooltip>
      </div>
    </div>
  );
}

export default ReserveCount;
