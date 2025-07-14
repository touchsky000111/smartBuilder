"use client";

import Link from "next/link";

import { SignIn } from "@/api/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import { domain } from "@/api/auth";
const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async () => {
    try {
      setLoading(true);
      
      const response = await axios.post(`${domain}/api/v1/auth/register`, {
        email: email,
        password: password
      })
      
      console.log("here------------>", response.data);
      

    } catch (error) {
      setLoading(false);
      alert(error);
    }
    setLoading(false);
  };
  return (
    <>
      <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three dark:bg-dark mx-auto max-w-[500px] rounded-sm bg-white px-6 py-10 font-[sans-serif] sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black sm:text-3xl dark:text-white">
                  Create User
                </h3>
                <form>
                  <div className="mb-8">
                    <label
                      htmlFor="emailorUsername"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      Username or Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your Password"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-6 flex justify-center">
                    <button
                      className="shadow-submit dark:shadow-submit-dark bg-primary hover:bg-primary/90 flex items-center justify-center rounded-sm px-9 py-4 text-base font-medium text-white duration-300"
                      onClick={handleCreateUser}
                      disabled={loading}
                    >
                      Create User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
