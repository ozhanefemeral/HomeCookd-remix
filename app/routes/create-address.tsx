import { AddressType, Prisma } from "@prisma/client";
import { ActionFunction, json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { createAddress, createAddressInput } from "~/models/user.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const addressBody = formData.get("addressBody");
  const addressTitle = formData.get("addressTitle");
  const addressType = formData.get("addressType");
  const userProfileId = formData.get("userProfileId") as string;

  invariant(addressBody, "addressBody is required");
  invariant(addressTitle, "addressTitle is required");
  invariant(addressType, "addressType is required");

  const address: createAddressInput = {
    addressBody: addressBody as string,
    addressTitle: addressTitle as string,
    addressType: addressType as AddressType,
    user: userProfileId as string,
  };

  try {
    await createAddress(address);
    return json({ status: 201 });
  } catch (e) {
    console.log(e);
    
    return json(e, { status: 500 });
  }
};
