import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { useMemo } from "react";

import { getCook, getUser, getUserProfile } from "./session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import reactTooltipStylesheetUrl from "react-tooltip/dist/react-tooltip.css";
import siteStylesheetUrl from "./assets/css/styles.css";
import { getUserProfileByUserId } from "./models/user.server";
import {
  SubscribeModalProvider,
  useSubscribeModalContext,
} from "./contexts/SubscribeModalContext";
import SubscribeModal from "./components/Subscriptions/SubscribeModal";
// import 'react-tooltip/dist/react-tooltip.css'

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: reactTooltipStylesheetUrl },
    { rel: "stylesheet", href: siteStylesheetUrl },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  const userProfile = await getUserProfile(request);

  return json({
    user,
    userProfile,
  });
}

function Modals() {
  const {
    subscription,
    isEnabled: subscribeModalEnabled,
    setIsEnabled: setSubscribeModalEnabled,
  } = useSubscribeModalContext();

  return (
    <>
      {subscribeModalEnabled && (
        <SubscribeModal
          subscription={subscription}
          isEnabled={subscribeModalEnabled}
          setIsEnabled={setSubscribeModalEnabled}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <SubscribeModalProvider>
      <html lang="en" className="h-full">
        <head>
          <Meta />
          <Links />
        </head>
        <body className="h-full">
          <Modals />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </SubscribeModalProvider>
  );
}
