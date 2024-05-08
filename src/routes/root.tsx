import { Outlet } from "react-router-dom";
import Sidebar from "@components/Sidebar";

export default function Root() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="py-4 flex-1 h-screen">
        <Outlet />
      </div>
    </div>
  );
}
