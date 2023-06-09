import { unstable_createFileUploadHandler } from "@remix-run/node";
import type {
  ActionFunction} from "@remix-run/server-runtime";
import {
  json,
  unstable_composeUploadHandlers,
} from "@remix-run/server-runtime";
import type {
  UploadHandler} from "@remix-run/server-runtime/dist/formData";
import {
  composeUploadHandlers,
  parseMultipartFormData,
} from "@remix-run/server-runtime/dist/formData";
import { createMemoryUploadHandler } from "@remix-run/server-runtime/dist/upload/memoryUploadHandler";
import invariant from "tiny-invariant";
import { createMeal } from "~/models/meals.server";
import { s3UploadHandler } from "~/utils/s3.server";

export const action: ActionFunction = async ({ request }) => {
  const uploadHandler: UploadHandler = unstable_composeUploadHandlers(
    s3UploadHandler,
    createMemoryUploadHandler()
  );
  const formData = await parseMultipartFormData(request, uploadHandler);

  const title = formData.get("title");
  const description = formData.get("description");
  const price = formData.get("price");
  const image = formData.get("image");
  const userId = formData.get("userId");

  if (!image) {
    return json({
      errorMsg: "Something went wrong while uploading",
    });
  }

  invariant(title);
  invariant(description);
  invariant(price);
  invariant(userId);

  try {
    await createMeal({
      title: title as string,
      description: description as string,
      price: parseInt(price as string, 10),
      image: image as string,
      cook: {
        connect: {
          id: userId as string,
        },
      },
    });
    return json({ status: 201 });
  } catch (e) {
    console.log(e);
    return json(e, { status: 500 });
  }
};
