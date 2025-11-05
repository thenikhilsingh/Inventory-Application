import React from "react";

export default function Home() {
  return (
    <div className="bg-black h-screen mt-15">
      <div className='bg-[url("/hero-banner.jpg")] h-[50%] text-white bg-cover bg-center flex flex-col justify-center items-center '>
       <div className="absolute inset-0 bg-linear-to-b from-transparent to-black"></div>
       <div className="z-10 flex flex-col items-center gap-5">
         <h1 className="text-9xl font-bold">GameVault</h1>
        <p className="text-5xl">Your Ultimate Game Management Dashboard</p>
       </div>
      </div>
    </div>
  );
}
