import { createContext, useContext, useEffect, useState } from "react";
import { HomepageSubscription } from "~/models/subscription.server";
import { useModalContext } from "./ModalContext";

interface SubscribeContextProps {
  subscription?: HomepageSubscription;
  setSubscription: (subscription: HomepageSubscription) => void;
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
    HomepageSubscription | undefined
  >(undefined);

  const { isEnabled, setIsEnabled } = useModalContext();

  useEffect(() => {
    if (subscription) {
      setIsEnabled(true);
    }
  }, [subscription]);

  return (
    <SubscribeFormContext.Provider value={{ subscription, setSubscription }}>
      {children}
    </SubscribeFormContext.Provider>
  );
};