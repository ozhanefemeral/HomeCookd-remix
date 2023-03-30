import { ReactNode, useState } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

interface DialogContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextProps>({} as DialogContextProps);

const DialogContextProvider = ({ children }: { children: ReactNode }) => {

  const [open, setOpen] = useState(false);


  const DialogContextValues = useMemo<DialogContextProps>(
    () => ({ 
      open,
      setOpen,
     }),
    [open]
  );

  return (
    <DialogContext.Provider value={DialogContextValues}>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogContextProvider;

export const useDialogContext = () => useContext(DialogContext);
