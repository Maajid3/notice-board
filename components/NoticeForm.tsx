import { Loader } from "lucide-react";
import { useMemo, useState } from "react";

type NoticeFormValues = {
  title: string;
  body: string;
  category: "Exam" | "Event" | "General";
  priority: "Normal" | "Urgent";
  publishDate: string;
};

type NoticeFormProps = {
  endpoint: string;
  method: "POST" | "PUT";
  submitLabel: string;
  initialValues?: Partial<NoticeFormValues>;
  onSuccess: () => void;
};

const DEFAULT_VALUES: NoticeFormValues = {
  title: "",
  body: "",
  category: "General",
  priority: "Normal",
  publishDate: "",
};

export default function NoticeForm({
  endpoint,
  method,
  submitLabel,
  initialValues,
  onSuccess,
}: NoticeFormProps) {
  const [values, setValues] = useState<NoticeFormValues>({
    ...DEFAULT_VALUES,
    ...initialValues,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isInvalid = useMemo(() => {
    return (
      !values.title.trim() ||
      !values.body.trim() ||
      !values.category ||
      !values.priority ||
      !values.publishDate
    );
  }, [values]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    if (isInvalid) {
      setSubmitError("Please fill all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          body: values.body,
          category: values.category,
          priority: values.priority,
          publishDate: values.publishDate,
        }),
      });

      if (!response.ok) {
        const responseData = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(responseData?.message ?? "Failed to save notice");
      }

      onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
        return;
      }
      setSubmitError("Failed to save notice");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm text-white/70">
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={values.title}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Notice title"
          className="w-full rounded-md border border-white/20 bg-white/3 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="body" className="text-sm text-white/70">
          Body *
        </label>
        <textarea
          id="body"
          rows={4}
          value={values.body}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, body: e.target.value }))
          }
          placeholder="Notice details"
          className="w-full resize-none rounded-md border border-white/20 bg-white/3 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-sm text-white/70">
            Category *
          </label>
          <select
            id="category"
            value={values.category}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                category: e.target.value as NoticeFormValues["category"],
              }))
            }
            className="w-full rounded-md border border-white/20 bg-zinc-900 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
          >
            <option value="Exam">Exam</option>
            <option value="Event">Event</option>
            <option value="General">General</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="priority" className="text-sm text-white/70">
            Priority *
          </label>
          <select
            id="priority"
            value={values.priority}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                priority: e.target.value as NoticeFormValues["priority"],
              }))
            }
            className="w-full rounded-md border border-white/20 bg-zinc-900 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
          >
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="publishDate" className="text-sm text-white/70">
            Publish Date *
          </label>
          <input
            id="publishDate"
            type="date"
            value={values.publishDate}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, publishDate: e.target.value }))
            }
            className="w-full rounded-md border border-white/20 bg-white/15 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || isInvalid}
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 cursor-pointer
        disabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:text-white/40"
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <Loader className="h-4 w-4 animate-spin" />
            Saving...
          </span>
        ) : (
          submitLabel
        )}
      </button>

      {submitError && <p className="text-sm text-red-400">{submitError}</p>}
    </form>
  );
}
