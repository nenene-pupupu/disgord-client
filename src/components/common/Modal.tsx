import { Dialog } from "@headlessui/react";

interface ModalProp {
  open: boolean;
  onClose: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  actions: { text: string; onClick: () => void; className?: string }[];
}

const Modal = ({ open, onClose, title, children, actions }: ModalProp) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl my-8 w-full max-w-lg">
            <div className="bg-white p-6">
              <Dialog.Title className="text-lg text-center font-semibold leading-6 text-gray-900">
                {title}
              </Dialog.Title>
              <div className="mt-6 mx-auto w-full max-w-sm">{children}</div>
            </div>
            <div className="bg-gray-100 px-6 py-3 flex flex-row-reverse ">
              {actions.map((action) => (
                <button
                  onClick={action.onClick}
                  className={`justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${action.className || "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"} `}
                >
                  {action.text}
                </button>
              ))}
              {/* <button
                onClick={actions[0].onClick}
                className="justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 ml-3"
              >
                {actions[0].text}
              </button>
              <button
                onClick={actions[1].onClick}
                className="justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                {actions[1].text}
              </button> */}
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
