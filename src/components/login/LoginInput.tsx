import { useState } from "react";
import Logo from "@/assets/images/disgord.png";
import ForgotPassword from "./ForgotPassword";
import { Link } from "react-router-dom";

const LoginInput = () => {
  const [dialog, setDialog] = useState(false);

  return (
    <div>
      <ForgotPassword open={dialog} setOpen={setDialog} />

      <div className="mx-auto w-full max-w-sm">
        <img src={Logo} className="rounded-full mx-auto h-14 w-14" />
        <h2 className="mt-8 text-center text-2xl font-bold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 mx-auto w-full max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              ID
            </label>
            <div className="mt-2">
              <input
                // id="id"
                name="id"
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
                  <button
                    onClick={() => setDialog(true)}
                    className="font-semibold text-sky-500 hover:text-sky-400"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <input
                  // id="password"
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
