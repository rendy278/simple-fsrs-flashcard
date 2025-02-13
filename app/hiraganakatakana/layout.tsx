import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hiragana & Katakana",
  description: "Pelajari karakter Hiragana dan Katakana dalam bahasa Jepang.",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="">{children}</div>;
};

export default Layout;
