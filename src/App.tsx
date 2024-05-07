import Logo from "@/assets/images/disgord.png";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <img src={Logo} className="w-24 h-24" />

      <p className="font-bold text-7xl text-sky-400">DISGORD</p>
      <p className="font-medium text-2xl w-[65%] text-center">
        Welcome to our innovative platform, where you can experience seamless
        voice calls and video chats using WebSockets. Connect with ease,
        communicate effortlessly, and explore a new dimension of online
        interaction. Join us now!
      </p>
      <div className="mt-4">
        <Link to="/chat" className="mr-4">
          <button className="px-6 py-4 text-xl bg-white text-sky-400 rounded-md border-2 border-sky-400 font-semibold">
            Explore chatrooms
          </button>
        </Link>
        <Link to="/login">
          <button className="px-6 py-4 text-xl bg-sky-400 text-white rounded-md border-2 border-sky-400 font-semibold">
            Sign up for Free
          </button>
        </Link>
      </div>
    </div>
  );
}

export default App;
