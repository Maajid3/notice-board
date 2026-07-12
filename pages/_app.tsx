import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-dvh">
      <Header />
      <main className="flex min-h-[calc(100dvh-60px)] flex-row">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Component {...pageProps} />
        </div>
      </main>
    </div>
  );
}
