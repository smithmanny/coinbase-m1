/*
  Warnings:

  - A unique constraint covering the columns `[tokenId]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tokenId` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "tokenId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Token.tokenId_unique" ON "Token"("tokenId");
