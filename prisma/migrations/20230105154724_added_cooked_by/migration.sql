/*
  Warnings:

  - You are about to drop the column `username` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `SubscriptionMeal` table. All the data in the column will be lost.
  - Added the required column `cookedBy` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cookedBy` to the `SubscriptionMeal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_username_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionMeal" DROP CONSTRAINT "SubscriptionMeal_username_fkey";

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "username",
ADD COLUMN     "cookedBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubscriptionMeal" DROP COLUMN "username",
ADD COLUMN     "cookedBy" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_cookedBy_fkey" FOREIGN KEY ("cookedBy") REFERENCES "Cook"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionMeal" ADD CONSTRAINT "SubscriptionMeal_cookedBy_fkey" FOREIGN KEY ("cookedBy") REFERENCES "Cook"("username") ON DELETE CASCADE ON UPDATE CASCADE;
