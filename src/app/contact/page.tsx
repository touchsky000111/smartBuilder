import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Contact Page | CEED CIVIL Engineering",
  description: "This is Contact Page for Ceed Civil Engineering",
  // other metadata
};

const ContactPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token"); // 👈 your auth cookie key

  if (!token) {
    redirect("/signin"); // 👈 auto-redirect if not authenticated
  }
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="Have questions about our services or want to discuss your next civil engineering project?
At Ceed Civil Engineering, we’re here to help you build smarter, safer, and more efficiently."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
