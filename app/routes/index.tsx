import { Link } from "@remix-run/react";

import { useOptionalCook, useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  const cook = useOptionalCook();

  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-2xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-light" />
            </div>
            <div className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-primary drop-shadow-md">
                  HomeCookd
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl sm:max-w-3xl">
                ‟Get a taste of home, no matter where you are”
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user && (
                  <Link
                    to="/user/subscriptions"
                    className="flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-light shadow-sm hover:bg-blue-50 hover:text-primary sm:px-8"
                  >
                    View Subscriptions for {user.email}
                  </Link>
                )}
                {cook && (
                  <Link
                    to="/cook/subscriptions"
                    className="flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-light shadow-sm hover:bg-blue-50 hover:text-primary sm:px-8"
                  >
                    View Subscriptions for {cook.email}
                  </Link>
                )}
                {!user && !cook && <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-3 sm:gap-5 sm:space-y-0">
                  <Link
                    to="/join"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center justify-center rounded-md bg-primary px-4 py-3 font-medium text-white hover:bg-primary-dark"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/cook-login"
                    className="flex items-center justify-center rounded-md bg-red-500 px-4 py-3 font-medium text-white hover:bg-red-600"
                  >
                    Cook Log In
                  </Link>
                </div>}
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
