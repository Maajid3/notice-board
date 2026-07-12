import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NotebookTabsIcon, Pencil, Trash2 } from "lucide-react";
import CnfmDel from "./CnfmDel";
import Editpage from "./Editpage";
import CardsSkeleton from "@/ui/Skeleton";

type noticeDataProp = {
  id: number;
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
  createdAt: string;
};

export default function Cards() {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [delCnf, setDelCnf] = useState<boolean>(false);
  const [noticeData, setNoticeData] = useState<noticeDataProp[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [getId, setId] = useState<number | null>(null);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    const url = "/api/notices";
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Api Response failed!");
      }
      const data = await response.json();
      setNoticeData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchData();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchData, router.query.updated]);

  if (loading) return <CardsSkeleton />;

  return (
    <div className="relative w-full h-full overflow-y-auto px-4 py-4 sm:p-6 scrollbar-thin scrollbar-thumb-white/15">
      <div className="mb-6 flex items-center justify-between gap-3 sm:mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Notice Board</h1>

        <Link
          href="/add-notice"
          className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-gray-200 sm:px-4 sm:py-2 sm:text-base"
        >
          <NotebookTabsIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Add Notice</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 overflow-hidden sm:gap-5 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
        {noticeData?.length === 0 ? (
          <div className="col-span-full flex h-[calc(100dvh-180px)] w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/10 px-6 text-center text-white/30 sm:min-h-[45dvh] sm:flex-row sm:text-2xl">
            <NotebookTabsIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            <p>No Notices</p>
          </div>
        ) : (
          noticeData?.map((notice) => (
            <div
              key={notice.id}
              className="flex min-h-60 flex-col overflow-hidden rounded-xl border border-white/15 p-4 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    notice.priority === "Urgent"
                      ? "bg-red-500/15 text-red-400"
                      : "bg-gray-500/20 text-gray-300"
                  }`}
                >
                  {notice.priority}
                </span>

                <span className="text-xs text-gray-400 sm:text-sm">
                  {new Date(notice.publishDate).toLocaleDateString("en-GB")}
                </span>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="min-w-0 flex-1">
                  <h2 className="mb-2 text-base font-bold sm:text-lg">
                    {notice.title}
                  </h2>

                  <p
                    className="line-clamp-3 overflow-hidden text-sm text-gray-300 wrap-break-word"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                    }}
                  >
                    {notice.body}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <span className="rounded-md bg-blue-500/15 px-2 py-1 text-xs font-medium text-blue-300">
                  {notice.category}
                </span>
              </div>

              <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => (setShowEdit(true), setId(notice.id))}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm transition hover:bg-white/10 cursor-pointer"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => (setDelCnf(true), setId(notice.id))}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {delCnf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
          <CnfmDel noticeId={getId} setDel={setDelCnf} />
        </div>
      )}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
          <Editpage
            noticeId={getId}
            setEdit={setShowEdit}
            onSaved={fetchData}
          />
        </div>
      )}
    </div>
  );
}
