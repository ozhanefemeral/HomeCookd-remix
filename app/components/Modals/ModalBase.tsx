type Props = {
  setOpen: (open: boolean) => void;
  showCloseButton?: boolean;
  children: React.ReactNode;
};

export function ModalBase({
  setOpen,
  showCloseButton = true,
  children,
}: Props) {
  return (
    <>
      {/* TODO switch to radixUI with tailwind */}
      <div className="fixed inset-0 bg-black opacity-80" />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="xs:w-full relative flex flex-col divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:w-full md:w-1/3">
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
          {children}
        </div>
      </div>
    </>
  );
}
