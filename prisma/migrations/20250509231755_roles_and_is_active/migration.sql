-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActibe" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "roles" TEXT[] DEFAULT ARRAY['user']::TEXT[];
