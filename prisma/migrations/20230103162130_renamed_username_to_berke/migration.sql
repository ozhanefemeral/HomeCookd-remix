/*
  Warnings:

  - You are about to drop the column `owner` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `SubscriptionMeal` table. All the data in the column will be lost.
  - Added the required column `berke` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `berke` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `berke` to the `SubscriptionMeal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_owner_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_owner_fkey";

-- DropForeignKey
ALTER TABLE "SubscriptionMeal" DROP CONSTRAINT "SubscriptionMeal_owner_fkey";

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "owner",
ADD COLUMN     "berke" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "owner",
ADD COLUMN     "berke" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubscriptionMeal" DROP COLUMN "owner",
ADD COLUMN     "berke" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_berke_fkey" FOREIGN KEY ("berke") REFERENCES "Cook"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionMeal" ADD CONSTRAINT "SubscriptionMeal_berke_fkey" FOREIGN KEY ("berke") REFERENCES "Cook"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_berke_fkey" FOREIGN KEY ("berke") REFERENCES "Cook"("username") ON DELETE CASCADE ON UPDATE CASCADE;
