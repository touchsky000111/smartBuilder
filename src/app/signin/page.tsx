"use client";

import Link from "next/link";

import { SignIn } from "@/api/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function setCookie(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie =
      name +
      "=" +
      encodeURIComponent(value) +
      "; expires=" +
      expires +
      "; path=/";
  }

  const handleLogin = async () => {
    try {
      setLoading(true);
      console.log("here------------>");
      const response = await SignIn({
        email,
        password,
      });

      console.log("response----------------->", response);

      if (response.success) {
        // 🧠 Call your real auth service here
        document.cookie = `token=${response.token}; max-age=${response.expires_in}; path=/; secure=${process.env.NODE_ENV === "production" ? "true" : "false"}; SameSite=Strict`;
        setCookie("user", JSON.stringify(response.user), 7); // expires in 7 days

        // ✅ Redirect to dashboard or home
        router.push("/"); // change route as needed
      } else {
        alert(response.message);
      }
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
                  Log in
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
                  <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                    <div className="mb-4 sm:mb-0">
                      <label
                        htmlFor="checkboxLabel"
                        className="text-body-color flex cursor-pointer items-center text-sm font-medium select-none"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="checkboxLabel"
                            className="sr-only"
                          />
                          <div className="box border-body-color/20 mr-4 flex h-5 w-5 items-center justify-center rounded-sm border dark:border-white/10">
                            <span className="opacity-0">
                              <svg
                                width="11"
                                height="8"
                                viewBox="0 0 11 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                  fill="#3056D3"
                                  stroke="#3056D3"
                                  strokeWidth="0.4"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                        Remember me?
                      </label>
                    </div>
                    <div>
                      <Link
                        href="#0"
                        className="text-primary text-sm font-medium hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                  <div className="mb-6 flex justify-center">
                    <button
                      className="shadow-submit dark:shadow-submit-dark bg-primary hover:bg-primary/90 flex items-center justify-center rounded-sm px-9 py-4 text-base font-medium text-white duration-300"
                      onClick={handleLogin}
                      disabled={loading}
                    >
                      Log in
                    </button>
                  </div>
                </form>
                <div className="otherlog-links flex flex-col items-center justify-center">
                  <p className="register-newlink">
                    {/* Don't have an account?{" "} */}
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-[#428bca]">
                      Signup
                    </Link>
                  </p>

                  <p className="forget-link">
                    <Link href="/ForgotPassword" className="text-[#428bca]">
                      Forgot password?
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
