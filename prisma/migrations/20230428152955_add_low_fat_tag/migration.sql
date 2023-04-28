/*
  Warnings:

  - The values [LIGHT] on the enum `MealTags` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MealTags_new" AS ENUM ('VEGETARIAN', 'GLUTEN_FREE', 'DAIRY_FREE', 'TRENDING', 'NEW', 'BIG_PORTION', 'HIGH_PROTEIN', 'LOW_FAT');
ALTER TABLE "UserProfile" ALTER COLUMN "interests" TYPE "MealTags_new"[] USING ("interests"::text::"MealTags_new"[]);
ALTER TABLE "UserProfile" ALTER COLUMN "dislikes" TYPE "MealTags_new"[] USING ("dislikes"::text::"MealTags_new"[]);
ALTER TABLE "Meal" ALTER COLUMN "tags" TYPE "MealTags_new"[] USING ("tags"::text::"MealTags_new"[]);
ALTER TYPE "MealTags" RENAME TO "MealTags_old";
ALTER TYPE "MealTags_new" RENAME TO "MealTags";
DROP TYPE "MealTags_old";
COMMIT;

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "dateStart" SET DEFAULT now() + interval '1 day';
