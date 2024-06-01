"use client"

import { useState, useEffect } from "react";
import { RxHamburgerMenu } from 'react-icons/rx';
import { SquidWidget } from "@0xsquid/widget";
import { createPublicClient, erc20Abi, http } from "viem";
import { optimism } from "viem/chains";

export default function Dashboard() {
    const publicClient = createPublicClient({
        chain: optimism,
        transport: http("https://optimism.llamarpc.com"),
      });

  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "es">("en"); // Default language is English
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const [clubName, setClubName] = useState("");
  const [cameraUrls, setCameraUrls] = useState<string[]>([""]);
  const [clubInfo, setClubInfo] = useState<{ clubName: string, cameraUrls: string[], contractAddress: string } | null>(null);
  const [dai, setDai] = useState(0)

  useEffect(() => {
    const storedClub = localStorage.getItem('club');
    if (storedClub) {
      setClubInfo(JSON.parse(storedClub));
    }

    const updateDai = async () => {
        if (clubInfo?.contractAddress) {
            setDai(await getDai())
        }
    }

    updateDai()
  }, []);

  const getDai = async (): Promise<number> => {
    const data = await publicClient.readContract({
        address: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [clubInfo?.contractAddress as `0x${string}`]
      })

      return Number(data)
  }

  const updateDai = async () => {
    if (clubInfo?.contractAddress) {
        setDai(await getDai())
    }
}

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  const handleAddCamera = () => {
    setCameraUrls([...cameraUrls, ""]);
  };

  const handleCameraUrlChange = (index: number, value: string) => {
    const newCameraUrls = [...cameraUrls];
    newCameraUrls[index] = value;
    setCameraUrls(newCameraUrls);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would handle creating the club with the entered details
    const response = await fetch('https://penguinup.vercel.app/api/club');
    const data = await response.json();
    if (data.result) {
      const newClubInfo = {
        clubName,
        cameraUrls,
        contractAddress: data.result,
      };
      localStorage.setItem('club', JSON.stringify(newClubInfo));
      setClubInfo(newClubInfo);
      setIsFormVisible(false);
    } else {
      console.error('Failed to create club:', data.error);
    }
  };

  const handleRefresh = () => updateDai();

  const handleRemoveClub = () => {
    localStorage.removeItem('club');
    setClubInfo(null);
  };

  const handleAddFunds = () => {
    const club = localStorage.getItem('club');
    if (club) {
      const parsedClub = JSON.parse(club);
    }
    setIsWidgetVisible(true);
  };

  const texts = {
    en: {
      title: "Penguinup on your club",
      subtitle: "Register your club",
      cameras: "Cameras",
      funds: "Funds",
      addClub: "Add Club",
      watchReplays: "Watch replays",
      penguinupOnYourClub: "Penguinup on your club",
      clubName: "Club Name",
      cameraHls: "Camera HLS URL",
      addCamera: "Add Camera",
      submit: "Submit",
      removeClub: "Remove Club",
      remainingTime: "Remaining Time",
      days: "Days",
      addFunds: "Add Funds",
      refreshFunds: "Refresh Funds"
    },
    es: {
      title: "Penguinup en tu club",
      subtitle: "Registra tu club",
      cameras: "Camaras",
      funds: "Fondos",
      addClub: "Agregar Club",
      watchReplays: "Ver repeticiones",
      penguinupOnYourClub: "Penguinup en tu club",
      clubName: "Nombre del Club",
      cameraHls: "URL HLS de la Cámara",
      addCamera: "Agregar Cámara",
      submit: "Enviar",
      remainingTime: "Tiempo restante",
      days: "Dias",
      removeClub: "Eliminar Club",
      addFunds: "Agregar Fondos",
      refreshFunds: "Actualizar fondos"
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
        <div className="w-full mt-8">
          {!isFormVisible && !clubInfo && (
            <button onClick={() => setIsFormVisible(true)} className="px-6 py-2 bg-blue-500 text-white rounded">{t.addClub}</button>
          )}
          {clubInfo && (
            <div className="bg-white p-4 shadow-lg">
              <h2 className="text-xl font-bold mb-2">{clubInfo.clubName}</h2>
              <ul>
                <li className="text-gray-700">{t.cameras}: 1</li>
                <li className="text-gray-700">Address: {clubInfo.contractAddress}</li>
                <li className="text-gray-700">{t.funds}: {(dai / 10 ** 18).toFixed(2)} DAI</li>
                <li className="text-gray-700">{t.remainingTime}: {(dai / 10 ** 18 * 1.5).toFixed(2)} {t.days}</li>
              </ul>
              <button onClick={handleAddFunds} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">{t.addFunds}</button>
              <button onClick={handleRefresh} className="ml-2 mt-4 px-4 py-2 bg-blue-500 text-white rounded">{t.refreshFunds}</button>
            </div>
          )}
        </div>
        {isWidgetVisible && <ol className="bg-white w-full">
            <li>1. Choose any token on any chain to send</li>
            <li>{"2. Don't change the receiver token on chain (DAI on Optimism)"}</li>
            <li>{`3. Set the "to address" as ${clubInfo?.contractAddress}`}</li>
      </ol>}
      </div>


      {isFormVisible && (
        <div className="absolute z-20 top-1/4 w-3/4 bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">{t.clubName}</label>
              <input
                type="text"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            {cameraUrls.map((url, index) => (
              <div className="mb-4" key={index}>
                <label className="block text-gray-700 text-sm font-bold mb-2">{`${t.cameraHls} ${index + 1}`}</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => handleCameraUrlChange(index, e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddCamera} className="px-4 py-2 bg-green-500 text-white rounded mb-4">{t.addCamera}</button>
            <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded">{t.submit}</button>
          </form>
        </div>
      )}

      {isWidgetVisible && (
        <div className="mt-5 flex justify-center">
          <SquidWidget
            config={{
              companyName: "Squid Widget",
              slippage: 1,
              infiniteApproval: false,
              defaultTokens: [{ chainId: 10, address: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1" }],
              initialFromChainId: "137",
              initialToChainId: "10",
              internalSameChainSwapAllowed: true,
              availableChains: {
                destination: ["10"],
              },
              apiUrl: "https://v2.api.squidrouter.com",
              preferDex: ["QUICKSWAP"],
              integratorId: "penguinup-cd191dc7-04ee-456c-8533-55d0c5aaa5dc",
            }}
          />
        </div>
      )}
    </main>
  );
}
