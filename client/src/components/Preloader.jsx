import React from "react";
import { LoaderFive } from "../components/ui/loader";

export default function Preloader() {
  return (
    <div className="text-white bg-black h-screen flex justify-center items-center relative">
      <span class="loader"></span>

      <div className="absolute top-[54%]">
        <LoaderFive text="Loading Data Please Wait..." />
      </div>
    </div>
  );
}
