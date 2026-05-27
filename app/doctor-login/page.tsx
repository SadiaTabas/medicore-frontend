"use client";

import { useState, FormEvent, JSX } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";

import Header from "../components/header";
import Footer from "../components/footer";

const loginSchema = z.object({
  phone: z.string().regex(/^01[0-9]{9}$/, "Invalid Phone number"),
  password: z.string().min(6, "Invalid Password"),
});

export default function DoctorLogin(): JSX.Element {
  const router = useRouter();

  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  async function handleLogin(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    const result = loginSchema.safeParse({
      phone,
      password,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {

      const loginData = {
        phone,
        password,
      };

      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/login",
        loginData
      );

      const data = response.data;

      console.log(data);

      if (data.access_token) {

        localStorage.setItem("token", data.access_token);
        localStorage.setItem("doctorId", String(data.id));
        localStorage.setItem("doctorName", data.name);

        setSuccess("Login Successful");
        setError("");

        setTimeout(() => {
          router.push("/doctor-home");
        }, 500);

      }

    } catch (error) {
      console.error(error);
      setError("Invalid Phone or Password");
    }
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-5 py-10">

        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

          <h1 className="text-3xl font-black text-center text-blue-600">
            Doctor Login
          </h1>

          <p className="text-center text-slate-500 mt-2">
            Login to manage doctor services
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-5">

            {error && (
              <p className="bg-red-100 text-red-600 px-4 py-3 rounded font-semibold">
                {error}
              </p>
            )}

            {success && (
              <p className="bg-green-100 text-green-600 px-4 py-3 rounded font-semibold">
                {success}
              </p>
            )}

            <div>
              <label className="font-semibold text-slate-700">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-2 border border-slate-300 rounded-lg px-4 py-3 focus:border-blue-600 outline-none"
                placeholder="017XXXXXXXX"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 border border-slate-300 rounded-lg px-4 py-3 focus:border-blue-600 outline-none"
                placeholder="Min 6 characters"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Login
            </button>

            <div className="text-center mt-4">
  <p className="text-slate-600 text-sm">
    Are you a new user?{" "}
    <span
      onClick={() => router.push("/doctor-register")}
      className="text-blue-600 font-semibold cursor-pointer hover:underline"
    >
      Register here
    </span>
  </p>
</div>

          </form>

        </div>

      </main>

      <Footer />
    </>
  );
}
