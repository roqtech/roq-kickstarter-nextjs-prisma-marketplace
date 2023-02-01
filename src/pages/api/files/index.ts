import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, getServerSession } from "@roq/nextjs";
import { FileService } from "server/services/file.service";
import { FileCategories } from "server/enums";
import { FilesQueryDto } from "server/dtos/files-query.dto";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }

  const { limit, offset } = req.query as FilesQueryDto;
  console.log({ limit, offset });
  const session = getServerSession(req, res);

  const filesResult = await FileService.getFiles(
    session.roqUserId,
    FileCategories.userFiles,
    limit,
    offset
  );

  res.status(200).json(filesResult);
}

export default function (req: NextApiRequest, res: NextApiResponse) {
  return withAuth(req, res)(handler);
}