import { Form, useLoaderData } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import { getCookByUsername } from "~/models/cook.server";
import { createMeal } from "~/models/meals.server";
import { requireCook } from "~/session.server";
import * as AWS from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { composeUploadHandlers, parseMultipartFormData, UploadHandler } from "@remix-run/server-runtime/dist/formData";
import { createMemoryUploadHandler } from "@remix-run/server-runtime/dist/upload/memoryUploadHandler";
import { s3UploadHandler, uploadStreamToS3 } from "~/utils/s3.server";

export async function loader({ request, params }: LoaderArgs) {
  const { username } = await requireCook(request)
  const cook = await getCookByUsername(username);
  if (!cook) return json({ cook: null }, { status: 404 });
  // const meals = await getCookMeals(cook!.id);
  // const profile = await getCookProfile(cook!.username);

  return json({ cook });
}

export async function action({ request, params }: LoaderArgs) {
  const uploadHandler: UploadHandler = composeUploadHandlers(
    s3UploadHandler,
    createMemoryUploadHandler()
  );
  const formData = await parseMultipartFormData(request, uploadHandler);
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const cookId = formData.get("cookId") as string;
  const image = formData.get("image");

  if (!image) {
    return json({
      errorMsg: "Something went wrong while uploading",
    });
  }

  return createMeal({
    title,
    price: parseInt(price),
    cook: {
      connect: {
        id: cookId
      }
    },
    image: image as string,
  });
}

export default function CreateMeal() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center text-primary">Create Meal</h1>
      <Form method="post" className="flex flex-col items-center justify-center space-y-4" encType="multipart/form-data">
        <input type="hidden" name="cookId" value={data.cook!.id} />
        <input type="text" name="title" placeholder="Meal Name" className="w-96 p-2 border border-gray-300 rounded-md" defaultValue="Meal Name" />
        <input type="text" name="description" placeholder="Meal Description" defaultValue="Meal Description" className="w-96 p-2 border border-gray-300 rounded-md" />
        <input type="text" name="price" placeholder="Meal Price" className="w-96 p-2 border border-gray-300 rounded-md" defaultValue="100"
        />
        <input type="file" name="image" placeholder="Meal Image" className="w-96 p-2 border border-gray-300 rounded-md" />
        <button type="submit" className="w-96 p-2 text-white bg-primary rounded-md">Create Meal</button>
      </Form>
    </div>
  );
}