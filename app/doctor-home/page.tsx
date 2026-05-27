"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
 
import Header from "../components/header";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function DoctorHome() {

  const [doctorName, setDoctorName] = useState<string>("");
 
  const [doctorId, setDoctorId] = useState<string>("");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/doctor-login";
      return;
    }

    const name = localStorage.getItem("doctorName");
    const id = localStorage.getItem("doctorId");

    if (name) setDoctorName(name);
    if (id) setDoctorId(id);

  }, []);

  return (
    <>
      <Header />

      <Navbar />

      <main className="min-h-screen bg-slate-50 px-6 py-10">

        <div className="max-w-7xl mx-auto">

          
          <div className="bg-white shadow-md rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">

            <div>

              <h1 className="text-5xl font-black text-blue-600">
  Doctor DASHBOARD
</h1>

              <p className="text-slate-600 mt-2">
                Manage your patients, appointments and doctor profile from here.
              </p>

            </div>

             

          </div>

          
          <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

  
  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between">

    <div>
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
        👨‍⚕️
      </div>

      <h2 className="text-xl font-bold mt-4">My Profile</h2>

      <p className="text-slate-600 mt-2">
        Update your doctor profile and details.
      </p>
    </div>

    <Link
      href={`/doctor-update/${doctorId}`}
      className="text-blue-600 font-semibold mt-6 inline-block"
    >
      Edit Profile →
    </Link>
  </div>

 
  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between">

    <div>
      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-3xl">
        🔑
      </div>

      <h2 className="text-xl font-bold mt-4">Quick Update</h2>

      <p className="text-slate-600 mt-2">
        Update phone number and password only.
      </p>
    </div>

    <Link
      href={`/doctor-patch/${doctorId}`}
      className="text-yellow-600 font-semibold mt-6 inline-block"
    >
      Quick Update →
    </Link>
  </div>

   
  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between">

    <div>
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
        📅
      </div>

      <h2 className="text-xl font-bold mt-4">My Appointments</h2>

      <p className="text-slate-600 mt-2">
        View and manage your appointments.
      </p>
    </div>

    <Link
      href={`/appointments/${doctorId}`}
      className="text-green-600 font-semibold mt-6 inline-block"
    >
      View Appointments →
    </Link>
  </div>

</div>
          

          

        </div>

      </main>

      <Footer />
    </>
  );
}
