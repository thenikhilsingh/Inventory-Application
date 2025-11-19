"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/moving-border";
import { ArrowLeft } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { DataContext } from "../../App";

export function DeveloperForm() {
  const { id } = useParams();
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { setDevelopers } = useContext(DataContext);

  const [developerData, setDeveloperData] = useState({
    name: "",
    website: "",
    foundedYear: "",
    games: "",
  });

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchDeveloperData = async () => {
      try {
        const res = await axios.get(`${VITE_API_URL}/developers/${id}`);
        setDeveloperData(res.data);
      } catch (error) {
        console.error("Error fetching genre data:", error);
      }
    };
    fetchDeveloperData();
  }, [id]);

  const handleChange = (e) => {
    setDeveloperData({
      ...developerData,
      [e.target.id]: e.target.value,
    });
  };

  function handleDeleteBtn(e, id) {
    e.preventDefault();
    try {
      axios.delete(`${VITE_API_URL}/developers/${id}`);
      setDevelopers((prev) => prev.filter((item) => item._id !== id));
      alert("Game deleted successfully!");
      navigate("/developers");
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!id) {
        const res = await axios.post(
          `${VITE_API_URL}/developers`,
          developerData
        );
        setDevelopers((prev) => [...prev, res.data]);
        alert("developer created successfully!");
        navigate("/developers");
      } else {
        const res = await axios.put(
          `${VITE_API_URL}/developers/${id}`,
          developerData
        );
        setDevelopers((prev) =>
          prev.map((genre) =>
            genre._id === id ? { ...genre, ...res.data } : genre
          )
        );
        alert("developer updated successfully!");
        navigate("/developers");
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
    <div className="w-full h-screen bg-black">
      <div className="shadow-input mx-auto mt-25 w-[50%] rounded-none p-4 md:rounded-2xl md:p-8 bg-black">
        <NavLink to="/developers">
          <Button
            borderRadius="1.75rem"
            className=" bg-slate-900 text-white font-bold border-slate-800 flex gap-1 cursor-pointer"
          >
            <ArrowLeft /> return to Developers
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
              placeholder="enter game name"
              type="text"
              value={developerData.name}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <br />
          <LabelInputContainer>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              placeholder="enter Website"
              type="text"
              value={developerData.website}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <div className="my-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="foundedYear">Founded Year</Label>
              <Input
                id="foundedYear"
                placeholder="enter year"
                type="number"
                value={developerData.foundedYear}
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>

          {id && (
            <LabelInputContainer className="mb-8">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="enter the Admin's Password"
                type="password"
                value={developerData.password}
                onChange={handleChange}
              />
            </LabelInputContainer>
          )}
          <div className="flex gap-5">
            <button
              className="group/btn relative block h-10 w-full rounded-md bg-linear-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="submit"
            >
              {!id ? "Create Developer" : "Update Developer"}
              <BottomGradient />
            </button>
            <button
              className="rounded-lg  w-[10%] py-2 text-gray-300 bg-red-500 flex justify-center cursor-pointer"
              onClick={(e) => handleDeleteBtn(e, developerData._id)}
            >
              <Trash2 />
            </button>
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
