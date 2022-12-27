/*
  Warnings:

  - Added the required column `deliveryDay` to the `SubscriptionMeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryHour` to the `SubscriptionMeal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeliveryDay" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "SubscriptionMeal" ADD COLUMN     "deliveredAt" TIMESTAMP(3),
ADD COLUMN     "deliveryDay" "DeliveryDay" NOT NULL,
ADD COLUMN     "deliveryHour" TEXT NOT NULL;
