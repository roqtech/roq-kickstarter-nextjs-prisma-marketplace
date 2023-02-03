import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, getServerSession } from "@roq/nextjs";
import { ListingService } from "server/services/listing.service";
import { ListingCreateDto } from "server/dtos/listing-create.dto";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }

  const { title, description, price, fileId } = req.body as ListingCreateDto;
  const session = getServerSession(req, res);

  try {
    const listing = await ListingService.createListing(session.roqUserId, {
      title,
      description,
      price: parseFloat(price as any as string),
      fileId,
    });

    res.status(200).json({ listing });
  } catch (e) {
    res.status(500).json({ error: JSON.stringify(e) });
  }
}

export default function listingHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return withAuth(req, res)(handler);
}
