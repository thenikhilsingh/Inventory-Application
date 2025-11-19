import { Button } from "../ui/moving-border";
import { Plus, Calendar, Edit, Gamepad2, Globe } from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Meteors } from "../ui/meteors";
import { DataContext } from "../../App";
import Preloader from "../Preloader";

export default function Developer() {
  const { games, developers } = useContext(DataContext);

  const getGamesIncluded = (developerId) => {
    return games.filter((game) =>
      game.developers.some((dev) => dev._id === developerId)
    );
  };

  if (!developers.length) {
    return <Preloader />;
  }

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center text-white">
      <div className="flex justify-between pt-35 w-[80%] pb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Game Developers</h1>
          <p className="text-gray-400">Manage developer development studios</p>
        </div>
        <div>
          <NavLink to="/addDeveloper">
            <Button
              borderRadius="1.75rem"
              className=" bg-slate-900 text-white border-slate-800 flex gap-2 cursor-pointer"
            >
              <Plus /> Add Developer
            </Button>
          </NavLink>
        </div>
      </div>
      <div className="w-[80%] mt-10 flex justify-between flex-wrap">
        {developers.map((developer) => {
          return (
            <div className="relative w-[30%]">
              <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-linear-to-r from-blue-500 to-teal-500 blur-3xl" />
              <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-xl">
                <div className="p-5 w-full">
                  <div className="flex justify-between mb-2">
                    <h1 className=" relative z-50 mb-2 text-xl font-bold text-white">
                      {developer.name}
                    </h1>
                    <div className="flex gap-1 justify-center items-center px-4 rounded-xl bg-[#4f52e71a]">
                      <Gamepad2 className="size-4" />{" "}
                      {getGamesIncluded(developer._id).length}
                    </div>
                  </div>

                  <p className="relative z-50 mb-4 text-base font-normal text-slate-500 flex gap-2">
                    <Globe />{" "}
                    <a className="hover:underline" href={developer.website}>
                      visit website
                    </a>
                  </p>
                  <p className="relative z-50 mb-4 text-base font-normal text-slate-500 flex gap-2">
                    <Calendar /> Founded in {developer.foundedYear}
                  </p>
                  <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
                    <div>Games developed:</div>{" "}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {getGamesIncluded(developer._id).map((game) => {
                        return (
                          <div className="text-base font-normal text-slate-500 bg-[#4f52e71a] w-fit p-3 rounded-2xl">
                            {game.title}
                          </div>
                        );
                      })}
                    </div>
                  </p>

                  <div className="flex gap-2 justify-center items-center">
                    <NavLink
                      to={`/updateDeveloper/${developer._id}`}
                      className="rounded-lg border border-gray-600 bg-[black] w-full p-2 text-gray-300 "
                    >
                      <button className="flex justify-center gap-2 cursor-pointer">
                        <Edit /> Edit
                      </button>
                    </NavLink>
                  </div>
                </div>
                {/* Meaty part - Meteor effect */}
                <Meteors number={20} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
