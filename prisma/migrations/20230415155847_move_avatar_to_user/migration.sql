/*
  Warnings:

  - You are about to drop the column `avatar` on the `CookProfile` table. All the data in the column will be lost.
  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CookProfile" DROP COLUMN "avatar";

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "dateStart" SET DEFAULT now() + interval '1 day';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT NOT NULL;
