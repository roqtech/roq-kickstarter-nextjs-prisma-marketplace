import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, getServerSession } from "@roq/nextjs";
import { ListingService } from "server/services/listing.service";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }

  const session = getServerSession(req, res);

  try {
    const listings = await ListingService.findListings(session.roqUserId);
    res.status(200).json({ listings });
  } catch (e) {
    res.status(500).json({ error: e });
  }
}

export default function listingsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return withAuth(req, res)(handler);
}
