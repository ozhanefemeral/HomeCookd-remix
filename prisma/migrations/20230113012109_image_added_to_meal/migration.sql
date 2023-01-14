/*
  Warnings:

  - Added the required column `image` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "image" TEXT NOT NULL;
