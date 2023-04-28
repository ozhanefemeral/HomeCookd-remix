// a custom context to handle the subscribe modal
// as simple as keeping isEnabled, setIsEnabled. and subscription is type HomeSubscription to be rendered.

import { createContext, useState } from "react";
import { HomepageSubscription } from "~/models/subscription.server";

export interface SubscribeModalContext {
  isEnabled: boolean;
  setIsEnabled: (isEnabled: boolean) => void;
  subscription?: HomepageSubscription;
  setSubscription: (subscription: HomepageSubscription) => void;
}

export const SubscribeModalContext = createContext<SubscribeModalContext>({
  isEnabled: false,
  setIsEnabled: () => {},
  setSubscription: () => {},
  subscription: undefined,
});

export function useSubscribeModalContext() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [subscription, setSubscription] = useState<
    HomepageSubscription | undefined
  >(undefined);

  return {
    isEnabled,
    setIsEnabled,
    subscription,
    setSubscription,
  };
}
