import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "About Page | My Designer Plus",
  description: "This is About Page for My Designer Plus",
  // other metadata
};

const AboutPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token"); // 👈 your auth cookie key

  if (!token) {
    redirect("/signin"); // 👈 auto-redirect if not authenticated
  }

  
  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description="My Designer Plus focuses on designing, building, and managing infrastructure projects like buildings, roads, bridges, and utilities—helping shape the physical environment in safe, efficient, and sustainable ways."
      />
      <AboutSectionOne />
      {/* <AboutSectionTwo /> */}
    </>
  );
};

export default AboutPage;
