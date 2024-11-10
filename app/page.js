
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./dashboard/_components/Header";
import ThreeCanvas from "./dashboard/_components/ThreeCanvas"; // Import the ThreeCanvas component

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Header and landing page content */}
      <div className="relative z-10 bg-black bg-opacity-70">
        <Header />
        <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-opacity-30 backdrop-blur-lg border border-opacity-20 border-white">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl dark:text-white">
              WELCOME TO PrepAI
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-200 opacity-60 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Your personal AI interview coach
            </p>
            <div className="flex flex-col lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <a
                href="/dashboard"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black rounded-lg text-opacity-80 bg-primary hover:bg-primary hover:text-purple-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Get Started
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36"></div>
          </div>
        </section>
      </div>

      {/* Three.js canvas with floating 3D objects */}
      <div className="relative w-full h-screen">
        <ThreeCanvas />
      </div>
    </div>
  );
}
