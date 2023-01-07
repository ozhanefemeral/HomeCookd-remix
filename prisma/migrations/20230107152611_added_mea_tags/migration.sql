-- CreateEnum
CREATE TYPE "MealTags" AS ENUM ('VEGETARIAN', 'GLUTEN_FREE', 'DAIRY_FREE', 'TRENDING', 'NEW', 'BIG_PORTION', 'HIGH_PROTEIN');

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "tags" "MealTags"[];
