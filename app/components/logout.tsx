"use client";

import { JSX } from "react";
import { useRouter } from "next/navigation";

export default function Logout(): JSX.Element {
  const router = useRouter();

  function handleLogout(): void {
    const doctorId = localStorage.getItem("doctorId");

    
    localStorage.removeItem("token");
    localStorage.removeItem("doctorId");
    localStorage.removeItem("doctorName");

     
    if (doctorId) {
      router.replace(`/doctor-update/${doctorId}`);
    } else {
      router.replace("/doctor-login");
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-500/30 transition duration-300 hover:bg-red-600 hover:scale-105 active:scale-95"
    >
      Logout
    </button>
  );
}