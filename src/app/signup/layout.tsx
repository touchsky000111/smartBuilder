import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Page | CEED CIVIL Engineering",
  description: "This is Sign Up Page for Ceed Civil Engineering",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 