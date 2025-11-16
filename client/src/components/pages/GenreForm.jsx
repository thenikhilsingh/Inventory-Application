"use client";
import React, { useState } from "react";
import axios from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/moving-border";
import { ArrowLeft } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { NavLink } from "react-router-dom";

export function GenreForm() {
  const [genreData, setGenreData] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setGenreData({
      ...genreData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.post(`${VITE_API_URL}/genres`, genreData);
      console.log("Genre created:", res.data);
      alert("Genre Created Successfully!");
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert("Something went wrong");
      }
    }
  };
  return (
    <div className="w-full h-screen bg-black">
      <div className="shadow-input mx-auto mt-25 w-[50%] rounded-none p-4 md:rounded-2xl md:p-8 bg-black">
        <NavLink to="/genres">
          <Button
            borderRadius="1.75rem"
            className=" bg-slate-900 text-white font-bold border-slate-800 flex gap-1 cursor-pointer"
          >
            <ArrowLeft /> return to Genres
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
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={genreData.name}
              placeholder="enter game name"
              type="text"
              onChange={handleChange}
            />
          </LabelInputContainer>
          <br />
          <LabelInputContainer>
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="description"
              placeholder="write about game"
              type="text"
              value={genreData.description}
              onChange={handleChange}
            ></Textarea>
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-linear-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] mt-8"
            type="submit"
          >
            create Genre
            <BottomGradient />
          </button>
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
