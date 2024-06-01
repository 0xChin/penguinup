"use client"

import { useState } from "react";
import { RxHamburgerMenu } from 'react-icons/rx';
import { SquidWidget } from "@0xsquid/widget";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "es">("en"); // Default language is English

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  const texts = {
    en: {
      title: "Penguinup on your club",
      subtitle: "Register your club",
      addClub: "Add Club",
      watchReplays: "Watch replays",
      penguinupOnYourClub: "Penguinup on your club"
    },
    es: {
      title: "Penguinup en tu club",
      subtitle: "Registra tu club",
      addClub: "Agregar Club",
      watchReplays: "Ver repeticiones",
      penguinupOnYourClub: "Penguinup en tu club"
    }
  };

  const t = texts[language];

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-4 md:p-24 overflow-hidden">
      <video className="absolute top-1/2 left-1/2 w-auto h-auto min-w-full min-h-full max-w-none transform -translate-x-1/2 -translate-y-1/2 filter brightness-[30%]" autoPlay muted playsInline loop src="/video.mp4"/>
      <div className="absolute top-0 w-full z-10">
        <div className="relative z-20 mx-auto mt-5 flex justify-between items-center max-w-screen-lg px-2">
          <img src='/logo.png' width={50} height={50} alt="logo" />
          <button onClick={toggleLanguage} className="text-white">{language === "en" ? "ES" : "EN"}</button>
          <RxHamburgerMenu onClick={() => setMenuOpen(!menuOpen)} color="white" size={24}/>
        </div>
        {menuOpen && (
          <div className="mx-auto absolute top-0 right-0 w-full min-h-screen bg-black opacity-70 rounded shadow-lg">
            <ul className="max-w-screen-lg mx-auto mt-20 flex flex-col items-end space-y-4 p-6 text-white">
              <li><a href="/">{t.watchReplays}</a></li>
              <li><a href="/dashboard">{t.penguinupOnYourClub}</a></li>
            </ul>
          </div>
        )}
      </div>
      <div className={`${menuOpen && 'opacity-10'} relative z-10 flex flex-col items-center justify-center text-center mt-20 md:mt-40`}>
        <h1 className="text-white text-4xl md:text-6xl font-bold">{t.title}</h1>
        <p className="text-white text-lg md:text-2xl mt-4">{t.subtitle}</p>
        <div className="mt-8">
          <button className="px-6 py-2 bg-blue-500 text-white rounded">{t.addClub}</button>
        </div>
      </div>

        <div className="flex justify-center">
            <SquidWidget config={{
            companyName: "Squid Widget",
            slippage: 1,
            infiniteApproval: false,
            defaultTokens: [ { chainId: 10, address: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1" } ],
            initialFromChainId: "137",
            initialToChainId: "10",
            internalSameChainSwapAllowed: true,
            availableChains: {
            destination: [ "10" ],
            },
            apiUrl: "https://v2.api.squidrouter.com",
            preferDex: [ "QUICKSWAP" ],
            integratorId: "penguinup-cd191dc7-04ee-456c-8533-55d0c5aaa5dc",
        }} />
        </div>
    </main>
  );
}
