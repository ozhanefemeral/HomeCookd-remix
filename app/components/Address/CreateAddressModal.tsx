import { useFetcher } from "@remix-run/react";
import React, { useEffect } from "react";
import { useUserProfile, capitalizeFirstLetter } from "~/utils";
import { ModalBase } from "../Modals/ModalBase";
import { useDialogContext } from "~/contexts/dialog";
import { AddressType } from "@prisma/client";

type Props = {
  setOpen: (open: boolean) => void;
};

function CreateAddressModal({ setOpen }: Props) {
  const fetcher = useFetcher();
  const userProfile = useUserProfile();

  const [addressType, setAddressType] = React.useState("home");
  const [addressTitle, setaddressTitle] = React.useState("");
  const [addressBody, setAddressBody] = React.useState("");
  // const { setOpen: setDialogEnabled } = useDialogContext();

  // useEffect(() => {
  //   if (fetcher?.data?.status === 201) {
  //     console.log("show success dialog");
  //     setDialogEnabled(true);
  //   }
  // }, [fetcher?.data?.status]);

  return (
    <ModalBase setOpen={setOpen} title="Create Address">
      <fetcher.Form action="/create-address" method="post">
        <input type="hidden" name="userProfileId" value={userProfile.id} />
        {/* <h1 className="mb-8 text-center text-xl font-bold text-primary">
          Create Address
        </h1> */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <label htmlFor="addressType">Address Type</label>
            <select
              name="addressType"
              id="addressType"
              value={addressType}
              onChange={(e) => setAddressType(e.target.value)}
              className="w-40 rounded border border-gray-300 px-2 py-1"
            >
              {Object.keys(AddressType).map((key) => (
                <option key={key} value={key}>
                  {capitalizeFirstLetter(key)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <label htmlFor="addressTitle">Address Name</label>
            <input
              type="text"
              name="addressTitle"
              id="addressTitle"
              value={addressTitle}
              onChange={(e) => setaddressTitle(e.target.value)}
              className="w-40 rounded border border-gray-300 px-2 py-1"
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="addressBody">Address Body</label>
            <textarea
              name="addressBody"
              id="addressBody"
              value={addressBody}
              onChange={(e) => setAddressBody(e.target.value)}
              className="w-40 rounded border border-gray-300 px-2 py-1"
              rows={6}
            />
          </div>
          <button
            type="submit"
            className="mt-4 self-center rounded bg-primary py-2 px-4 font-bold text-white"
          >
            Create Address
          </button>
        </div>
      </fetcher.Form>
    </ModalBase>
  );
}

export default CreateAddressModal;
