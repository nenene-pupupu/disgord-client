import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function Root() {
  return (
    <div className="flex flex-col ">
      <Header />
      <div className="flex flex-row">
        <Navbar />
        <div className="mx-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
