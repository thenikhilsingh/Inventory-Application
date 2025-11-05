import React from 'react'

export default function Header() {
  return (
    <div className='flex w-screen justify-around fixed top-0 border-b border-amber-50 bg-black text-white p-8'>
      <div>GameVault</div>
      <div className='flex justify-around w-[20%]'>
        <div>Dashboard</div>
        <div>Games</div>
        <div>Genres</div>
        <div>Developers</div>
      </div>
    </div>
  )
}
