const VALID_CATEGORIES = ["Exam", "Event", "General"] as const;
const VALID_PRIORITIES = ["Normal", "Urgent"] as const;

type NoticeCategory = (typeof VALID_CATEGORIES)[number];
type NoticePriority = (typeof VALID_PRIORITIES)[number];

type ParsedNoticeInput =
  | {
      ok: true;
      data: {
        title: string;
        body: string;
        category: NoticeCategory;
        priority: NoticePriority;
        publishDate: Date;
      };
    }
  | {
      ok: false;
      message: string;
    };

function parseDateInput(value: unknown): Date | null {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const parsedDate = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

function isCategory(value: unknown): value is NoticeCategory {
  return (
    typeof value === "string" && VALID_CATEGORIES.includes(value as NoticeCategory)
  );
}

function isPriority(value: unknown): value is NoticePriority {
  return (
    typeof value === "string" && VALID_PRIORITIES.includes(value as NoticePriority)
  );
}

export function parseNoticeInput(input: unknown): ParsedNoticeInput {
  const payload = (input ?? {}) as Record<string, unknown>;

  const title = typeof payload.title === "string" ? payload.title.trim() : "";
  if (!title) {
    return { ok: false, message: "Title is required" };
  }

  const body = typeof payload.body === "string" ? payload.body.trim() : "";
  if (!body) {
    return { ok: false, message: "Body is required" };
  }

  const category = payload.category;
  if (!isCategory(category)) {
    return { ok: false, message: "Invalid category" };
  }

  const priority = payload.priority;
  if (!isPriority(priority)) {
    return { ok: false, message: "Invalid priority" };
  }

  const publishDate = parseDateInput(payload.publishDate);
  if (!publishDate) {
    return { ok: false, message: "Invalid publish date" };
  }

  return {
    ok: true,
    data: {
      title,
      body,
      category,
      priority,
      publishDate
    },
  };
}
