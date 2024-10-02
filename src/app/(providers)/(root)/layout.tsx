import React from "react";
import Header from "./_components/Header/Header";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="bg-red max-w-sm w-full aspect-[9/16]">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default RootLayout;
