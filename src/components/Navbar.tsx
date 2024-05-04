import { Link } from "react-router-dom";

import { HiHome } from "react-icons/hi";
import { IoChatbox } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
const Navbar = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-10 jusitfy-center items-center">
        <li>
          <Link to={"/"}>
            <HiHome size={24} color="gray" />
          </Link>
        </li>
        <li>
          <Link to={"/chat"}>
            <IoChatbox size={20} color="gray" />
          </Link>
        </li>
        <li>
          <Link to={"/profile"}>
            <IoPerson size={20} color="gray" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
