/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Cook` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Cook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cook" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cookId" TEXT NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cook_username_key" ON "Cook"("username");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_cookId_fkey" FOREIGN KEY ("cookId") REFERENCES "Cook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
