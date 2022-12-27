/*
  Warnings:

  - A unique constraint covering the columns `[cookId]` on the table `Password` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cookId` to the `Password` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Password" ADD COLUMN     "cookId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Password_cookId_key" ON "Password"("cookId");

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_cookId_fkey" FOREIGN KEY ("cookId") REFERENCES "Cook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
