import { createContext, useContext, useEffect, useState } from "react";
import type { HomepageSubscription } from "~/models/subscription.server";
import { useModalContext } from "./ModalContext";
import { SerializeFrom } from "@remix-run/server-runtime";

interface SubscribeContextProps {
  subscription?: SerializeFrom<HomepageSubscription>;
  setSubscription: (subscription: SerializeFrom<HomepageSubscription>) => void;
}

const SubscribeFormContext = createContext<SubscribeContextProps>({
  setSubscription: () => {},
  subscription: undefined,
});

export const useSubscribeFormContext = () => {
  return useContext(SubscribeFormContext);
};

export const SubscribeFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [subscription, setSubscription] = useState<
  SerializeFrom<HomepageSubscription> | undefined
  >(undefined);

  const { isEnabled, setIsEnabled } = useModalContext();

  useEffect(() => {
    if (subscription) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [subscription, setIsEnabled]);

  useEffect(() => {
    if (isEnabled === false) {
      setSubscription(undefined);
    }
  }, [isEnabled]);

  return (
    <SubscribeFormContext.Provider value={{ subscription, setSubscription }}>
      {children}
    </SubscribeFormContext.Provider>
  );
};
