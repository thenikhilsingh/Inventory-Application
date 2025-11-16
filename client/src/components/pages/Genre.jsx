import axios from "axios";
import { Button } from "../ui/moving-border";
import { Plus, Calendar, Edit, Trash2, Gamepad2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Meteors } from "../ui/meteors";
import { DataContext } from "../../App";

export default function Genre() {
  const { genres, setGenres } = useContext(DataContext);

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
      <div className="w-[80%] mt-10 flex justify-between flex-wrap">
        {genres.map((genre) => {
          return (
            <div className="relative w-[30%]">
              <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-linear-to-r from-blue-500 to-teal-500 blur-3xl" />
              <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-xl">
                <div className="p-5">
                  <div className="flex justify-between mb-2">
                    <h1 className=" relative z-50 mb-2 text-xl font-bold text-white">
                      {genre.name}
                    </h1>
                    <div className="flex gap-1 justify-center items-center px-4 rounded-xl bg-[#4f52e71a]">
                      <Gamepad2 className="size-4" /> 1
                    </div>
                  </div>

                  <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
                    {genre.description}
                  </p>

                  <div className="flex gap-2 justify-center items-center">
                    <button className="rounded-lg border border-gray-600 bg-[black] w-[90%] p-2 text-gray-300 flex justify-center gap-2 cursor-pointer">
                      <Edit /> Edit
                    </button>
                    <button className="rounded-lg  w-[10%] py-2 text-gray-300 bg-red-500 flex justify-center cursor-pointer">
                      <Trash2 />
                    </button>
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
