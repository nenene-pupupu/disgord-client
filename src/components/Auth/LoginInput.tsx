import { useRef, useState } from "react";
import { IconSky } from "@/assets/svg";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";
import Modal from "@components/common/Modal";

const LoginInput = () => {
  const [open, setOpen] = useState(false);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const { setTokenState } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.current?.value === "" || username.current?.value === "")
      return;

    try {
      const data = await signin(
        username.current!.value,
        password.current!.value,
      );

      const { accessToken } = data;
      setTokenState(accessToken);
      alert("Welcome");
      navigate("/");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault(); // 기본 동작을 막기 위해 이벤트를 막음
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        title="Forgot Password?"
        actions={[
          {
            text: "Sign up",
            onClick: () => navigate("/register"),
            className: "bg-red-600 text-white hover:bg-red-500 ml-3",
          },
          {
            text: "Cancel",
            onClick: handleClose,
          },
        ]}
      >
        <p className="text-md text-gray-500 text-center">
          다시 회원가입 진행 부탁드리실게요🙏
        </p>
      </Modal>

      <div className="mx-auto w-full max-w-sm">
        <img src={IconSky} className="rounded-full mx-auto h-14 w-14" />
        <h2 className="mt-8 text-center text-2xl font-bold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 mx-auto w-full max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              User name
            </label>
            <div className="mt-2">
              <input
                ref={username}
                name="name"
                type="text"
                required
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
                <div className="text-sm">
                  <div
                    onClick={handleOpen}
                    className="font-semibold text-sky-500 hover:text-sky-400 cursor-pointer"
                  >
                    Forgot password?
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <input
                  ref={password}
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 text-sm leading-6"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/register"
            className="font-semibold leading-6 text-sky-500 hover:text-sky-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginInput;
