import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-12 bg-purple-600">
      <ul className="flex flex-col gap-8 jusitfy-center items-center">
        <li className="h-8">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="h-8">
          <Link to={"/login"}>Login</Link>
        </li>
        <li className="h-8">
          <Link to={"/profile"}>Profile</Link>
        </li>
        <li className="h-8">
          <Link to={"/chat"}>Chat</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
