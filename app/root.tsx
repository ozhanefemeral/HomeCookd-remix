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
import SubscribeToMealModal from "./routes/subscribe";
import { useMemo } from "react";

import { getCook, getUser, getUserProfile } from "./session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import reactTooltipStylesheetUrl from "react-tooltip/dist/react-tooltip.css"
import { getUserProfileByUserId } from "./models/user.server";
// import 'react-tooltip/dist/react-tooltip.css'


export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: reactTooltipStylesheetUrl },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request)
  const cook = await getCook(request)
  const userProfile = await getUserProfile(request)

  return json({
    user,
    cook,
    userProfile,
  });
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
