import axios from "axios";
import { Button } from "../ui/moving-border";
import { Plus, Calendar, Edit, Trash2 } from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Meteors } from "../ui/meteors";
import { DataContext } from "../../App";

export default function Game() {
  const { games, setGames } = useContext(DataContext);

  function handleEditBtn(id) {
    axios
      .put(`http://localhost:3001/games/${id}`)
      .then(() => {
        setEditedData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDeleteBtn(id) {
    axios
      .delete(`http://localhost:3001/games/${id}`)
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center text-white">
      <div className="flex justify-between pt-35 w-[80%] pb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Games Library</h1>
          <p className="text-gray-400">Manage your game collection</p>
        </div>
        <div>
          <NavLink to="/addGame">
            <Button
              borderRadius="1.75rem"
              className=" bg-slate-900 text-white border-slate-800 flex gap-2 cursor-pointer"
            >
              <Plus /> Add Game
            </Button>
          </NavLink>
        </div>
      </div>
      <div className="w-[80%] mt-10">
        {games.map((game) => {
          return (
            <div key={game._id} className="relative w-[30%]">
              <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-linear-to-r from-blue-500 to-teal-500 blur-3xl" />
              <div className="group relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-xl">
                <img
                  className="w-full h-50 z-50 group-hover:scale-110 transition-all duration-300"
                  src={game.coverImage}
                  alt=""
                />
                <div className="p-5 w-full">
                  <h1 className=" relative z-50 mb-2 text-xl font-bold text-white">
                    {game.title}
                  </h1>

                  <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
                    {game.description}
                  </p>  

                  <p className="relative z-50 mb-4 text-base text-slate-500 flex gap-2">
                    <Calendar /> {game.releaseDate}
                  </p>

                  <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
                    ${game.price} 
                  </p>

                  {game.genres.map((genre) => {
                    return (
                      <p key={genre._id} className="relative z-50 mb-4 text-base font-normal text-slate-500 bg-[#4f52e71a] w-fit p-2 rounded-2xl">
                        {genre.name}
                      </p>
                    );
                  })}

                  {game.developers.map((developer) => {
                    return (
                      <p key={developer._id} className="relative z-50 mb-4 text-base font-normal text-slate-500 bg-[#4f52e71a] w-fit p-2 rounded-2xl">
                        {developer.name}
                      </p>
                    );
                  })}
                  <div className="flex gap-2 justify-center items-center">
                    <button
                      className="rounded-lg border border-gray-600 bg-[black] w-[90%] p-2 text-gray-300 flex justify-center gap-2 cursor-pointer"
                      onClick={() => {
                        handleEditBtn(game._id);
                      }}
                    >
                      <Edit /> Edit
                    </button>
                    <button
                      className="rounded-lg  w-[10%] py-2 text-gray-300 bg-red-500 flex justify-center cursor-pointer"
                      onClick={() => {
                        handleDeleteBtn(game._id);
                      }}
                    >
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
