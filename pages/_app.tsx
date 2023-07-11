import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  DehydratedState,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { IdentityProvider } from "../utils/useIdentity";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1 * 60 * 60 * 1000,
          cacheTime: 5 * 60 * 60 * 1000,
          refetchOnWindowFocus: false,
        },
      },
    })
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <IdentityProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </IdentityProvider>
  );
}

export default MyApp;
