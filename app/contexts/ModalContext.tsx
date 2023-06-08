import { createContext, useContext, useState } from "react";

interface ModalContextProps {
  isEnabled: boolean;
  setIsEnabled: (isEnabled: boolean) => void;
  modalChildren?: React.ReactNode;
  setModalChildren: (modalChildren: React.ReactNode) => void;
}

const ModalContext = createContext<ModalContextProps>({
  isEnabled: false,
  setIsEnabled: () => {},
  setModalChildren: () => {},
  modalChildren: undefined,
});

export const useModalContext = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalChildren, setModalChildren] =
    useState<React.ReactNode>(undefined);

  return (
    <ModalContext.Provider
      value={{ isEnabled, setIsEnabled, modalChildren, setModalChildren }}
    >
      {children}
    </ModalContext.Provider>
  );
};
