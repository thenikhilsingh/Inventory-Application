"use client";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/moving-border";
import { ArrowLeft } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { DataContext } from "../../App";
import { Trash2 } from "lucide-react";

export function GameForm() {
  const { setGames, genres, developers } = useContext(DataContext);
  const { id } = useParams();
  const [errors, setErrors] = useState([]);

  const [gameData, setGameData] = useState({
    title: "",
    description: "",
    releaseDate: "",
    price: "",
    genres: [],
    developers: [],
    coverImage: "",
    password: "",
  });

  const navigate = useNavigate();
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const res = await axios.get(`${VITE_API_URL}/games/${id}`);

        setGameData({
          ...res.data,
          releaseDate: res.data.releaseDate?.split("T")[0],
          genres: res.data.genres?.map((g) => g._id),
          developers: res.data.developers?.map((d) => d._id),
        });
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    fetchGameData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      setGameData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value),
      }));
    } else {
      setGameData({ ...gameData, [name]: value });
    }
  };

  async function handleDeleteBtn(e, id) {
    e.preventDefault();

    try {
      await axios.delete(`${VITE_API_URL}/games/${id}`);
      setGames((prev) => prev.filter((item) => item._id !== id));
      alert("Game deleted successfully!");
      navigate("/games");
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    try {
      if (!id) {
        const res = await axios.post(`${VITE_API_URL}/games`, gameData);
        setGames((prev) => [...prev, res.data]);
        console.log("Game created:", res.data);
        alert("Game created successfully!");
        navigate("/games");
      } else {
        const res = await axios.put(`${VITE_API_URL}/games/${id}`, gameData);
        setGames((prev) =>
          prev.map((game) =>
            game._id === id ? { ...game, ...res.data } : game
          )
        );
        console.log("Game updated:", res.data);
        alert("Game updated successfully!");
        navigate("/games");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert("Something went wrong");
      }
    }
  };
  return (
    <div className="w-full bg-black">
      <div className="shadow-input mx-auto mt-25 w-[50%] rounded-none p-4 md:rounded-2xl md:p-8 bg-black">
        <NavLink to="/games">
          <Button
            borderRadius="1.75rem"
            className=" bg-slate-900 text-white font-bold border-slate-800 flex gap-1 cursor-pointer"
          >
            <ArrowLeft /> return to Games
          </Button>
        </NavLink>
        {errors.length > 0 && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded my-4">
            <h2 className="font-semibold mb-2">Fix the following errors:</h2>
            <ul className="space-y-1">
              {errors.map((err, index) => (
                <li key={index}>• {err.msg}</li>
              ))}
            </ul>
          </div>
        )}
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label htmlFor="title">Name</Label>
            <Input
              id="title"
              name="title"
              placeholder="enter game name"
              type="text"
              value={gameData.title}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <br />
          <LabelInputContainer>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="write about game"
              type="text"
              value={gameData.description}
              onChange={handleChange}
            ></Textarea>
          </LabelInputContainer>
          <div className="my-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="releaseDate">Release Date</Label>
              <Input
                id="releaseDate"
                name="releaseDate"
                placeholder="enter Date"
                type="date"
                value={gameData.releaseDate}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                placeholder="enter Price"
                type="Number"
                value={gameData.price}
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="genre">Genre</Label>

            <div className="flex text-white gap-10">
              {genres.map((genre) => {
                return (
                  <div key={genre._id} className="flex gap-2">
                    <input
                      type="checkbox"
                      id={genre.name}
                      name="genres"
                      value={genre._id}
                      checked={gameData.genres.includes(genre._id)}
                      onChange={handleChange}
                    />
                    <label htmlFor={genre.name}>{genre.name}</label>
                  </div>
                );
              })}
            </div>
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="developer">Developer</Label>
            <div className="flex text-white gap-10">
              {developers.map((developer) => {
                return (
                  <div key={developer._id} className="flex gap-2">
                    <input
                      type="checkbox"
                      id={developer.name}
                      name="developers"
                      value={developer._id}
                      checked={gameData.developers.includes(developer._id)}
                      onChange={handleChange}
                    />
                    <label htmlFor={developer.name}>{developer.name}</label>
                  </div>
                );
              })}
            </div>
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="coverImage">Cover Image</Label>
            <Input
              id="coverImage"
              name="coverImage"
              placeholder="enter url"
              type="text"
              value={gameData.coverImage}
              onChange={handleChange}
            />
          </LabelInputContainer>

          {id && (
            <LabelInputContainer className="mb-8">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="enter the Admin's Password"
                type="password"
                value={gameData.password}
                onChange={handleChange}
              />
            </LabelInputContainer>
          )}
          <div className="flex gap-5">
            <button
              className="group/btn relative block h-10 w-full rounded-md bg-linear-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
              type="submit"
            >
              {!id ? "Create Game" : "Update Game"}
              <BottomGradient />
            </button>
            {id && (
              <button
                type="button"
                className="rounded-lg  w-[10%] py-2 text-gray-300 bg-red-500 flex justify-center cursor-pointer"
                onClick={(e) => {
                  handleDeleteBtn(e, gameData._id);
                }}
              >
                <Trash2 />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
