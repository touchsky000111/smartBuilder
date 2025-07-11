"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Home, RefreshCcwIcon } from "lucide-react";
import { cookies, headers } from "next/headers";
import CategoryGrid from "./CategoryGrid";
import axios from "axios"
import { domain } from "@/api/auth";

interface Work {
  id: number;
  title: string;
  img1: string;
  img2: string;
  workCategory: number;
}


const Hero = () => {
  const [user, setUser] = useState(null);
  const [host, setHost] = useState("");
  useEffect(() => {
    // ✅ Get cookie (only non-HttpOnly cookies)
    const cookieString = document.cookie;
    const cookies = Object.fromEntries(
      cookieString.split("; ").map((cookie) => {
        const [key, value] = cookie.split("=");
        return [key, decodeURIComponent(value)];
      }),
    );

    if (cookies.user) {
      try {
        console.log("cookie => ", cookies)
        const parsedUser = JSON.parse(cookies.user);
        setUser(parsedUser);
        console.log("user-------------->", parsedUser);
      } catch (err) {
        console.error("Invalid user cookie:", err);
      }
    }

    // ✅ Get host
    setHost(window.location.host);
    console.log("host--------------->", window.location.host);
  }, []);

  const [showHeader, setShowHeader] = useState(true);

  const handleCategorySelect = () => {
    setShowHeader(false);
  };

  const handleBack = () => {
    setShowHeader(true);
  };

  const worksCategory = [
    {
      id: 1,
      title: "1. Post Frame Various Styles",
      img1: "https://postframesolver.blob.core.windows.net/job-images/1--1-iso-default-1.png",
      img2: "https://postframesolver.blob.core.windows.net/job-images/1--1-iso-default-2.png",
    },
    // {
    //   id: 2,
    //   title: "2. Garages and Sheds",
    //   img1: "https://postframesolver.blob.core.windows.net/job-images/1--9116-iso-default-1.png",
    //   img2: "https://postframesolver.blob.core.windows.net/job-images/1--9116-iso-default-2.png",
    // },
    // {
    //   id: 3,
    //   title: "3. Barndominiums",
    //   img1: "https://postframesolver.blob.core.windows.net/job-images/1--104446-iso-default-1.png",
    //   img2: "https://postframesolver.blob.core.windows.net/job-images/1--104446-iso-default-2.png",
    // },
    // {
    //   id: 4,
    //   title: "4. Agricultural",
    //   img1: "https://postframesolver.blob.core.windows.net/job-images/1--18518-iso-default-1.png",
    //   img2: "https://postframesolver.blob.core.windows.net/job-images/1--18518-iso-default-2.png",
    // },
    // {
    //   id: 5,
    //   title: "5. StudFrame Various Styles",
    //   img1: "https://postframesolver.blob.core.windows.net/job-images/1--18556-iso-default-1.png",
    //   img2: "https://postframesolver.blob.core.windows.net/job-images/1--18556-iso-default-2.png",
    // },
  ];

  const _works = [{
    id: 1,
    title: "4' OC Trusses - 8'OC Posts",
    img1: "https://postframesolver.blob.core.windows.net/job-images/1--1-iso-default-1.png",
    img2: "https://postframesolver.blob.core.windows.net/job-images/1--1-iso-default-2.png",
    workCategory: 1,
  }]

  const [works, setWorks] = useState<Work[]>(_works)

  const getDesignBuilders = async () => {
    const response = await axios.get(`${domain}/api/v1/build/getAll?email=${user}`)
    console.log(response.data)
    let newWorks = []
    response.data.map(item => {

      const base64Image = item.build.image; // just the base64 part
      const modifiedBase64Image = base64Image.replace(/ /g, "+");
      newWorks.push({
        id: 1,
        title: item.build.userData.notes,
        img1: modifiedBase64Image,
        img2: modifiedBase64Image,
        workCategory: 1,
      })
    })
    setWorks(newWorks)
  }

  useEffect(() => {
    if (user == null) return
    getDesignBuilders()
  }, [user])
  return (
    <>
      <section className="relative z-10 overflow-hidden pt-[80px] pb-8 sm:pt-[120px] sm:pb-16 md:pt-[150px]">
        <div className="container px-4 sm:px-6">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-4 text-2xl leading-tight font-bold text-black sm:mb-5 sm:text-3xl sm:leading-tight md:text-5xl md:leading-tight dark:text-white">
                  Welcome to {user?.fullName}!
                </h1>
                <p className="text-body-color dark:text-body-color-dark mb-8 text-sm leading-relaxed sm:mb-12 sm:text-base md:text-xl">
                  Your Designer Tools are ready to use. You can access them
                  directly from your company subdomain. Click the link below to
                  get started with your design projects and explore the features
                  available to you.
                  <br />
                  👉
                  <a
                    href={`https://main.${host}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <u>Visit Your Designer Tools</u>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container px-4 sm:px-6">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-7xl overflow-hidden rounded-lg dark:bg-black">
                <div className="flex w-full items-center justify-end p-2 sm:p-4">
                  <span className="flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-[#4caf60] px-3 py-2 text-xs text-white hover:opacity-80 sm:gap-3 sm:px-4 sm:text-sm">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="pencil-ruler"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-3 sm:w-4"
                    >
                      <path
                        fill="currentColor"
                        d="M109.46 244.04l134.58-134.56-44.12-44.12-61.68 61.68a7.919 7.919 0 0 1-11.21 0l-11.21-11.21c-3.1-3.1-3.1-8.12 0-11.21l61.68-61.68-33.64-33.65C131.47-3.1 111.39-3.1 99 9.29L9.29 99c-12.38 12.39-12.39 32.47 0 44.86l100.17 100.18zm388.47-116.8c18.76-18.76 18.75-49.17 0-67.93l-45.25-45.25c-18.76-18.76-49.18-18.76-67.95 0l-46.02 46.01 113.2 113.2 46.02-46.03zM316.08 82.71l-297 296.96L.32 487.11c-2.53 14.49 10.09 27.11 24.59 24.56l107.45-18.84L429.28 195.9 316.08 82.71zm186.63 285.43l-33.64-33.64-61.68 61.68c-3.1 3.1-8.12 3.1-11.21 0l-11.21-11.21c-3.09-3.1-3.09-8.12 0-11.21l61.68-61.68-44.14-44.14L267.93 402.5l100.21 100.2c12.39 12.39 32.47 12.39 44.86 0l89.71-89.7c12.39-12.39 12.39-32.47 0-44.86z"
                      ></path>
                    </svg>
                    Start from Scratch
                  </span>
                </div>
                {showHeader && (
                  <div className="mt-4 flex w-full flex-col items-start justify-start gap-4 border-b bg-[#f5f5f5] p-[12px] sm:flex-row sm:items-center sm:gap-10">
                    <div className="flex gap-3">
                      <button className="flex cursor-pointer items-center justify-center rounded-sm bg-[#137bc4] p-1">
                        <RefreshCcwIcon className="h-4 w-4 text-white" />
                      </button>
                      <button className="flex cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-[#f7f7f7] p-1">
                        <Home className="h-4 w-4 text-gray-400" />
                      </button>
                      <button className="flex cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-[#f7f7f7] p-1">
                        <ArrowLeft className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                    <button className="flex cursor-pointer items-center justify-center gap-3 rounded-sm bg-[#4caf60] px-2 py-1 text-xs text-white hover:opacity-80 sm:text-sm">
                      Save Default
                    </button>
                  </div>
                )}
                <CategoryGrid
                  categories={worksCategory}
                  works={works}
                  onCategorySelect={handleCategorySelect}
                  onBack={handleBack}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
