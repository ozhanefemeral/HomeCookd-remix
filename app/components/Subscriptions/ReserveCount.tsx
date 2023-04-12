import { Icon } from "@iconify/react";
import React from "react";

function ReserveCount({
  reservationCount,
  limit,
}: {
  reservationCount: number;
  limit: number;
}) {
  return (
    <div className="absolute top-6 left-6 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs text-dark">
      <Icon icon="ic:sharp-people-outline" width={18} className="text-dark" />
      {reservationCount} / {limit}
    </div>
  );
}

export default ReserveCount;
