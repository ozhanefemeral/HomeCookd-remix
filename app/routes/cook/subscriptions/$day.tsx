import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";
import { deleteSubscription } from "~/models/subscription.server";
import { getSubscriptionMealById, deleteSubscriptionMeal, getSubscriptionMealsByDay, DeliveryDay, SubscriptionMealWithMeal } from "~/models/subscriptionMeal.server";
import { requireCookId } from "~/session.server";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table'
import { SubscriptionMeal } from "@prisma/client";

export async function loader({ request, params }: LoaderArgs) {
  const cookId = await requireCookId(request);
  invariant(params.day, "day not found");

  const day = params.day as DeliveryDay;

  const subMeals = await getSubscriptionMealsByDay(day);
  if (!subMeals) {
    throw new Response("Not Found", { status: 404 });
  }

  // add 0 to the hour so it sorts correctly if it's a single digit
  subMeals.forEach((subMeal) => {
    subMeal.deliveryHour = subMeal.deliveryHour.padStart(2, "0");
  });

  // sort by delivery hour
  subMeals.sort((a, b) => {
    if (a.deliveryHour < b.deliveryHour) {
      return -1;
    }
    if (a.deliveryHour > b.deliveryHour) {
      return 1;
    }
    return 0;
  });

  return json({ subMeals });
}

const columnHelper = createColumnHelper<SubscriptionMealWithMeal>()
const columns = [
  columnHelper.accessor('meal.title', {
    cell: info => info.getValue(),
    header: () => 'Meal',
  }),
  columnHelper.accessor('deliveryHour', {
    cell: info => info.getValue(),
    header: () => 'Delivery Hour',
  }),
  columnHelper.accessor('quantity', {
    cell: info => info.getValue(),
    header: () => 'Quantity',
  }),
  columnHelper.accessor('meal.price', {
    // cell with $ sign
    cell: info => `$${info.getValue()}`,
    header: () => 'Price',
  }),
]

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const table = useReactTable({
    // WTF DID I DO HERE
    data: data.subMeals as unknown as SubscriptionMealWithMeal[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const count = data.subMeals.length;

  function handleRowClick(row: Row<SubscriptionMealWithMeal>) {
    const subMeal = row.original;
    navigate(`/cook/subscriptions/meals/${subMeal.id}`);
  }

  return (
    <div>
      {/* tailwind h3 for count with sentence */}
      {count > 0 ?
        <h3 className="text-2xl font-bold text-center">You have {count} meals for this day 😍</h3> :
        <h3 className="text-2xl font-bold text-center">You have no meals for this day 🙄</h3>}
      <div className="py-4">
        <hr />
      </div>
      {count > 0 && <div>
        {/* some subtitle with low opacity and italic to let users they can click row to view */}
        <h3 className="text-lg text-gray-500 italic pb-2">Click on a row to view meal details</h3>
        <table className="border-solid border-2">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                    className="text-primary"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} onClick={() => handleRowClick(row)} className="cursor-pointer hover:text-primary hover:font-bold">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </div >
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
