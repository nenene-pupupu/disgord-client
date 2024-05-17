import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { IoChatbox } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);

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
        <li onClick={() => setIsLogin((p) => !p)}>
          {isLogin ? (
            <Link to={"/profile"}>
              <IoPerson size={20} color="gray" />
            </Link>
          ) : (
            <Link to={"/login"}>
              <FaSignInAlt size={20} color="gray" />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
