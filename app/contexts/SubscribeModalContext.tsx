// a custom context to handle the subscribe modal
// as simple as keeping isEnabled, setIsEnabled. and subscription is type HomeSubscription to be rendered.

import react, { createContext, useContext, useEffect, useState } from "react";
import { HomepageSubscription } from "~/models/subscription.server";

interface SubscribeModalContextProps {
  isEnabled: boolean;
  setIsEnabled: (isEnabled: boolean) => void;
  subscription?: HomepageSubscription;
  setSubscription: (subscription: HomepageSubscription) => void;
}

const SubscribeModalContext = createContext<SubscribeModalContextProps>({
  isEnabled: false,
  setIsEnabled: () => {},
  setSubscription: () => {},
  subscription: undefined,
});

export const useSubscribeModalContext = () => {
  return useContext(SubscribeModalContext);
}

export const SubscribeModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [subscription, setSubscription] = useState<
    HomepageSubscription | undefined
  >(undefined);

  useEffect(() => {
    console.log("subscription", subscription);
  }, [subscription]);

  return (
    <SubscribeModalContext.Provider
      value={{ isEnabled, setIsEnabled, subscription, setSubscription }}
    >
      {children}
    </SubscribeModalContext.Provider>
  );
};