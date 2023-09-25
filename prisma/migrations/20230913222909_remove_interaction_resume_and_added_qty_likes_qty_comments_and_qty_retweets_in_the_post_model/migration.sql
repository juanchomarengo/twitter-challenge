/*
  Warnings:

  - You are about to drop the column `interactionResume` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "interactionResume",
ADD COLUMN     "qtyComments" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "qtyLikes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "qtyRetweets" INTEGER NOT NULL DEFAULT 0;
