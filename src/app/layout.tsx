import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todolist",
  description: "todolist2",
};

export default function HTMLLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased bg-gray-200"}>{children}</body>
    </html>
  );
}
