-- CreateTable
CREATE TABLE "CookProfile" (
    "id" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "youtube" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "berke" TEXT NOT NULL,

    CONSTRAINT "CookProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CookProfile_berke_key" ON "CookProfile"("berke");

-- AddForeignKey
ALTER TABLE "CookProfile" ADD CONSTRAINT "CookProfile_berke_fkey" FOREIGN KEY ("berke") REFERENCES "Cook"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
