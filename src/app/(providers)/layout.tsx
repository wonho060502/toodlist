import { AuthProvider } from "@/contexts/auth.context";
import { TanstackQueryProvider } from "@/tanstack/query/client";
import React, { PropsWithChildren } from "react";

function ProvidersLayout({ children }: PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </TanstackQueryProvider>
  );
}

export default ProvidersLayout;
