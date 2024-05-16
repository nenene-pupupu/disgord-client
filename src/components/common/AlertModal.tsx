import { Dialog } from "@headlessui/react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const modals = {
  ForgotPassword: {
    title: "Forgot Password?",
    message: "다시 회원가입 진행 부탁드리실게요🙏",
    button: "Sign up",
    to: "/register",
  },
  DeleteAccount: {
    title: "Delete Account?",
    message: "정말로 계정을 삭제하시겠습니까?",
    button: "Delete",
    to: "/",
  },
};

type ModalType = "ForgotPassword" | "DeleteAccount";

const AlertModal = ({
  open,
  setOpen,
  type,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: ModalType;
}) => {
  const modalData = modals[type];

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
              <div className="flex">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 ">
                  <IoAlertCircleOutline className='h-8 w-8 text-red-600 aria-hidden-"true' />
                </div>
                <div className="ml-4">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    {modalData.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-md text-gray-500">{modalData.message}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 px-6 py-3 flex flex-row-reverse ">
              <Link
                to={modalData.to}
                onClick={() => setOpen(false)}
                className="justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 ml-3"
              >
                {modalData.button}
              </Link>
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

export default AlertModal;
