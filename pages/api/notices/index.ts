import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prismaClient";
import { parseNoticeInput } from "@/lib/noticeValidation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "GET") {
      const notices = await prisma.notice.findMany({
        orderBy: [
          {
            priority: "desc",
          },
          {
            publishDate: "desc",
          },
        ],
      });
      return res.status(200).json(notices);
    }

    if (req.method === "POST") {
      const parsedInput = parseNoticeInput(req.body);
      if (!parsedInput.ok) {
        return res.status(400).json({
          message: parsedInput.message,
        });
      }

      const notice = await prisma.notice.create({
        data: parsedInput.data,
      });

      return res.status(201).json({
        message: "Notice created successfully",
        notice,
      });
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({
      message: "Method not allowed",
    });
  } catch (error) {
    console.error("Notices API Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
