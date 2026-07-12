import Link from "next/link";

export default function Header() {
  return (
    <header className="flex w-full  gap-3 border-b border-white/15 px-4 py-3 sm:h-15 sm:items-center justify-between sm:px-6">
      <h1 className="text-xl font-bold tracking-wider sm:text-2xl">
        <Link href="/">Notice App</Link>
      </h1>
      <button
        onClick={() =>
          alert("Authentication features will be added in a future update.")
        }
        className=" rounded-lg border bg-white px-3 py-2 font-semibold text-black cursor-pointer hover:border-blue-700 focus-within:border-blue-700 sm:w-auto sm:px-2 sm:py-0.5"
      >
        login
      </button>
    </header>
  );
}
