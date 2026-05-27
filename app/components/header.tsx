"use client";

import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  

  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md">

     
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

       
        <div>
          <h1 className="text-xl font-black tracking-wide">
            MEDICORE
          </h1>
          <p className="text-xs text-blue-100">
            Smart Doctor Management System
          </p>
        </div>

       
        <button
          onClick={() => setOpen(!open)}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition"
        >
          System Info
        </button>

      </div>

      
      {open && (
        <div className="border-t border-white/20 bg-white/10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 text-sm grid gap-1">

            <p>🏥 Hospital Management Platform</p>
            <p>👨‍⚕️ Doctor & Patient Management</p>
            <p>📅 Appointment System</p>
            <p>⚡ Secure API Integration</p>

          </div>
        </div>
      )}

    </header>
  );
}