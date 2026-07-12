export default function CardsSkeleton() {
  return (
    <div className="relative w-full max-h-[calc(100dvh-60px)] animate-pulse px-4 py-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-3 sm:mb-8">
        <h1 className="bg-white/5 py-4 sm:py-6 px-15 sm:px-25 rounded-2xl"></h1>
        <span className="bg-white/5 py-4 sm:py-6 px-15 sm:px-25 rounded-2xl"></span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="flex min-h-60 flex-col rounded-xl border border-white/15 p-4 backdrop-blur-sm overflow-hidden"
          >
            <span className="bg-linear-to-r via-white/80 from-transparent absolute inset-0 animate-slide-r rotate-45 w-[300%] h-[400%]"></span>
            <div className="mb-4 flex items-center justify-between gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="rounded-full px-10 py-2 text-xs font-semibold bg-white/5"></span>

              <span className="text-xs text-gray-400 sm:text-sm px-10 py-2 bg-white/5 rounded-2xl"></span>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="px-28 py-4 text-base font-bold sm:text-lg bg-white/5 rounded-2xl"></h2>
              <p className="px-25 py-6 w-full bg-white/5 rounded-2xl"></p>
            </div>

            <div className="mt-4">
              <span className="rounded-2xl bg-white/5 px-10 py-0.5"></span>
            </div>

            <div className="flex  items-center justify-center gap-2 pt-4">
              <button
                type="button"
                className="rounded-lg px-25 py-5 bg-white/5"
              ></button>
              <button
                type="button"
                className="rounded-lg px-25 py-5 bg-white/5"
              ></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
