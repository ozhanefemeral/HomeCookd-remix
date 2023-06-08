import { Icon } from "@iconify/react";
import * as Dialog from "@radix-ui/react-dialog";

export type ModalBaseProps = {
  setIsEnabled: (isEnabled: boolean) => void;
  showCloseButton?: boolean;
  children: React.ReactNode;
  title?: string;
  trigger?: React.ReactNode;
  isEnabled: boolean;
};

export function ModalBase({
  setIsEnabled,
  showCloseButton = true,
  children,
  title,
  trigger,
  isEnabled
}: ModalBaseProps) {
  return (
    <>
      <Dialog.Root open={isEnabled}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
            {title && (
              <Dialog.Title className="m-6 text-xl font-medium">
                {title}
              </Dialog.Title>
            )}
            {children}
            {showCloseButton && (
              <Dialog.Close asChild>
                <button
                  className="bg-black absolute top-4 right-4 inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                  onClick={() => setIsEnabled(false)}
                >
                  <Icon icon="carbon:close" width={20} color="white" />
                </button>
              </Dialog.Close>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
