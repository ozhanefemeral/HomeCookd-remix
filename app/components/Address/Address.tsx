import { Address } from "@prisma/client";
import React from "react";

type Props = {
  address: Address;
  isSelected?: boolean;
};

function Address({ address, isSelected }: Props) {
  return (
    <div
      className={`rounded-lg bg-[#FDBA7424] p-6 ring-primary-700 ${
        isSelected ? "ring-4" : "ring-1"
      }`}
    >
      <p className="text-center text-xl font-bold">{address.title}</p>
      <p className="text-center text-sm opacity-75">{address.type}</p>
      <hr className="my-2" />
      <p className="text-sm">{address.body}</p>
    </div>
  );
}

export default Address;
