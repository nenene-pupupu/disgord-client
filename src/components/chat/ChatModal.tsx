import { useModal } from "@/hooks/useModal";
import { Dialog } from "@headlessui/react";

const ChatModal = () => {
  const { closeModal } = useModal();
  const isAdd = true;
  return (
    <>
      <div className="bg-white p-6">
        <Dialog.Title className="text-lg text-center font-semibold leading-6 text-gray-900">
          {isAdd ? "Create New Channel" : "Modify Channel"}
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
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
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
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
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
          className={`justify-center rounded-md ${isAdd ? "bg-sky-500" : "bg-red-600"} px-3 py-2 text-sm font-semibold text-white shadow-sm ${isAdd ? "hover:bg-sky-400" : "hover:bg-red-500"} ml-3`}
          onClick={() => {
            closeModal();
            // isAdd ? setChatroom() : delChatroom();
          }}
        >
          {isAdd ? "Create" : "Delete"}
        </button>
        <button
          type="button"
          className="justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={closeModal}
        >
          {isAdd ? "Cancel" : "Modify"}
        </button>
      </div>
    </>
  );
};

export default ChatModal;
