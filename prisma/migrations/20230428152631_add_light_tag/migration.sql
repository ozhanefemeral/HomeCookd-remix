-- AlterEnum
ALTER TYPE "MealTags" ADD VALUE 'LIGHT';

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "dateStart" SET DEFAULT now() + interval '1 day';
