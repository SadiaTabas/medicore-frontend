"use client";

import { useState, JSX } from "react";
import axios from "axios";
import Header from "../components/header";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function SearchDoctor(): JSX.Element {

  const [name, setName] = useState<string>("");
  const [result, setResult] = useState<any[]>([]);
  const [searched, setSearched] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function searchDoctor(): Promise<void> {

    try {

      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
        "/doctor/search/name?name=" +
        name
      );

      const data = response.data.result;

      console.log(data);

      setResult(data);
      setSearched(true);
      setError("");

    } catch (error) {

      console.error(error);
      setError("Search failed");

    }
  }

    return (

    <>

      <Header />

      <Navbar />

      <main className="min-h-screen bg-slate-50 py-14 px-5">

        <div className="max-w-7xl mx-auto">

          <div className="text-center">

            <h1 className="text-5xl font-black text-blue-600">
              Search Doctor
            </h1>

            <p className="mt-4 text-slate-600 text-lg">
              Find doctors by name quickly and easily
            </p>

          </div>

          <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">

            {error &&
              <p className="bg-red-100 text-red-600 px-4 py-3 rounded-lg font-semibold mb-6">
                {error}
              </p>
            }

            <div className="flex flex-col md:flex-row gap-4 items-center">

              <div className="w-full">

                <label className="block font-semibold text-slate-700 mb-2">
                  Doctor Name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter doctor name"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                />

              </div>

              <button
                onClick={searchDoctor}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition mt-7"
              >
                Search
              </button>

            </div>

          </div>

          {
            searched && result.length === 0 &&
            <div className="text-center mt-10">

              <h3 className="text-2xl font-bold text-red-500">
                No doctor found
              </h3>

            </div>
          }

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

            {
              result.map((item: any, index: number) => (

                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:-translate-y-1 transition"
                >

                  <h2 className="text-2xl font-black text-slate-800">
                    {item.name}
                  </h2>

                  <div className="mt-4 space-y-2">

                    <p className="text-slate-600">
                      <span className="font-semibold">
                        ID:
                      </span>{" "}
                      {item.id}
                    </p>

                    <p className="text-slate-600">
                      <span className="font-semibold">
                        Phone:
                      </span>{" "}
                      {item.phone}
                    </p>

                    <p className="text-slate-600">
                      <span className="font-semibold">
                        Specialization:
                      </span>{" "}
                      {item.specialization}
                    </p>

                    <p className="text-slate-600">
                      <span className="font-semibold">
                        Experience:
                      </span>{" "}
                      {item.experience} Years
                    </p>

                  </div>

                  <div className="mt-6 flex gap-3">

                    <a href={`/doctor-details/${item.id}`}>

                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        View Details
                      </button>

                    </a>

                    <a href={`/doctor-update/${item.id}`}>

                      <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition">
                        Update
                      </button>

                    </a>

                  </div>

                </div>

              ))
            }

          </div>

          <div className="text-center mt-14">

            <a href="/doctor-list">

              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition">
                Back to List
              </button>

            </a>

          </div>

        </div>

      </main>

      <Footer />

    </>
  );
}