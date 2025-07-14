import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users Page | CEED CIVIL Engineering",
  description: "This is Users Page for Ceed Civil Engineering",
  // other metadata
};
export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
