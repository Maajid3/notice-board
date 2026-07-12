import Image from "next/image";
import { useRouter } from "next/router";
import { RotateCcw } from "lucide-react";

export default function ServerError() {
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col gap-6 items-center justify-center p-8">
      <Image
        src="/server-error.gif"
        alt="Oops! Server is down"
        width={400}
        height={400}
      />
      <button
        className="flex items-center gap-2 border border-white/20 px-8 py-2  rounded-sm font-semibold text-white/40 hover:text-white hover:border-white/30 cursor-pointer"
        onClick={() => router.reload()}
      >
        <RotateCcw size={18} />
        <p>Reload</p>
      </button>
    </div>
  );
}
