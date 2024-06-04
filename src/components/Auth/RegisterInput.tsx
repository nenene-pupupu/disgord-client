import { IconSky } from "@/assets/svg";
import { signup } from "@/services/authService";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterInput = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const displayname = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      password.current?.value === "" ||
      username.current?.value === "" ||
      displayname.current?.value === ""
    )
      return;

    try {
      await signup(
        username.current!.value,
        password.current!.value,
        displayname.current!.value,
      );
      // 단순히 login 으로 이동
      alert("Sign up complete. Please log in!");
      navigate("/login");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div>
      <div className="mx-auto w-full max-w-sm">
        <img src={IconSky} className="rounded-full mx-auto h-14 w-14" />
        <h2 className="mt-8 text-center text-2xl font-bold text-gray-900">
          Create account
        </h2>
      </div>
      <div className="mt-8 mx-auto w-full max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleRegister}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              User name
              <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                ref={username}
                name="name"
                type="text"
                required
                placeholder="Enter your username"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 text-sm leading-6"
              />
            </div>
          </div>

          <div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
                <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  ref={password}
                  name="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 text-sm leading-6"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="displayname"
              className="block text-sm font-medium text-gray-900"
            >
              Display name
            </label>
            <div className="mt-2">
              <input
                ref={displayname}
                name="displayName"
                type="text"
                placeholder="Enter your display name (Optional)"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-sky-500 text-sm leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-sky-500 hover:text-sky-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterInput;
