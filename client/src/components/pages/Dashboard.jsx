import { BackgroundGradient } from "../ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";
import { Library, Code, Users, User, Plus } from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataContext } from "../../App";

export default function Home() {
  const { games, genres, developers } = useContext(DataContext);
  return (
    <div className="bg-black h-screen mt-15 flex flex-col items-center">
      <div className='bg-[url("/hero-banner.jpg")] w-full h-[50%] text-white bg-cover bg-center flex flex-col justify-center items-center '>
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/80 to-black pointer-events-none"></div>
        <div className="z-10 flex flex-col items-center gap-5">
          <h1 className="text-8xl font-bold"> GameVault</h1>
          <p className="text-4xl text-gray-300">
            Your Ultimate Game Management Dashboard
          </p>
        </div>
      </div>
      <div className="w-[80%] relative flex flex-col gap-20 -top-20">
        <div className="grid grid-cols-3 gap-30">
          <BackgroundGradient className="flex justify-between items-start rounded-[22px] p-6 bg-zinc-900">
            <div>
              <p className="text-base sm:text-base mb-2 text-neutral-200">
                Total Games
              </p>
              <div className="text-3xl text-white font-bold">
                {games.length}
              </div>
            </div>
            <div className="bg-[#80808048] flex justify-center items-center size-10 rounded-lg">
              <Library className="text-white" />
            </div>
          </BackgroundGradient>
          <BackgroundGradient className="flex justify-between items-start rounded-[22px] p-6 bg-zinc-900">
            <div>
              <p className="text-base sm:text-base text-black  mb-2 dark:text-neutral-200">
                Total Genres
              </p>
              <div className="text-3xl text-white font-bold">
                {genres.length}
              </div>
            </div>
            <div className="bg-[#80808048] flex justify-center items-center size-10 rounded-lg">
              <Code className="text-white" />
            </div>
          </BackgroundGradient>
          <BackgroundGradient className="flex justify-between items-start rounded-[22px] p-6 bg-zinc-900">
            <div>
              <p className="text-base sm:text-base  mb-2 text-neutral-200">
                Total Developers
              </p>
              <div className="text-3xl text-white font-bold">
                {developers.length}
              </div>
            </div>
            <div className="bg-[#80808048] flex justify-center items-center size-10 rounded-lg">
              <User className="text-white" />
            </div>
          </BackgroundGradient>
        </div>

        <div className="grid grid-cols-3 gap-30">
          <BackgroundGradient className="flex flex-col gap-5 items-center rounded-[22px] p-6 bg-zinc-900">
            <NavLink to="/addGame">
              <button className="bg-[#80808048] flex justify-center items-center size-15 rounded-full cursor-pointer">
                <Plus className="text-white" />
              </button>
            </NavLink>
            <div>
              <p className="text-2xl font-bold  text-center text-black   dark:text-neutral-200">
                Add New Game
              </p>
              <p className="text-lg text-gray-400">
                Add a new game to your collection
              </p>
            </div>
          </BackgroundGradient>
          <BackgroundGradient className="flex flex-col gap-5 items-center rounded-[22px] p-6 bg-zinc-900">
            <NavLink to="/addGenre">
              <button className="bg-[#80808048] flex justify-center items-center size-15 rounded-full cursor-pointer">
                <Plus className="text-white" />
              </button>
            </NavLink>
            <div>
              <p className="text-2xl font-bold  text-center text-black   dark:text-neutral-200">
                Add New Genre
              </p>
              <p className="text-lg text-gray-400">Create a new game genre</p>
            </div>
          </BackgroundGradient>
          <BackgroundGradient className="flex flex-col gap-5 items-center rounded-[22px] p-6 bg-zinc-900">
            <NavLink to="/addDeveloper">
              <button className="bg-[#80808048] flex justify-center items-center size-15 rounded-full cursor-pointer">
                <Plus className="text-white" />
              </button>
            </NavLink>
            <div>
              <p className="text-2xl font-bold  text-center text-black   dark:text-neutral-200">
                Add New Developer
              </p>
              <p className="text-lg text-gray-400 text-center">
                Register a game developer
              </p>
            </div>
          </BackgroundGradient>
        </div>
      </div>
    </div>
  );
}
