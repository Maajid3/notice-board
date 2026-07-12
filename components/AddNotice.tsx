import NoticeForm from "@/components/NoticeForm";
import { useRouter } from "next/router";

export default function AddNotice() {
  const router = useRouter();

  return (
    <div className="flex w-full h-full flex-col items-center justify-center p-2">
      <div className="w-full max-w-lg rounded-2xl border border-white/15 p-6 backdrop-blur-md">
        <h2 className="mb-6 text-3xl font-semibold">Add Notice</h2>
        <NoticeForm
          endpoint="/api/notices"
          method="POST"
          submitLabel="Add Notice"
          onSuccess={() =>
            router.push({
              pathname: "/",
              query: { updated: String(Date.now()) },
            })
          }
        />
      </div>
    </div>
  );
}
