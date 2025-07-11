"use client";

import { SignUp } from "@/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [comments, setComments] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const [userAvatar, setUserAvatar] = useState<Blob | null>(null);

  useEffect(() => {
    if (userAvatar) {
      console.log("useAvatar changed:", userAvatar);

      // const formData = new FormData();
      // formData.append("user_avatar", userAvatar, "avatar.png");
    }
  }, [userAvatar]);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      const response = await SignUp({
        email,
        password,
        passwordConfirmation: confirmPassword,
        fullName,
        userAvatar,
        userName: username,
        phoneNumber,
        companyName,
        companyLogo,
        role,
        comments,
      });
      console.log(response.data);
      setSuccess(true);
    } catch (error: any) {
      console.error("SignUp API Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Signup failed.");
    } finally {
      setIsLoading(false);
      router.push("/signin");
    }
  };

  return (
    <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full max-w-[700px] px-4">
            <div className="shadow-three dark:bg-dark mx-auto rounded-sm bg-white px-6 py-10 sm:p-[30px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black sm:text-3xl dark:text-white">
                Welcome to CEED CIVIL!
              </h3>

              {success && (
                <div className="mb-4 rounded border border-green-500 bg-green-100 p-3 text-green-700">
                  Registration successful!
                </div>
              )}

              {error && (
                <div className="mb-4 rounded border border-red-500 bg-red-100 p-3 text-red-700">
                  {error}
                </div>
              )}

              <p className="text-bg-color-dark font-san mb-11 text-center text-base text-[16px] dark:text-white">
                Sign up here for your free trial of Ceed Civil. If you have
                questions or comments, join the discussion at&nbsp;
                <Link
                  href="http://support.ceedcivilsystems.com"
                  target="_blank"
                  className="text-[#428bca]"
                >
                  support.ceedcivilsystems.com
                </Link>
                , Email:&nbsp;
                <Link
                  href="mailto:support@keymark.com"
                  target="_blank"
                  className="text-[#428bca]"
                >
                  support@keymark.com
                </Link>
                , Support Service:&nbsp;
                <Link
                  href="tel:(720) 622-2135"
                  target="_blank"
                  className="text-[#428bca]"
                >
                  (720) 622-2135
                </Link>
              </p>

              <p className="mb-[10px] px-[20px] text-[20px]">
                <small>
                  {/* If you're a returning user, click&nbsp; */}
                  If you&apos;re a returning user, click&nbsp;
                  <Link href="/signin" className="text-[#428bca]">
                    here
                  </Link>
                  &nbsp;to log in.
                </small>
              </p>

              <div className="-mx-4 mb-8 flex flex-wrap items-center justify-between font-sans">
                {/* Full Name */}
                <div className="mb-[22px] w-full px-[15px] md:w-1/2">
                  <label
                    htmlFor="fullName"
                    className="text-dark mb-3 block text-sm dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                  />
                </div>

                {/* Email */}
                <div className="mb-[22px] w-full px-[15px] md:w-1/2">
                  <label
                    htmlFor="email"
                    className="text-dark mb-3 block text-sm dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                  />
                </div>

                {/* Username */}
                <div className="mb-[22px] w-full px-[15px] md:w-1/2">
                  <label
                    htmlFor="username"
                    className="text-dark mb-3 block text-sm dark:text-white"
                  >
                    User Name
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your user name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                  />
                </div>

                {/* User Avatar */}
                <div className="mb-[22px] w-full px-[15px] md:w-1/2">
                  <label
                    htmlFor="userAvatar"
                    className="text-dark mb-3 block text-sm dark:text-white"
                  >
                    User Avatar
                  </label>
                  <input
                    id="userAvatar"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUserAvatar(e.target.files?.[0] ?? null)}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                  />
                </div>

                {/* Company Name */}
                <div className="mb-[22px] w-full px-[15px] md:w-1/2">
                  <label
                    htmlFor="companyName"
                    className="text-dark mb-3 block text-sm dark:text-white"
                  >
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    placeholder="Enter your company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                  />
                </div>

                {/* Company Logo */}
                <div className="mb-[22px] w-full px-[15px] md:w-1/2">
                  <label
                    htmlFor="companyLogo"
                    className="text-dark mb-3 block text-sm dark:text-white"
                  >
                    Company Logo
                  </label>
                  <input
                    id="companyLogo"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setCompanyLogo(e.target.files?.[0] ?? null)
                    }
                    className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                  />
                </div>

                {/* Phone Number */}
                <div className="mb-[22px] w-full px-[15px] md:w-1/2">
                  <label
                    htmlFor="phoneNumber"
                    className="text-dark mb-3 block text-sm dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                  />
                </div>

                {/* Role */}
                <div className="mb-[22px] w-full px-[15px] md:w-1/2">
                  <label
                    htmlFor="role"
                    className="text-dark mb-3 block text-sm dark:text-white"
                  >
                    Role{" "}
                  </label>
                  <select
                    name="UserType"
                    id="UserType"
                    className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    data-val="true"
                    data-val-length="The field Role must be a string with a maximum length of 256."
                    data-val-length-max="256"
                    data-val-required="The Role field is required."
                    required
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">(Select One)</option>
                    <option value="DIY/Homeowner">DIY/Homeowner</option>
                    <option value="Builder/Contractor">
                      Builder/Contractor
                    </option>
                    <option value="Designer at Material Supplier">
                      Designer at Material Supplier
                    </option>
                    <option value="Manager at Material Supplier">
                      Manager at Material Supplier
                    </option>
                    <option value="Student/College">Student/College</option>
                    <option value="Marketing/Consulting">
                      Marketing/Consulting
                    </option>
                    <option value="Other">Other</option>
                  </select>
                  {error && role === "" && (
                    <label
                      htmlFor="role"
                      className="mb-3 block text-sm text-red-500 dark:text-white"
                    >
                      Please fill Role
                    </label>
                  )}
                </div>

                {/* Password */}
                <div className="mb-[22px] w-full px-[15px] md:w-1/2">
                  <label
                    htmlFor="password"
                    className="text-dark mb-3 block text-sm dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-[22px] w-full px-[15px] md:w-1/2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-dark mb-3 block text-sm dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                  />
                </div>

                {/* Comments */}
                <div className="mb-[22px] w-full px-[15px]">
                  <label
                    htmlFor="comments"
                    className="text-dark mb-3 block text-sm dark:text-white"
                  >
                    Comments
                  </label>
                  <textarea
                    id="comments"
                    placeholder="Any comments or questions"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                    rows={4}
                  />
                </div>
              </div>

              <div className="mb-6">
                <button
                  type="button"
                  onClick={handleSignup}
                  disabled={isLoading}
                  className={`btn bg-primary hover:bg-primary-dark rounded-md px-8 py-3 text-base font-semibold text-white transition duration-300 ease-in-out disabled:opacity-50`}
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
