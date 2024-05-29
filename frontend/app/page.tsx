"use client"

import Image from "next/image";
import { useState } from "react";
import { RxHamburgerMenu } from 'react-icons/rx';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <video className="absolute top-1/2 left-1/2 w-auto h-auto min-w-full min-h-full max-w-none transform -translate-x-1/2 -translate-y-1/2 filter brightness-[30%]" autoPlay muted playsInline loop src="/video.mp4"/>
      <div className="absolute top-0 w-full z-10">
        <div className="relative z-20 mx-auto mt-5 flex justify-between items-center max-w-screen-lg px-2">
          <Image src='/logo.png' width={50} height={50} alt="logo" />
          <RxHamburgerMenu onClick={() => setMenuOpen(!menuOpen)} color="white" size={24}/>
        </div>
        {menuOpen && (
          <div className="mx-auto absolute top-0 right-0 w-full min-h-screen bg-black opacity-90 rounded shadow-lg">
            <ul className="max-w-screen-lg mx-auto mt-20 flex flex-col items-end space-y-4 p-6 text-white">
              <li><a href="#">Watch replays</a></li>
              <li><a href="#">Penguinup on your club</a></li>
            </ul>
          </div>
        )}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center mt-20 md:mt-40">
        <h1 className="text-white text-4xl md:text-6xl font-bold">REVIVÍ TU PARTIDO</h1>
        <p className="text-white text-lg md:text-2xl mt-4">Encontrá tus mejores jugadas y compartilas con tus amigos</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <select className="px-4 py-2 bg-white text-black rounded">
            <option>Elegí el club</option>
          </select>
          <select className="px-4 py-2 bg-white text-black rounded">
            <option>Elegí la cancha</option>
          </select>
          <select className="px-4 py-2 bg-white text-black rounded">
            <option>Elegí la fecha</option>
          </select>
          <select className="px-4 py-2 bg-white text-black rounded">
            <option>Elegí el horario</option>
          </select>
          <button className="px-6 py-2 bg-orange-500 text-white rounded">VER VIDEO</button>
        </div>
      </div>
    </main>
  );
}
