import * as Dialog from "@radix-ui/react-dialog";

export type ModalBaseProps = {
  setOpen: (open: boolean) => void;
  showCloseButton?: boolean;
  children: React.ReactNode;
  title?: string;
  trigger?: React.ReactNode;
  open: boolean;
};

export function ModalBase({
  setOpen,
  showCloseButton = true,
  children,
  title,
  trigger,
  open,
}: ModalBaseProps) {
  return (
    <>
      {/* TODO switch to radixUI with tailwind */}
      <Dialog.Root open={open}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
            <Dialog.Title className="m-0 font-medium">{title}</Dialog.Title>
            <Dialog.Description className="text-mauve11 leading-normal">
              {children}
            </Dialog.Description>
            {showCloseButton && (
              <Dialog.Close asChild>
                <button
                  className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                >
                  x
                </button>
              </Dialog.Close>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {/* <div className="fixed inset-0 bg-black opacity-80" />
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <div className="xs:w-full relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-8 shadow-sm sm:w-full md:w-1/3">
          {showCloseButton && (
            <div className="absolute top-0 right-0 z-10 p-4">
              <button
                type="button"
                className="z-10 rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setOpen(false)}
              >
                <svg
                  className="h-3 w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
          {title && (
            <h2 className="mb-4 text-center text-2xl font-bold text-primary">
              {title}
            </h2>
          )}
          {children}
        </div>
      </div> */}
    </>
  );
}
