-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('CREATE', 'COMMENT');

-- CreateEnum
CREATE TYPE "PostInteractionType" AS ENUM ('LIKE', 'COMMENT', 'RETWEET', 'CREATE');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "interactionResume" JSONB NOT NULL DEFAULT '{"likes":0,"comments":0,"retweets":0}',
ADD COLUMN     "type" "PostType" NOT NULL DEFAULT 'CREATE';

-- CreateTable
CREATE TABLE "PostInteractions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "postId" UUID NOT NULL,
    "actionType" "PostInteractionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PostInteractions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostInteractions_userId_postId_key" ON "PostInteractions"("userId", "postId");

-- AddForeignKey
ALTER TABLE "PostInteractions" ADD CONSTRAINT "PostInteractions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostInteractions" ADD CONSTRAINT "PostInteractions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
