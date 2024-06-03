import Sidebar from "@components/Sidebar";
import { Provider } from "jotai";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <Provider>
      <div className="flex">
        <Sidebar />
        <div className="py-4 flex-1 h-screen">
          <Outlet />
        </div>
      </div>
    </Provider>
  );
}
