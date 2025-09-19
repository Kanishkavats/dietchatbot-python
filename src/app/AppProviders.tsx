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
import Loader from "../components/common/Loader";
import { Toaster } from "react-hot-toast";
import CustomCursor from "../components/CustomCursor/CustomCursor";
// import CustomCursor from "../../components/CustomCursor"

export default function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = useState<string | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [loading, setLoading] = useState(false);

  // 🔹 Check auth & redirect
  useEffect(() => {
    const t = Cookies.get("token") || null;
    setToken(t);

    if (t) {
      if (pathname === "/") router.replace("/admin");
      else if (!pathname.startsWith("/admin")) router.replace("/admin");
    } else {
      if (pathname.startsWith("/admin")) router.replace("/");
    }

    setAuthChecking(false); 
  }, [pathname, router]);

  // 🔹 Show loader on route change
  useEffect(() => {
    if (!authChecking) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(timer);
    }
  }, [pathname, authChecking]);

  const showLayout = !token;
  const noHeaderFooterRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

  const hideHeaderFooter = noHeaderFooterRoutes.includes(pathname);

  if (authChecking) {
    return <Loader />;
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeApplier />
        {loading ? <Loader /> :<>
          {showLayout ? (
            <>
              {!hideHeaderFooter && (
                <header>
                  <Header />
                </header>
              )}
              <main>{children}</main>
              {!hideHeaderFooter && (
                <footer>
                  <Footer />
                </footer>
              )}
            </>
          ) : (
            children
          )}
        </>
        }
        <CustomCursor />
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </QueryClientProvider>
    </Provider>
  );
}
