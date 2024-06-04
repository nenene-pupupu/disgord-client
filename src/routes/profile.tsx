import { IconYellow } from "@/assets/svg";
import { tokenAtom } from "@/atoms/AuthAtom";
import { useAuth } from "@/hooks/useAuth";
import { delUsersMe, getUsersMe, modUsersMe } from "@/services/profileService";
import Modal from "@components/common/Modal";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [userName, setUserName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");

  const token = useAtomValue(tokenAtom);

  const { setTokenState } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    setTokenState(null);
    navigate("/");
  };

  useEffect(() => {
    const fetchUsersMe = async () => {
      if (!token) return;
      try {
        const data = await getUsersMe(token);
        setDisplayName(data.displayName);
        setUserName(data.username);
      } catch (error) {
        alert((error as Error).message);
      }
    };
    fetchUsersMe();
  }, [token]);

  const handleModify = async () => {
    if (!token) return;
    try {
      modUsersMe(token, displayName, password);
      alert("modify success");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleDelete = async () => {
    if (!token) return;
    if (password == "") {
      alert("enter password");
      return;
    }
    try {
      await delUsersMe(token, password);
      alert("delete success");
      setTokenState(null);
      navigate("/");
    } catch (error) {
      alert((error as Error).message);
      setPassword("");
      navigate("/profile");
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        title="Delete Account"
        actions={[
          {
            text: "Delete",
            onClick: handleDelete,
            className: "bg-red-600 text-white hover:bg-red-500 ml-3",
          },
          {
            text: "Cancel",
            onClick: handleClose,
          },
        ]}
      >
        <div>
          <div className="flex item-center justify-between">
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 text-sm leading-6"
            />
          </div>
        </div>
      </Modal>

      <div className="h-full flex justify-center items-center">
        <div className="w-1/3 h-3/4 min-w-[400px] p-12 flex flex-col items-center justify-center gap-8 shadow-xl">
          <p className="text-2xl font-bold text-sky-600">My Profile</p>
          <div className="flex flex-col items-center gap-2">
            <img src={IconYellow} className="w-24 h-24 rounded-full" />
            <p className="text-gray-900 text-xl font-medium">{userName}</p>
          </div>
          <div className="w-full flex flex-col gap-4">
            {isEdit && (
              <div>
                <p className="text-gray-500 font-medium">password</p>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-gray-900 text-xl font-medium py-1"
                />
              </div>
            )}
            <div>
              <p className="text-gray-500 font-medium">display name</p>
              {isEdit ? (
                <input
                  name="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full text-gray-900 text-xl font-medium py-1"
                />
              ) : (
                <p className="text-gray-900 text-xl font-medium py-1">
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
                    onClick={() => {
                      setIsEdit(false);
                      setPassword("");
                      handleModify();
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 border-sky-400 border-2 text-sky-400 mb-2"
                >
                  Edit profile
                </button>
              )}
              {!isEdit && (
                <>
                  <button
                    onClick={handleLogout}
                    className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                  >
                    Logout
                  </button>
                  <button
                    onClick={handleOpen}
                    className="mt-6 text-center text-sm text-gray-500 underline"
                  >
                    Delete Account
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
