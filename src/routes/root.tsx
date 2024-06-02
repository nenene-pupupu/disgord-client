import Sidebar from "@components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    // <AuthProvider>
    <div className="flex">
      <Sidebar />
      <div className="py-4 flex-1 h-screen">
        <Outlet />
      </div>
    </div>
    // </AuthProvider>
  );
}
