/*
  Warnings:

  - You are about to drop the column `cookId` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `cookId` to the `SubscriptionMeal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_cookId_fkey";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "cookId";

-- AlterTable
ALTER TABLE "SubscriptionMeal" ADD COLUMN     "cookId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SubscriptionMeal" ADD CONSTRAINT "SubscriptionMeal_cookId_fkey" FOREIGN KEY ("cookId") REFERENCES "Cook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
