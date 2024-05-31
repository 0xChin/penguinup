"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { RxHamburgerMenu } from 'react-icons/rx';

interface Dates {
  label: string;
  value: string;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dateOptions, setDateOptions] = useState<Dates[]>([]);
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const generateDateOptions = () => {
      const options = [];
      const today = new Date();
      
      const formatDate = (date: Date) => {
        const dayName = date.toLocaleDateString(undefined, { weekday: 'long' });
        const dayNumber = date.getDate();
        return `${dayName} ${dayNumber}`;
      };

      options.push({ label: "Today", value: today.toISOString().split("T")[0] });

      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      options.push({ label: "Yesterday", value: yesterday.toISOString().split("T")[0] });

      for (let i = 2; i <= 6; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        options.push({ label: formatDate(date), value: date.toISOString().split("T")[0] });
      }

      setDateOptions(options);
    };

    generateDateOptions();
  }, []);

  const handleClubChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClub(event.target.value);
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedField(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-4 md:p-24 overflow-hidden">
      <video className="absolute top-1/2 left-1/2 w-auto h-auto min-w-full min-h-full max-w-none transform -translate-x-1/2 -translate-y-1/2 filter brightness-[30%]" autoPlay muted playsInline loop src="/video.mp4"/>
      <div className="absolute top-0 w-full z-10">
        <div className="relative z-20 mx-auto mt-5 flex justify-between items-center max-w-screen-lg px-2">
          <img src='/logo.png' width={50} height={50} alt="logo" />
          <RxHamburgerMenu onClick={() => setMenuOpen(!menuOpen)} color="white" size={24}/>
        </div>
        {menuOpen && (
          <div className="mx-auto absolute top-0 right-0 w-full min-h-screen bg-black opacity-70 rounded shadow-lg">
            <ul className="max-w-screen-lg mx-auto mt-20 flex flex-col items-end space-y-4 p-6 text-white">
              <li><a href="/">Watch replays</a></li>
              <li><a href="/dashboard">Penguinup on your club</a></li>
            </ul>
          </div>
        )}
      </div>
      <div className={`${menuOpen && 'opacity-10'} relative z-10 flex flex-col items-center justify-center text-center mt-20 md:mt-40`}>
        <h1 className="text-white text-4xl md:text-6xl font-bold">REPLAY YOUR GAME</h1>
        <p className="text-white text-lg md:text-2xl mt-4">Find your best plays and share them with your friends</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <select className="px-4 py-2 bg-white text-black rounded" value={selectedClub} onChange={handleClubChange}>
            <option value="">Choose the club</option>
            <option value="SET PADEL HOUSE">SET PADEL HOUSE</option>
          </select>
          <select className="px-4 py-2 bg-white text-black rounded" value={selectedField} onChange={handleFieldChange}>
            <option value="">Choose the field</option>
            <option value="PADEL 1">PADEL 1</option>
          </select>
          <select className="px-4 py-2 bg-white text-black rounded" value={selectedDate} onChange={handleDateChange}>
            <option value="">Choose the date</option>
            {dateOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <select className="px-4 py-2 bg-white text-black rounded" value={selectedTime} onChange={handleTimeChange}>
            <option value="">Choose the time</option>
            <option value="17:30-18:00">17:30-18:00</option>
          </select>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link href={{
            pathname: '/replay',
     /*        query: {
              club: selectedClub,
              field: selectedField,
              date: selectedDate,
              time: selectedTime,
            } */
          }}>
            <button className="px-6 py-2 bg-orange-500 text-white rounded disabled:opacity-50" disabled={!selectedClub || !selectedField || !selectedDate || !selectedTime}>WATCH VIDEO</button>
          </Link>
          <Link href={{
            pathname: '/live',
      /*       query: {
              club: selectedClub,
              field: selectedField,
            } */
          }}>
            <button className="px-6 py-2 bg-green-500 text-white rounded disabled:opacity-50" disabled={!selectedClub || !selectedField}>WATCH LIVE</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
