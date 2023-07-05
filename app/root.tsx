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

import { getUser, getUserProfile } from "./session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import reactTooltipStylesheetUrl from "react-tooltip/dist/react-tooltip.css";
import siteStylesheetUrl from "./assets/css/styles.css";
import swiperStylesheetUrl from "swiper/css";
import swiperPaginationStylesheetUrl from "swiper/css/pagination";
import { getUserProfileByUserId } from "./models/user.server";
import {
  SubscribeFormProvider,
  useSubscribeFormContext,
} from "./contexts/SubscribeModalContext";
import SubscribeForm from "./components/Subscriptions/SubscribeForm";
import { ModalProvider, useModalContext } from "./contexts/ModalContext";
import { ModalBase } from "./components/Modals/ModalBase";
// import 'react-tooltip/dist/react-tooltip.css'

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: reactTooltipStylesheetUrl },
    { rel: "stylesheet", href: siteStylesheetUrl },
    { rel: "stylesheet", href: swiperStylesheetUrl },
    { rel: "stylesheet", href: swiperPaginationStylesheetUrl },
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
  const { isEnabled, setIsEnabled, modalChildren } = useModalContext();

  return (
    <ModalBase isEnabled={isEnabled} setIsEnabled={setIsEnabled}>
      {modalChildren}
    </ModalBase>
  );
}

export default function App() {
  return (
    <ModalProvider>
      <SubscribeFormProvider>
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
      </SubscribeFormProvider>
    </ModalProvider>
  );
}
