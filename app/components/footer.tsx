import Link from "next/link";

export default function Footer() {
  return (

    <footer className="bg-slate-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">

        
        <div>

          <h3 className="text-3xl font-black text-blue-400">
            MEDICORE
          </h3>

          <p className="mt-4 text-slate-300 leading-7">
            Smart Doctor Management System for managing
            doctors, appointments and healthcare services easily.
          </p>

          <div className="mt-6 flex gap-3">

            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              F
            </div>

            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              T
            </div>

            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              I
            </div>

          </div>

        </div>

       
        <div>

          <h4 className="text-2xl font-bold mb-5">
            Quick Links
          </h4>

          <div className="flex flex-col gap-3">

            <Link
              href="/"
              className="text-slate-300 hover:text-blue-400 transition"
            >
              Home
            </Link>

            <Link
              href="/doctor-register"
              className="text-slate-300 hover:text-blue-400 transition"
            >
              Doctor Register
            </Link>

            <Link
              href="/doctor-list"
              className="text-slate-300 hover:text-blue-400 transition"
            >
              Doctor List
            </Link>

            <Link
              href="/doctor-search"
              className="text-slate-300 hover:text-blue-400 transition"
            >
              Search Doctor
            </Link>

            <Link
              href="/doctor-login"
              className="text-slate-300 hover:text-blue-400 transition"
            >
              Doctor Login
            </Link>

          </div>

        </div>

        
        <div>

          <h4 className="text-2xl font-bold mb-5">
            Contact
          </h4>

          <div className="space-y-4 text-slate-300">

            <p>
              📍 Dhaka, Bangladesh
            </p>

            <p>
              📧 doctor@medicore.com
            </p>

            <p>
              📞 01700000000
            </p>

          </div>

          <div className="mt-6">

            <button className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700 shadow-lg shadow-blue-600/30">
              Emergency Support
            </button>

          </div>

        </div>

      </div>

      
      <div className="border-t border-slate-700">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-slate-400 text-sm">
            © 2026 Medicore HealthCare. All Rights Reserved.
          </p>

          <div className="flex gap-5 text-sm text-slate-400">

            <Link
              href="/"
              className="hover:text-blue-400 transition"
            >
              Privacy Policy
            </Link>

            <Link
              href="/"
              className="hover:text-blue-400 transition"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>

    </footer>

  );
}