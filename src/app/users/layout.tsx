import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users Page | My Designer Plus",
  description: "This is Users Page for My Designer Plus",
  // other metadata
};
export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
