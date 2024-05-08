import { Dialog } from "@headlessui/react";

const AddRoom = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog
      className="relative z-10"
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl my-8 w-full max-w-lg">
            <div className="bg-white p-6">
              <Dialog.Title className="text-lg text-center font-semibold leading-6 text-gray-900">
                Create New Channel
              </Dialog.Title>
              <div className="mt-8 mx-auto w-full max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                  <div>
                    <label
                      //   htmlFor="email"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Channel name
                    </label>
                    <div className="mt-2">
                      <input
                        // id="id"
                        name="id"
                        type="text"
                        required
                        placeholder="Enter channel name"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 text-sm leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div>
                      <div className="flex item-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Password
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          // id="password"
                          name="password"
                          type="password"
                          placeholder="Enter password (optional)"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 text-sm leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="bg-gray-100 px-6 py-3 flex flex-row-reverse ">
              <button
                type="submit"
                className="justify-center rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 ml-3"
                onClick={() => setOpen(false)}
              >
                Create
              </button>
              <button
                type="button"
                className="justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddRoom;
