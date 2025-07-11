import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In Page | CEED CIVIL Engineering",
  description: "This is Sign In Page for Ceed Civil Engineering",
  // other metadata
};
export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
