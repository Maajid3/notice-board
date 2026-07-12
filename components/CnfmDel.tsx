import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";

export default function CnfmDel({
  setDel,
  noticeId,
}: {
  setDel: Dispatch<SetStateAction<boolean>>;
  noticeId: number | null;
}) {
  const url = `/api/notices/${noticeId}`;
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isErr, setErr] = useState("");

  const handleDel = async () => {
    setErr("");
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete notice");
      }
      router.push({
        pathname: "/",
        query: { updated: String(Date.now()) },
      });
      setDel(false);
    } catch (error) {
      setErr("Failed to delete notice. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 flex flex-col justify-center items-center gap-2 border border-white/20 px-10 py-8 rounded-2xl">
      <p className="text-2xl font-semibold">Are you sure you?</p>
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => setDel(false)}
          className="bg-blue-600/40 w-20 py-1 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDel}
          className="bg-red-600/20 text-red-300 w-20 py-1 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading}
        >
          {isLoading ? "..." : "Ok"}
        </button>
      </div>
      {isErr && <p className="mt-2 text-sm text-red-300">{isErr}</p>}
    </div>
  );
}
