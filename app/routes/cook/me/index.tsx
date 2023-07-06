import { useUser } from "~/utils";

function CookIndex() {
  const user = useUser();

  return (
    <div>
      <p>Hello, {user.email}</p>
    </div>
  );
}

export default CookIndex;
