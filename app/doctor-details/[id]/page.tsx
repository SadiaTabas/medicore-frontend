"use client";

import { useEffect, useState, use, JSX } from "react";
import axios from "axios";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function DoctorDetails({ params }: any): JSX.Element {

  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [jsonData, setJsonData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [myDoctorId, setMyDoctorId] = useState<string>("");

  useEffect(() => {

    const storedId = localStorage.getItem("doctorId");
    if (storedId) setMyDoctorId(storedId);

    fetchDoctor();

  }, []);

  async function fetchDoctor(): Promise<void> {

    try {

      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/doctor/" + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data;

      console.log(data);

      setJsonData(data);

    } catch (error) {

      console.error(error);
      setError("Failed to fetch doctor details");

    }
  }

  async function deleteDoctor(): Promise<void> {

    const confirmed = confirm("Are you sure you want to delete this doctor?");

    if (!confirmed) return;

    try {

      const response = await axios.delete(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/doctor/" + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data;

      console.log(data);

      setSuccess("Doctor deleted successfully");
      setError("");
      setJsonData(null);

    } catch (error) {

      console.error(error);
      setError("Failed to delete doctor");

    }
  }

  const isMyProfile = String(myDoctorId) === String(id);

  return (

    <>

      <Header />

      <Navbar />

      <main className="min-h-screen bg-slate-50 py-12 px-5">

        <div className="max-w-3xl mx-auto">

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">

            <div className="flex items-center justify-between mb-6">

              <h1 className="text-4xl font-black text-blue-600">
                Doctor Details
              </h1>

              {
                isMyProfile &&
                <span className="bg-blue-100 text-blue-600 text-sm font-bold px-3 py-1 rounded-full">
                  MY PROFILE
                </span>
              }

            </div>

            {error && (
              <p className="bg-red-100 text-red-600 px-4 py-3 rounded-lg font-semibold mb-4">
                {error}
              </p>
            )}

            {success && (
              <p className="bg-green-100 text-green-600 px-4 py-3 rounded-lg font-semibold mb-4">
                {success}
              </p>
            )}

            {
              jsonData &&

              <div className="space-y-4">

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <span className="text-2xl">👨‍⚕️</span>
                  <div>
                    <p className="text-sm text-slate-500 font-semibold">Name</p>
                    <p className="text-lg font-black text-slate-800">{jsonData.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="text-sm text-slate-500 font-semibold">Phone</p>
                    <p className="text-lg font-bold text-slate-800">{jsonData.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <span className="text-2xl">🩺</span>
                  <div>
                    <p className="text-sm text-slate-500 font-semibold">Specialization</p>
                    <p className="text-lg font-bold text-slate-800">{jsonData.specialization}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <p className="text-sm text-slate-500 font-semibold">Experience</p>
                    <p className="text-lg font-bold text-slate-800">{jsonData.experience} Years</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">

                  
                  {
                    isMyProfile &&

                    <>

                      <a href={`/doctor-update/${id}`}>
                        <button className="bg-blue-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                          Update My Profile
                        </button>
                      </a>

                      <button
                        onClick={deleteDoctor}
                        className="bg-red-500 text-white px-5 py-3 rounded-lg font-bold hover:bg-red-600 transition"
                      >
                        Delete Account
                      </button>

                    </>
                  }

                  <a href="/doctor-list">
                    <button className="border border-slate-300 px-5 py-3 rounded-lg font-semibold hover:bg-slate-100 transition">
                      Back to List
                    </button>
                  </a>

                </div>

              </div>
            }

          </div>

        </div>

      </main>

      <Footer />

    </>
  );
}
