-- DropForeignKey
ALTER TABLE "CookProfile" DROP CONSTRAINT "CookProfile_username_fkey";

-- AddForeignKey
ALTER TABLE "CookProfile" ADD CONSTRAINT "CookProfile_username_fkey" FOREIGN KEY ("username") REFERENCES "Cook"("username") ON DELETE CASCADE ON UPDATE CASCADE;
