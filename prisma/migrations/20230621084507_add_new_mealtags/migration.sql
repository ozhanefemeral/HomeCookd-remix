-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "MealTags" ADD VALUE 'SEA_FOOD';
ALTER TYPE "MealTags" ADD VALUE 'COMFORT_FOOD';
ALTER TYPE "MealTags" ADD VALUE 'MIDDLE_EASTERN';
ALTER TYPE "MealTags" ADD VALUE 'ITALIAN';
ALTER TYPE "MealTags" ADD VALUE 'COLD';

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "dateStart" SET DEFAULT now() + interval '1 day';
