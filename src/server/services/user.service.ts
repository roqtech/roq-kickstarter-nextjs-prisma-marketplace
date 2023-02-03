import { prisma } from "server/db";
import { NotificationTypes } from "server/enums";
import { roqClient } from "server/roq";

export class UserService {
  static async findByRoqId(roqUserId: string) {
    return prisma.user.findFirst({ where: { roqUserId } });
  }

  static async syncUserAsSeller(roqUserId: string, tenantId: string) {
    const seller = await prisma.seller.upsert({
      where: { roqTenantId: tenantId },
      update: { roqTenantId: tenantId },
      create: { roqTenantId: tenantId },
    });

    const user = await prisma.user.upsert({
      where: { roqUserId },
      update: { sellerId: seller.roqTenantId },
      create: { roqUserId, sellerId: seller.id },
    });

    return user;
  }

  static async welcomeUser(userId: string) {
    roqClient.asSuperAdmin().notify({
      notification: {
        key: NotificationTypes.welcome,
        recipients: { userIds: [userId] },
      },
    });
  }
}
