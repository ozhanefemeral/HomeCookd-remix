/*
  Warnings:

  - You are about to drop the column `reserveCount` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "reserveCount",
ALTER COLUMN "dateStart" SET DEFAULT now() + interval '1 day';
