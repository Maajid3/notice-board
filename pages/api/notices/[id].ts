import { prisma } from "@/lib/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseNoticeInput } from "@/lib/noticeValidation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id } = req.query;

    const noticeId = Number(id);

    if (isNaN(noticeId)) {
      return res.status(400).json({
        message: "Invalid notice id",
      });
    }

    if (req.method === "GET") {
      const notice = await prisma.notice.findUnique({
        where: {
          id: noticeId,
        },
      });

      if (!notice) {
        return res.status(404).json({
          message: "Notice not found",
        });
      }

      return res.status(200).json({
        notice,
      });
    }

    if (req.method === "PUT") {
      const parsedInput = parseNoticeInput(req.body);
      if (!parsedInput.ok) {
        return res.status(400).json({
          message: parsedInput.message,
        });
      }

      const existingNotice = await prisma.notice.findUnique({
        where: {
          id: noticeId,
        },
      });

      if (!existingNotice) {
        return res.status(404).json({
          message: "Notice not found",
        });
      }

      const updatedNotice = await prisma.notice.update({
        where: {
          id: noticeId,
        },
        data: parsedInput.data,
      });

      return res.status(200).json({
        message: "Notice updated successfully",
        notice: updatedNotice,
      });
    }

    if (req.method === "DELETE") {
      const existingNotice = await prisma.notice.findUnique({
        where: {
          id: noticeId,
        },
      });

      if (!existingNotice) {
        return res.status(404).json({
          message: "Notice not found",
        });
      }

      await prisma.notice.delete({
        where: {
          id: noticeId,
        },
      });

      return res.status(200).json({
        message: "Notice deleted successfully",
      });
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).json({
      message: "Method not allowed",
    });
  } catch (error) {
    console.error("Notice API Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
