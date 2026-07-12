import Image from "next/image";
import Link from "next/link";
import { Undo2Icon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col gap-6 items-center justify-center p-8">
      <Image
        src="/not-found.svg"
        alt="Page Not Found"
        width={400}
        height={400}
      />
      <Link
        href="/"
        className="text-blue-400 text-sm font-semibold tracking-wider flex gap-2 items-center justify-center hover:underline"
      >
        <Undo2Icon size={18} />

        <p>Back to Home</p>
      </Link>
    </div>
  );
}
