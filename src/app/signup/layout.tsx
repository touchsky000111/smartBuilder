import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Page | My Designer Plus",
  description: "This is Sign Up Page for My Designer Plus",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 