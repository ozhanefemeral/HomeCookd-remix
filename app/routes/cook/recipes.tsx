import { Outlet } from "@remix-run/react";

export default function SubscriptionsPage() {

  return (
    <div className="flex flex-col">
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
