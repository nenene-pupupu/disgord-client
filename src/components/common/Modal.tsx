import React from "react";

import { Dialog } from "@headlessui/react";
import { useModal } from "@/hooks/useModal";

const Modal: React.FC = () => {
  const { isOpen, content, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <Dialog
      className="relative z-10"
      // open={open}
      onClose={() => closeModal()}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl my-8 w-full max-w-lg">
            {content}
            <p onClick={closeModal}>Close</p>
            {/* <div className="bg-white p-6">
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                  isAdd ? setChatroom() : delChatroom();
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
            </div> */}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
    // <div className="modal">
    //   <div className="modal-content">
    //     {content}
    //     <button onClick={closeModal}>Close</button>
    //   </div>
    // </div>
  );
};

export default Modal;