/*
  Warnings:

  - Added the required column `catchphrase` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "catchphrase" TEXT NOT NULL,
ALTER COLUMN "dateStart" SET DEFAULT now() + interval '1 day';

-- CreateTable
CREATE TABLE "MealNutrition" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "ingredients" TEXT[],
    "calories" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "carbs" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mealId" TEXT NOT NULL,

    CONSTRAINT "MealNutrition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MealNutrition" ADD CONSTRAINT "MealNutrition_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
