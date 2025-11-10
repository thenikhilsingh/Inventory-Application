import { Button } from "../ui/moving-border";
import { Plus } from "lucide-react";
import { NavLink } from "react-router-dom";


export default function Genre() {
  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center text-white">
      <div className="flex justify-between pt-35 w-[80%] pb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Game Genres</h1>
          <p className="text-gray-400">Manage game categories and types</p>
        </div>
        <div>
          <NavLink to="/addGenre">
            <Button
              borderRadius="1.75rem"
              className=" bg-slate-900 text-white border-slate-800 flex gap-2 cursor-pointer"
            >
              <Plus /> Add Genre
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
