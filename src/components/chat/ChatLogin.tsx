import { Link } from "react-router-dom";

const ChatLogin = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <p className="text-3xl">Ready to join the conversation?</p>
      <p className="text-3xl mb-8">
        Log in now to access and participate in our vibrant chatrooms!
      </p>
      <Link to="/login">
        <button className="px-6 py-4 text-xl bg-sky-400 text-white rounded-md border-2 border-sky-400 font-semibold">
          Sign up for Free
        </button>
      </Link>
    </div>
  );
};

export default ChatLogin;
