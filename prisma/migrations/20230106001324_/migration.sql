/*
  Warnings:

  - You are about to drop the column `cookedBy` on the `SubscriptionMeal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubscriptionMeal" DROP CONSTRAINT "SubscriptionMeal_cookedBy_fkey";

-- AlterTable
ALTER TABLE "SubscriptionMeal" DROP COLUMN "cookedBy";
