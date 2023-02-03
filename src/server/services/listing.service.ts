import { prisma } from "server/db";
import { ListingCreateDto } from "server/dtos/listing-create.dto";
import { UserService } from "server/services/user.service";
import { uniq, map, find } from "lodash";
import { roqClient } from "server/roq";

export class ListingService {
  static async createListing(roqUserId: string, listing: ListingCreateDto) {
    const user = await UserService.findByRoqId(roqUserId);

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.sellerId) {
      throw new Error("User is not a seller");
    }

    return prisma.listing.create({
      data: {
        ...listing,
        sellerId: user.sellerId,
      },
    });
  }

  static async findListings(
    currentUserId: string,
    limit: number = 20,
    offset: number = 0
  ) {
    const listings = await prisma.listing.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const fileIds = uniq(map(listings, "fileId"));

    if (!fileIds.length) {
      return listings;
    }

    const files = await roqClient
      .asUser(currentUserId)
      .files({ filter: { id: { valueIn: fileIds } } });

    return listings.map((l) => ({
      ...l,
      fileUrl: find(files?.files?.data, { id: l.fileId })?.url,
    }));
  }
}
