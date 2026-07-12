import { X } from "lucide-react";
import NoticeForm from "@/components/NoticeForm";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Editpage({
  setEdit,
  noticeId,
  onSaved,
}: {
  setEdit: Dispatch<SetStateAction<boolean>>;
  noticeId: number | null;
  onSaved?: () => void;
}) {
  const url = `/api/notices/${noticeId}`;
  const [isLoading, setIsLoading] = useState(Boolean(noticeId));
  const [loadError, setLoadError] = useState(
    noticeId ? "" : "Invalid notice id",
  );
  const [formInputs, setInputs] = useState({
    title: "",
    body: "",
    category: "General" as "Exam" | "Event" | "General",
    priority: "Normal" as "Normal" | "Urgent",
    publishDate: ""
  });
  const router = useRouter();

  useEffect(() => {
    if (!noticeId) {
      return;
    }

    const handleFetch = async () => {
      try {
        setIsLoading(true);
        setLoadError("");
        const response = await fetch(url);
        if (!response.ok) {
          const responseData = (await response.json().catch(() => null)) as
            | { message?: string }
            | null;
          throw new Error(responseData?.message ?? "Failed to load notice");
        }
        const data = await response.json();

        setInputs({
          title: data.notice.title,
          body: data.notice.body,
          category: data.notice.category,
          priority: data.notice.priority,
          publishDate: new Date(data.notice.publishDate)
            .toISOString()
            .slice(0, 10)
        });
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : "Failed to load notice");
      } finally {
        setIsLoading(false);
      }
    };
    void handleFetch();
  }, [noticeId, url]);

  return (
    <div className="flex max-h-[88dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/15 p-5 backdrop-blur-md sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <h2 className="text-2xl font-semibold sm:text-3xl">Edit Notice</h2>
        <button
          type="button"
          aria-label="Close edit dialog"
          onClick={() => setEdit(false)}
          className="rounded-md p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      {isLoading ? (
        <p className="text-sm text-white/60">Loading notice...</p>
      ) : loadError ? (
        <p className="text-sm text-red-400">{loadError}</p>
      ) : (
        <div className="overflow-y-auto pr-1">
          <NoticeForm
            endpoint={url}
            method="PUT"
            submitLabel="Update Notice"
            initialValues={formInputs}
            onSuccess={() => {
              onSaved?.();
              setEdit(false);
              void router.push({
                pathname: "/",
                query: { updated: String(Date.now()) },
              });
            }}
          />
        </div>
      )}
    </div>
  );
}
