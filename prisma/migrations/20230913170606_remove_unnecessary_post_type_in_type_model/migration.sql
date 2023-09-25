/*
  Warnings:

  - The values [CREATE] on the enum `PostInteractionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `type` on the `Post` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PostInteractionType_new" AS ENUM ('LIKE', 'COMMENT', 'RETWEET');
ALTER TABLE "PostInteractions" ALTER COLUMN "actionType" TYPE "PostInteractionType_new" USING ("actionType"::text::"PostInteractionType_new");
ALTER TYPE "PostInteractionType" RENAME TO "PostInteractionType_old";
ALTER TYPE "PostInteractionType_new" RENAME TO "PostInteractionType";
DROP TYPE "PostInteractionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "type";

-- DropEnum
DROP TYPE "PostType";
