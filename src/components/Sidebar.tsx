import { IconSky } from "@/assets/svg";
import Navbar from "./Navbar";
import { IoNotifications } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-14 m-4">
      <div className="mt-4 flex flex-col items-center justify-center bg-gray-100 rounded-full pb-4">
        <div className="w-14 h-14">
          <img src={IconSky} className="rounded-full" />
        </div>
        <div className="w-12 h-12 flex items-center justify-center">
          <IoNotifications size={20} color={"gray"} />
        </div>
        <div className="w-12 h-12 rounded-full flex items-center justify-center">
          <IoSettings size={20} color={"gray"} />
        </div>
      </div>
      <div className="flex-1 mt-20">
        <Navbar />
      </div>
    </div>
  );
};

export default Sidebar;
