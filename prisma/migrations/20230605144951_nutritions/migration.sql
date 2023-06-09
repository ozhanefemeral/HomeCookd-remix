/*
  Warnings:

  - A unique constraint covering the columns `[mealId]` on the table `MealNutrition` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "dateStart" SET DEFAULT now() + interval '1 day',
ALTER COLUMN "catchphrase" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MealNutrition_mealId_key" ON "MealNutrition"("mealId");
