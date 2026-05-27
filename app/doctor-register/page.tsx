 "use client";
import { useState, FormEvent,JSX} from "react";
import * as z from "zod";
import Header from "../components/header";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";
 
const doctorSchema = z.object({
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

type DoctorData = z.infer<typeof doctorSchema>;

export default function DoctorRegister(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [error, setError] = useState<string>("");

  const [file, setFile] = useState<File | null>(null);

async function handleSubmit(
  e: FormEvent<HTMLFormElement>
): Promise<void> {

  e.preventDefault();
    setError("");

  const result = doctorSchema.safeParse({
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

    const formData = new FormData();

    formData.append("name", name);
    formData.append("specialization", specialization);
    formData.append("experience", experience);
    formData.append("password", password);
    formData.append("phone", phone);

    if (file) {
      formData.append("file", file);
    }

    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/doctor",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);

    alert("Doctor Registered Successfully");

    
    setName("");
    setSpecialization("");
    setExperience("");
    setPassword("");
    setPhone("");
    setFile(null);

  } catch (err: any) {

    console.log(err);

    if (err.response) {

      setError(err.response.data.message || "Registration failed");

    } else {

      setError("Server connection failed");

  }

  }
}
 return (

  <>
    <Header />

    <Navbar />

    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-5 py-16">

      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-10 border border-slate-200">

        <div className="text-center">

          <h2 className="text-5xl font-black text-blue-600">
            Doctor Registration
          </h2>

          <p className="mt-4 text-slate-500 text-lg">
            Register doctor information and upload documents
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          {
            error &&
            <p className="bg-red-100 text-red-600 px-4 py-3 rounded-lg font-semibold">
              {error}
            </p>
          }

          <div>

            <label className="block font-semibold text-slate-700 mb-2">
              Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter doctor name"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
            />

          </div>

          <div>

            <label className="block font-semibold text-slate-700 mb-2">
              Specialization
            </label>

            <input
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="Cardiology, Neurology..."
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
            />

          </div>

          <div>

            <label className="block font-semibold text-slate-700 mb-2">
              Experience
            </label>

            <input
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Years of experience"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
            />

          </div>

          <div>

            <label className="block font-semibold text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
            />

          </div>

          <div>

            <label className="block font-semibold text-slate-700 mb-2">
              Phone
            </label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="017XXXXXXXX"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
            />

          </div>

          <div>

            <label className="block font-semibold text-slate-700 mb-2">
              PDF File
            </label>

            <input
              type="file"
              accept=".pdf"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white"
              onChange={(e) => {

                if (e.target.files) {

                  setFile(e.target.files[0]);

                }

              }}
            />

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition"
          >
            Register
          </button>

          {/* Login Link */}

          <div className="text-center pt-2">

            <p className="text-slate-600">

              Already have an account?{" "}

              <a
  href="/doctor-login"
  onClick={() => {

    localStorage.removeItem("token");
    localStorage.removeItem("doctorId");
    localStorage.removeItem("doctorName");

  }}
  className="text-blue-600 font-bold hover:underline"
>
  Log In
</a>

            </p>

          </div>

        </form>

      </div>

    </main>

    <Footer />
  </>
);
}