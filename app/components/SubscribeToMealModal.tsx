import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { json, LoaderArgs } from "@remix-run/node";
import { useSearchParams } from '@remix-run/react';
import { useEffect } from 'react';

export default function SubscribeToMealModal({ subscribe }: { subscribe: string | null }) {
  let [isOpen, setIsOpen] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams();

  function closeModal() {
    setSearchParams({});
    setIsOpen(false);
  }

  useEffect(() => {
    if (subscribe) {
      openModal();
    }
  }, [subscribe]);

  function openModal() {
    setIsOpen(true)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <div className="fixed inset-0 bg-black bg-opacity-60" />

        {/* <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
        </Transition.Child> */}

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Subscribe to meal
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Fill out the form below to subscribe to this meal.
                </p>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                  Yummy!
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
