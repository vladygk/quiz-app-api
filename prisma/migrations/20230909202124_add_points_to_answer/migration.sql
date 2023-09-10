/*
  Warnings:

  - You are about to drop the column `isCorrect` on the `answers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "answers" DROP COLUMN "isCorrect",
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;
