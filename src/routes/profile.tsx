import { IconSky } from "@/assets/svg";
import AlertModal from "@/components/common/AlertModal";
import { useState } from "react";

export default function Profile() {
  const [dialog, setDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [displayName, setDisplayName] = useState("쏠라예용");
  const [password, setPassword] = useState("password");
  return (
    <>
      <AlertModal open={dialog} setOpen={setDialog} type="DeleteAccount" />

      <div className="h-full flex justify-center items-center">
        <div className="w-1/3 h-3/4 min-w-[400px] p-12 flex flex-col items-center justify-center gap-8 shadow-xl">
          <p className="text-2xl font-bold text-sky-600">My Profile</p>
          <div className="flex flex-col items-center gap-2">
            <img src={IconSky} className="w-24 h-24 rounded-full" />
            <p className="text-gray-900 text-xl font-medium">성준모</p>
          </div>
          <div className="w-full flex flex-col gap-4">
            {isEdit && (
              <div className="w-4/5">
                <p className="text-gray-500 font-medium">password</p>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-gray-900 text-xl font-medium"
                />
              </div>
            )}
            <div className="w-4/5">
              <p className="text-gray-500 font-medium">display name</p>
              {isEdit ? (
                <input
                  name="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="text-gray-900 text-xl font-medium"
                />
              ) : (
                <p className="text-gray-900 text-xl font-medium">
                  {displayName}
                </p>
              )}
            </div>
            <div className="flex flex-col mt-4">
              {isEdit ? (
                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    className="flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => setIsEdit(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 ml-3"
                    onClick={() => setIsEdit(false)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  Edit profile
                </button>
              )}
              {!isEdit && (
                <button
                  onClick={() => setDialog(true)}
                  className="mt-6 text-center text-sm text-gray-500 underline"
                >
                  Delete Account
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
