import { Link } from "@remix-run/react";

export default function NoteIndexPage() {
  return (
    <p>
      No subscription selected. Select a subscription on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new one.
      </Link>
    </p>
  );
}
