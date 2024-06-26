import { tokenAtom } from "@/atoms/AuthAtom";
import { useAtomValue } from "jotai";
import { FaSignInAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { IoChatbox, IoPerson } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const { token } = useAuth();

  const token = useAtomValue(tokenAtom);

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
          {token ? (
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
