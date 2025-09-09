"use client";

import { Provider } from "react-redux";
import { store } from "@/src/store";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeApplier from "@/src/helper/ThemeApplier";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = Cookies.get("token") || null;
    setToken(t);

    if (t) {
      if (pathname === "/") router.push("/admin");
      else if (!pathname.startsWith("/admin")) router.push("/admin");
    } else {
      if (pathname.startsWith("/admin")) router.push("/"); 
    }
  }, [pathname, router]);

  const showLayout = !token; 

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeApplier />
        {showLayout ? (
          <>
            <header>
              <Header />
            </header>
            <main>{children}</main>
            <footer>
              <Footer />
            </footer>
          </>
        ) : (children )}
      </QueryClientProvider>
    </Provider>
  );
}
