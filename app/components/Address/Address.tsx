import { Icon } from "@iconify/react";
import type { Address} from "@prisma/client";
import { AddressType } from "@prisma/client";

type Props = {
  address: Address;
  isSelected?: boolean;
};

function AddressCard({ address, isSelected }: Props) {
  const { type } = address;

  return (
    <div
      className={`rounded-lg bg-[#FDBA7424] p-6 ring-primary-700 ${isSelected ? "ring-4" : "ring-1"
        }`}
    >
      <p className="text-center text-xl font-bold">{address.title}</p>
      {(() => {
        switch (type) {
          case AddressType.HOME:
            return <Icon icon="ic:round-home" className="mx-auto opacity-60" width={32} />;
          case AddressType.WORK:
            return <Icon icon="ic:round-work" className="mx-auto opacity-60" width={32} />;
          default:
            return <Icon icon="ic:round-location-on" className="mx-auto opacity-60" width={32} />;
        }
      })()}
      <hr className="my-2" />
      <p className="text-sm">{address.body}</p>
    </div>
  );
}

export default AddressCard;
