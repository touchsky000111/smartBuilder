// pages/index.tsx
import JobGrid from "@/components/Job/JobGrid";
import Head from "next/head";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Job = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token"); // 👈 your auth cookie key

  if (!token) {
    redirect("/signin"); // 👈 auto-redirect if not authenticated
  }

  return (
    <div className="w-full flex justify-center items-center bg-white dark:bg-black">
      <div className="w-full max-w-7xl mt-20 bg-white">
        <Head>
          <title>Active Jobs</title>
        </Head>
        <main className="bg-white dark:bg-black p-6">
          <h2 className="text-2xl font-bold mb-4">Active Jobs for johndoe1</h2>
          <JobGrid />
        </main>
      </div>
    </div>
  );
}

export default Job;