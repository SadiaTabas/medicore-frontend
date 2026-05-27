"use client";

import { useEffect, useState, use, FormEvent, JSX } from "react";
import * as z from "zod";
import axios from "axios";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const updateSchema = z.object({

  name: z
    .string()
    .min(3, "Name is required")
    .regex(/^[A-Za-z\s.]+$/, "Only letters allowed"),

  specialization: z
    .string()
    .min(2, "Specialization is required"),

  experience: z
    .number()
    .min(1, "Experience is required"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  phone: z
    .string()
    .regex(/^01[0-9]{9}$/, "Invalid phone number"),

});

export default function DoctorUpdate({ params }: any): JSX.Element {

  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [name, setName] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [unauthorized, setUnauthorized] = useState<boolean>(false);

  useEffect(() => {

    const myId = localStorage.getItem("doctorId");

    if (String(myId) !== String(id)) {
      setUnauthorized(true);
      return;
    }
if (id) {
      fetchDoctor();
    }

  }, [id]);

  async function fetchDoctor(): Promise<void> {

    try { const token = localStorage.getItem("token");

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

      setName(data.name);
      setSpecialization(data.specialization);
      setExperience(String(data.experience));
      setPhone(data.phone);

    } catch (error) {

      console.error(error);
      setError("Failed to fetch doctor");

    }
  }
async function handleUpdate(
  e: FormEvent<HTMLFormElement>
): Promise<void> {

  e.preventDefault();

  const result = updateSchema.safeParse({
    name,
    specialization,
    experience: Number(experience),
    password,
    phone,
  });

  if (!result.success) {
    setError(result.error.issues[0].message);
    return;
  }

  try {

    
    const updateData: any = {
      name,
      specialization,
      experience: Number(experience),
      phone,
    };

    
    if (password.trim().length > 0) {
      updateData.password = password;
    }

    const response = await axios.patch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/doctor/" + id,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    console.log(data);

    
    localStorage.setItem("doctorName", name);

    setSuccess("Doctor updated successfully");
    setError("");
    setPassword("");
window.location.href = `/doctor-details/${id}`;
  } catch (error) {

    console.error(error);
    setError("Failed to update doctor");

  }
}

  
  if (unauthorized) {
    return (

      <>
        <Header />
        <Navbar />

        <main className="min-h-screen bg-slate-50 flex items-center justify-center">

          <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md">

            <div className="text-6xl mb-4">🚫</div>

            <h1 className="text-3xl font-black text-red-600">
              Access Denied
            </h1>

            <p className="text-slate-600 mt-4">
              You can only update your own profile. Please go back.
            </p>

            <div className="mt-6 flex justify-center gap-4">

              <a href="/doctor-home">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                  Go to Home
                </button>
              </a>

              <a href="/doctor-list">
                <button className="border border-slate-300 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition">
                  Doctor List
                </button>
              </a>

            </div>

          </div>

        </main>

        <Footer />
      </>
    );
  }

  return (

    <>

      <Header />

      <Navbar />

      <div className="min-h-screen bg-slate-100 py-12 px-4">

        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-slate-200">

          <div className="text-center mb-8">

            <h1 className="text-4xl font-black text-slate-800">
              Update My Profile
            </h1>

            <p className="text-slate-500 mt-2">
              Modify your doctor information and save updates
            </p>

          </div>

          <form
            onSubmit={handleUpdate}
            className="space-y-6"
          >

            {
              error &&
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            }

            {
              success &&
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                {success}
              </div>
            }

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Name
              </label>

              <input
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter doctor name"
              />

            </div>

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Specialization
              </label>

              <input
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                placeholder="Enter specialization"
              />

            </div>

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Experience
              </label>

              <input
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Years of experience"
              />

            </div>

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                New Password
              </label>

              <input
                type="password"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />

            </div>

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Phone
              </label>

              <input
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
              />

            </div>

            <div className="flex flex-wrap gap-4 pt-4">

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700 shadow-lg shadow-blue-600/30"
              >
                Update Profile
              </button>

              <a href={`/doctor-details/${id}`}>

                <button
                  type="button"
                  className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  View My Details
                </button>

              </a>

              <a href="/doctor-home">

                <button
                  type="button"
                  className="rounded-lg border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                >
                  Back to Home
                </button>

              </a>

            </div>

          </form>

        </div>

      </div>

      <Footer />

    </>
  );
}
