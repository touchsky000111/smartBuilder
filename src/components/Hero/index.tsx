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
  urlLink: string;
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
      urlLink:""
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
    urlLink: ""
  }]

  const [works, setWorks] = useState<Work[]>(_works)

  const getDesignBuilders = async () => {
    const response = await axios.get(`${domain}/api/v1/build/getAll?email=${user}`)
    console.log(response.data)
    let newWorks = []
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    response.data.map(item => {

      const base64Image = item.build.image; // just the base64 part
      const modifiedBase64Image = base64Image.replace(/ /g, "+");

      newWorks.push({
        id: 1,
        title: item.build.userData.notes,
        img1: modifiedBase64Image,
        img2: modifiedBase64Image,
        workCategory: 1,
        urlLink: `${domain}/?id=-${item.build.id}&dt=${formattedDate}`
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
