/*
  Warnings:

  - You are about to drop the column `username` on the `CookProfile` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `Cook` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `CookProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `CookProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CookProfile" DROP CONSTRAINT "CookProfile_username_fkey";

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_cookedBy_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_username_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_cookedBy_fkey";

-- DropIndex
DROP INDEX "CookProfile_username_key";

-- AlterTable
ALTER TABLE "CookProfile" DROP COLUMN "username",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "username",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "dateStart" SET DEFAULT now() + interval '1 day';

-- DropTable
DROP TABLE "Cook";

-- CreateIndex
CREATE UNIQUE INDEX "CookProfile_userId_key" ON "CookProfile"("userId");

-- AddForeignKey
ALTER TABLE "CookProfile" ADD CONSTRAINT "CookProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_cookedBy_fkey" FOREIGN KEY ("cookedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_cookedBy_fkey" FOREIGN KEY ("cookedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
