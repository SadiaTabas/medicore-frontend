"use client";

import Link from "next/link";
import { useEffect, useState, JSX } from "react";

export default function Navbar(): JSX.Element {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [doctorName, setDoctorName] = useState<string>("");

  useEffect(() => {

    const token = localStorage.getItem("token");
    const name = localStorage.getItem("doctorName");

    setIsLoggedIn(!!token);

    if (name) {
      setDoctorName(name);
    }

  }, []);

  function handleLogout(): void {

    localStorage.removeItem("token");
    localStorage.removeItem("doctorId");
    localStorage.removeItem("doctorName");

    setIsLoggedIn(false);

    window.location.href = "/doctor-login";

  }

  return (

    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-wrap items-center justify-between py-4 gap-4">
 

          
          <div className="flex flex-wrap items-center gap-3">

           
            {
              !isLoggedIn &&

              <>

                <Link
                  href="/"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-600 hover:text-white"
                >
                  Home
                </Link>

                <Link
                  href="/doctor-register"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-600 hover:text-white"
                >
                  Doctor Register
                </Link>

                <Link
                  href="/doctor-list"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-600 hover:text-white"
                >
                  Doctor List
                </Link>

                <Link
                  href="/doctor-search"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-600 hover:text-white"
                >
                  Search Doctor
                </Link>

                <Link
                  href="/doctor-login"
                  className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-blue-700 shadow-lg shadow-blue-600/30"
                >
                  Doctor Login
                </Link>

              </>
            }

           
            {
              isLoggedIn &&

              <>

                <Link
                  href="/doctor-home"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-600 hover:text-white"
                >
                  Home
                </Link>

                <Link
                  href="/doctor-register"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-600 hover:text-white"
                >
                  Doctor Register
                </Link>

                <Link
                  href="/doctor-list"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-600 hover:text-white"
                >
                  Doctor List
                </Link>

                <Link
                  href="/doctor-search"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-600 hover:text-white"
                >
                  Search Doctor
                </Link>

                

                <span className="text-sm font-semibold text-slate-600">
                  👋 Welcome, <span className="text-blue-600">{doctorName}</span>
                </span>

                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-red-600 shadow-lg shadow-red-500/30"
                >
                  Logout
                </button>

              </>
            }

          </div>

        </div>

      </div>

    </nav>
  );
}
