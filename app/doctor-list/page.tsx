import axios from "axios";

import Header from "../components/header";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default async function DoctorList() {

  const doctors = await fetchDoctors();

  return (

    <>

      <Header />

      <Navbar />

      <main className="min-h-screen bg-slate-50 py-12 px-5">

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <h1 className="text-5xl font-black text-blue-600">
                Doctor List
              </h1>

              <p className="mt-2 text-slate-600">
                View all registered doctors
              </p>

            </div>

          </div>

          {
            doctors.length === 0 &&
            <h2 className="mt-10 text-2xl font-bold text-red-500">
              No doctors found
            </h2>
          }

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

            {
              doctors.map((item: any, index: number) => (

                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:-translate-y-1 transition"
                >

                   
                  {
                    item.filename &&
                    <img
                      src={
                        process.env.NEXT_PUBLIC_API_ENDPOINT +
                        "/doctor/getimage/" +
                        item.filename
                      }
                      alt="doctor"
                      width={500}
                      height={300}
                      className="w-full h-52 object-cover rounded-xl mb-4"
                    />
                  }

                  <h2 className="text-2xl font-bold text-slate-800">
                    {item.name}
                  </h2>

                  <p className="mt-3 text-slate-600">
                    {item.specialization}
                  </p>

                  <p className="mt-2 text-slate-500">
                    Experience: {item.experience} Years
                  </p>

                  <p className="mt-2 text-slate-500">
                    📞 {item.phone}
                  </p>

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

        </div>

      </main>

      <Footer />

    </>
  );
}

async function fetchDoctors() {

  try {

    console.log(process.env.NEXT_PUBLIC_API_ENDPOINT);

    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/doctor"
    );

    return response.data.doctors || [];

  } catch (error) {

    console.error(error);

    return [];
  }
}