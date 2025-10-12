-- CreateTable
CREATE TABLE "karya" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dibuatOleh" TEXT NOT NULL,

    CONSTRAINT "karya_pkey" PRIMARY KEY ("id")
);
