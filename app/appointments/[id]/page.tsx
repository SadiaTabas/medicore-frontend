"use client";

import { useEffect, useState, use, FormEvent, JSX } from "react";
import axios from "axios";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function Appointments({ params }: any): JSX.Element {

  const resolvedParams = use(params);
  const doctorId = resolvedParams.id;

  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [patientName, setPatientName] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/doctor-login";
      return;
    }

    fetchAppointments();

  }, []);

  async function fetchAppointments(): Promise<void> {

    try {

      setLoading(true);

      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ENDPOINT + `/doctor/${doctorId}/appointment`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data;

      console.log(data);

      setAppointments(data || []);
      setError("");

    } catch (error) {

      console.error(error);
      setError("Failed to load appointments");
      setAppointments([]);

    } finally {

      setLoading(false);

    }
  }

  async function handleBookAppointment(e: FormEvent<HTMLFormElement>): Promise<void> {

    e.preventDefault();

    if (!patientName || !date) {
      setError("Patient name and date are required");
      return;
    }

    try {

      const appointmentData = {
        patientName,
        date,
      };

      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + `/doctor/${doctorId}/appointment`,
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      console.log(data);

      setSuccess("Appointment booked successfully!");
      setError("");

      setPatientName("");
      setDate("");

      fetchAppointments();

    } catch (error) {

      console.error(error);
      setError("Failed to book appointment");

    }
  }

  async function deleteAppointment(appointmentId: number): Promise<void> {

    const confirmed = confirm("Are you sure you want to delete this appointment?");

    if (!confirmed) return;

    try {

      const response = await axios.delete(
        process.env.NEXT_PUBLIC_API_ENDPOINT + `/doctor/appointment/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data;

      console.log(data);

      setSuccess("Appointment deleted successfully");
      setError("");

      fetchAppointments();

    } catch (error) {

      console.error(error);
      setError("Failed to delete appointment");

    }
  }

  return (

    <>
      <Header />

      <Navbar />

      <main className="min-h-screen bg-slate-50 py-12 px-5">

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

            <div>

              <h1 className="text-5xl font-black text-blue-600">
                My Appointments
              </h1>

              <p className="mt-2 text-slate-600">
                View and manage your patient appointments
              </p>

            </div>

            

          </div>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* BOOK APPOINTMENT FORM */}
            <div className="bg-white shadow-xl rounded-2xl p-8">

              <h2 className="text-2xl font-black text-slate-800 mb-6">
                Book New Appointment
              </h2>

              <form onSubmit={handleBookAppointment} className="space-y-5">

                {
                  error &&
                  <p className="bg-red-100 text-red-600 px-4 py-3 rounded-lg font-semibold">
                    {error}
                  </p>
                }

                {
                  success &&
                  <p className="bg-green-100 text-green-600 px-4 py-3 rounded-lg font-semibold">
                    {success}
                  </p>
                }

                <div>

                  <label className="block font-semibold text-slate-700 mb-2">
                    Patient Name
                  </label>

                  <input
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient name"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                  />

                </div>

                <div>

                  <label className="block font-semibold text-slate-700 mb-2">
                    Appointment Date
                  </label>

                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                  />

                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition"
                >
                  Book Appointment
                </button>

              </form>

            </div>

            {/* APPOINTMENTS LIST */}
            <div>

              <h2 className="text-2xl font-black text-slate-800 mb-6">
                Scheduled Appointments
              </h2>

              {
                loading &&
                <p className="text-slate-500 font-semibold">Loading appointments...</p>
              }

              {
                !loading && appointments.length === 0 &&
                <div className="bg-white rounded-2xl shadow p-8 text-center">
                  <div className="text-5xl mb-4">📅</div>
                  <p className="text-slate-600 font-semibold">
                    No appointments scheduled yet
                  </p>
                </div>
              }

              <div className="space-y-4">

                {
                  appointments.map((item: any, index: number) => (

                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg p-5 border border-slate-200 hover:-translate-y-1 transition"
                    >

                      <div className="flex items-center justify-between">

                        <div>

                          <h3 className="text-lg font-black text-slate-800">
                            {item.patientName}
                          </h3>

                          <p className="text-slate-500 mt-1">
                            📅 {item.date}
                          </p>

                        </div>

                        <button
                          onClick={() => deleteAppointment(item.id)}
                          className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  ))
                }

              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}
