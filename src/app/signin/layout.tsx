import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In Page | My Designer Plus",
  description: "This is Sign In Page for My Designer Plus",
  // other metadata
};
export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
