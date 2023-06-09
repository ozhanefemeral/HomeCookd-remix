import type { Meal } from "@prisma/client";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import type { ActionArgs} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { useEffect, useState } from "react";
import { getAllMeals } from "~/models/meals.server";
import { createSubscription } from "~/models/subscription.server";
import { getUser, requireUserId } from "~/session.server";

type SubMealTemplate = {
  meal: Meal;
  deliveryDay: string;
  deliveryHour: string;
  quantity: number;
}

// an array with every 30 minutes of the day
// options in select element
const deliveryHours = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});


export async function loader({ request }: ActionArgs) {
  const meals = await getAllMeals();
  const userId = await requireUserId(request);

  return json({ meals, userId });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const userId = await requireUserId(request);
  // format data
  // meals are array of type SubMealTemplate

  const meals = formData.getAll("meal").map((meal, index) => {
    const deliveryDay = formData.getAll("deliveryDay")[index];
    const deliveryHour = formData.getAll("deliveryHour")[index];
    const quantity = parseInt(formData.getAll("quantity")[index] as string);
    const _meal = JSON.parse(meal as string) as Meal;
    const price = _meal.price * quantity;

    return {
      meal: _meal,
      deliveryDay,
      deliveryHour,
      quantity,
      price
    };
  });

  const price = meals.reduce((total: number, meal) => {
    return total + meal.meal.price * meal.quantity;
  }, 0);

  const data = {
    title: formData.get("title") as string,
    user: userId,
    start: new Date(formData.get("startDate") as string),
    end: new Date(formData.get("endDate") as string),
    meals,
    price
  }

  await createSubscription(data);
  return json({ success: true }, { status: 201 });
}

export default function NewSubscription() {
  const data = useLoaderData();

  const [mealList, setMealList] = useState<SubMealTemplate[]>([]);

  const totalPrice = mealList.reduce((total, meal) => {
    return total + meal.meal.price * meal.quantity;
  }, 0);

  function handleMealChange(e: React.ChangeEvent<HTMLSelectElement>, mealListIndex: number) {
    const mealString = e.target.value
    // get id from stringified meal
    const mealId = JSON.parse(mealString).id;
    const meal = data.meals.find((meal: Meal) => meal.id === mealId);
    if (meal) {
      const newMealList = [...mealList];
      newMealList[mealListIndex] = { ...newMealList[mealListIndex], meal };
      setMealList(newMealList);
    }
  }

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>, mealListIndex: number) {
    const quantity = parseInt(e.target.value);
    const newMealList = [...mealList];
    newMealList[mealListIndex] = { ...newMealList[mealListIndex], quantity };
    setMealList(newMealList);
  }

  function handleDeliveryDayChange(e: React.ChangeEvent<HTMLSelectElement>, mealListIndex: number) {
    const deliveryDay = e.target.value;
    const newMealList = [...mealList];
    newMealList[mealListIndex] = { ...newMealList[mealListIndex], deliveryDay };
    setMealList(newMealList);
  }

  function handleDeliveryHourChange(e: React.ChangeEvent<HTMLSelectElement>, mealListIndex: number) {
    const deliveryHour = e.target.value;
    const newMealList = [...mealList];
    newMealList[mealListIndex] = { ...newMealList[mealListIndex], deliveryHour };
    setMealList(newMealList);
  }

  const canCreate = mealList.length > 0 && mealList.every((meal) => meal.meal && meal.quantity > 0 && meal.deliveryDay && meal.deliveryHour);

  return (
    <form method="post">
      {/* h1 in tailwind */}
      <h1 className="text-2xl font-bold">New Subscription</h1>
      <div className="my-4">
        <label htmlFor="title" className="font-semibold">Name</label>
        <br />
        <input type="text" name="title" id="title" />
        <br />
        <label htmlFor="startDate" className="font-semibold">Start Date</label>
        <br />
        <input type="date" name="startDate" id="startDate" defaultValue={new Date().toISOString().slice(0, 10)} />
        <br />

        <label htmlFor="endDate" className="font-semibold">End Date</label>
        <br />
        <input type="date" name="endDate" id="endDate" defaultValue={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 10)} />
      </div>
      {mealList.map((meal, mealListIndex) => {
        const mealId = meal.meal.id;
        return <div key={mealListIndex}>
          <hr />
          <div className="my-4">
            <label htmlFor="meal" className="font-semibold">Meal</label>
            <br />
            {/* select meal */}
            <select
              id="meal"
              name="meal"
              onChange={(e) => {
                handleMealChange(e, mealListIndex);
              }}
            >
              {data.meals.map((meal: Meal) => (
                <option key={meal.id} value={JSON.stringify(meal)}>
                  {meal.title} - ${meal.price}
                </option>
              ))}
            </select>
            {/* delivery day, values in capital */}
            <div className="mt-4">
              <label htmlFor="deliveryDay" className="font-semibold">Delivery Day</label>
              <br />
              <select
                id="deliveryDay"
                defaultValue={meal.deliveryDay}
                name="deliveryDay"
                onChange={(e) => {
                  handleDeliveryDayChange(e, mealListIndex);
                }}
              >
                <option value="MONDAY">Monday</option>
                <option value="TUESDAY">Tuesday</option>
                <option value="WEDNESDAY">Wednesday</option>
                <option value="THURSDAY">Thursday</option>
                <option value="FRIDAY">Friday</option>
                <option value="SATURDAY">Saturday</option>
                <option value="SUNDAY">Sunday</option>
              </select>
            </div>
            {/* delivery hour */}
            <div className="mt-4">
              <label htmlFor="deliveryHour" className="font-semibold">Delivery Hour</label>
              <br />
              <select
                id="deliveryHour"
                name="deliveryHour"
                defaultValue={meal.deliveryHour}
                onChange={(e) => {
                  handleDeliveryHourChange(e, mealListIndex);
                }}
              >
                {deliveryHours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </div>
            {/* quantity */}
            <div className="my-4">
              <label htmlFor="quantity" className="font-semibold">Quantity</label>
              <br></br>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min={1}
                value={meal.quantity}
                onChange={(e) => {
                  handleQuantityChange(e, mealListIndex);
                }}
              />
            </div>
          </div>
        </div>
      })}

      <hr />

      {/* a button to add meal to mealList */}
      <div className="mt-4">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            const meal = data.meals[0];
            const deliveryDay = "MONDAY";
            const deliveryHour = "12:00";
            setMealList([...mealList, { meal, deliveryDay, deliveryHour, quantity: 1 }])
          }}
        >
          Add Meal
        </button>
      </div>

      <p>
        Total Price: <span className="font-semibold">${totalPrice}</span>
      </p>


      <div className="mt-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:hover:cursor-not-allowed" disabled={!canCreate}>
          Create Subscription
        </button>
      </div>
    </form>
  );
}
