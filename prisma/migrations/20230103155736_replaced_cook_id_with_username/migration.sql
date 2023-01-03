/*
  Warnings:

  - You are about to drop the column `cookId` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `cookId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `cookId` on the `SubscriptionMeal` table. All the data in the column will be lost.
  - Added the required column `owner` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `SubscriptionMeal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_cookId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_cookId_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionMeal" DROP CONSTRAINT "SubscriptionMeal_cookId_fkey";

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "cookId",
ADD COLUMN     "owner" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "cookId",
ADD COLUMN     "owner" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubscriptionMeal" DROP COLUMN "cookId",
ADD COLUMN     "owner" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Cook"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionMeal" ADD CONSTRAINT "SubscriptionMeal_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Cook"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Cook"("username") ON DELETE CASCADE ON UPDATE CASCADE;
