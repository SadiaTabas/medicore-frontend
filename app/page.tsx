import Image from "next/image";
import Link from "next/link";
import Header from "./components/header";
import Footer from "./components/footer";

 


export default function HomePage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white text-slate-900">

       
        <section className="relative min-h-[720px] bg-[#eef7ff] overflow-hidden">

          <Image
            src="/hero/h1_hero.png"
            alt="Doctor System Hero"
            fill
            priority
            className="object-cover"
          />

          <div className="relative z-10 flex items-center min-h-[720px] max-w-7xl mx-auto px-6 lg:px-10">

            <div className="max-w-3xl">

              <p className="text-blue-600 font-semibold text-lg">
                Medicore Hospital 
              </p>

              <h1 className="text-5xl font-black leading-tight mt-3">
                Manage your <span className="text-blue-600">patients</span> easily
              </h1>

              <p className="mt-6 text-slate-600 text-lg">
                Login to access your dashboard, manage appointments, and view patient records securely.
              </p>

              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">

                <Link
                  href="/doctor-login"
                  className="bg-blue-600 text-white px-6 py-3 rounded font-bold hover:bg-blue-700 text-center"
                >
                  Doctor Login
                </Link>

              

              </div>

            </div>

          </div>
        </section>

       
        <section className="px-6 py-20 max-w-7xl mx-auto text-center">

          <h2 className="text-3xl font-black">
            Secure Doctor Panel
          </h2>

          <p className="mt-3 text-slate-600">
            Only authorized doctors can access patient records and appointments.
          </p>

        </section>

      </main>

      <Footer />
    </>
  );
}