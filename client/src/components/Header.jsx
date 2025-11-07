import { Library, Code, User, Gamepad2 } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex w-screen justify-around fixed top-0 border-b border-gray-400 bg-black text-white p-8 z-50">
      <NavLink to="/" className="group flex justify-center gap-2 items-center">
        <Gamepad2 className="size-8 transition-transform duration-300 group-hover:scale-125" />
        <div className="text-xl font-bold ">GameVault</div>
      </NavLink>

      <div className="flex justify-around w-[25%]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex justify-center items-center text-base px-3 py-2 rounded-md transition-all duration-200 ${
              isActive
                ? "bg-white text-black scale-105"
                : "text-white hover:text-white"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/games"
          className={({ isActive }) =>
            `flex justify-center items-center gap-2 text-base px-3 py-2 rounded-md transition-all duration-200 ${
              isActive
                ? "bg-white text-black scale-105"
                : "text-white hover:text-white"
            }`
          }
        >
          <Library className="size-5" />
          Games
        </NavLink>

        <NavLink
          to="/genres"
          className={({ isActive }) =>
            `flex justify-center items-center gap-2 text-base px-3 py-2 rounded-md transition-all duration-200 ${
              isActive
                ? "bg-white text-black scale-105"
                : "text-white hover:text-white"
            }`
          }
        >
          <Code className="size-5" />
          Genres
        </NavLink>

        <NavLink
          to="/developers"
          className={({ isActive }) =>
            `flex justify-center items-center gap-2 text-base px-3 py-2 rounded-md transition-all duration-200 ${
              isActive
                ? "bg-white text-black scale-105"
                : "text-white hover:text-white"
            }`
          }
        >
          <User className="size-5" />
          Developers
        </NavLink>
      </div>
    </div>
  );
}
