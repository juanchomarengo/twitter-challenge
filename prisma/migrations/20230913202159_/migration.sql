/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId,actionType]` on the table `PostInteractions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PostInteractions_userId_postId_key";

-- CreateIndex
CREATE UNIQUE INDEX "PostInteractions_userId_postId_actionType_key" ON "PostInteractions"("userId", "postId", "actionType");
