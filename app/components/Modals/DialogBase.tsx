import { ModalBase } from "./ModalBase";

type Props = {
  setOpen: (open: boolean) => void;
  children?: React.ReactNode;
  showSecondaryButton?: boolean;
  onSecondaryButtonClick?: () => void;
  onPrimaryButtonClick?: () => void;
  dialogTitle?: string;
  dialogText?: string;
};

export function DialogBase({
  setOpen,
  showSecondaryButton,
  dialogText,
  dialogTitle,
  children,
}: Props) {
  if (children) return <ModalBase setOpen={setOpen}>{children}</ModalBase>;

  return (
    <>
      <ModalBase setOpen={setOpen}>
        <h1 className="text-center text-xl font-bold text-primary">
          {dialogTitle}
        </h1>
        <p className="text-center text-gray-600">{dialogText}</p>
        <div
          className={`flex flex-row items-center justify-center gap-4 p-4 ${
            showSecondaryButton && "justify-evenly"
          }`}
        >
          <button
            className="flex rounded bg-primary py-2 px-4 text-white hover:bg-primary-dark"
            onClick={() => setOpen(false)}
          >
            Primary
          </button>
          {showSecondaryButton && (
            <button
              className="flex rounded bg-primary py-2 px-4 text-white hover:bg-primary-dark"
              onClick={() => setOpen(false)}
            >
              Secondary
            </button>
          )}
        </div>
      </ModalBase>
    </>
  );
}
