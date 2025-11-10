"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/moving-border";
import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

export function DeveloperForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
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
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="enter game name" type="text" />
          </LabelInputContainer>
          <br />
          <LabelInputContainer>
            <Label htmlFor="website">Website</Label>
            <Input id="website" placeholder="enter Website" type="text" />
          </LabelInputContainer>
          <div className="my-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="foundedYear">Founded Year</Label>
              <Input id="foundedYear" placeholder="enter year" type="date" />
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="games">Games</Label>
            <Input id="games" placeholder="enter games" type="text" />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-linear-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Sign up &rarr;
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
