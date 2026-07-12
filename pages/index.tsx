import NoticeCard from "@/ui/NoticeCard";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export async function getServerSideProps() {
//   throw new Error("Test 500");
// }

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex w-full min-h-[calc(100dvh-60px)] bg-zinc-50 font-sans dark:bg-black`}
    >
      <NoticeCard />
    </div>
  );
}
