/*
  Warnings:

  - You are about to drop the column `endDate` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Event` table. All the data in the column will be lost.
  - Added the required column `date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Made the column `category` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `scripture` to the `Sermon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Sermon` table without a default value. This is not possible if the table is not empty.
  - Made the column `series` on table `Sermon` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "startTime" TEXT,
    "endTime" TEXT,
    "location" TEXT,
    "category" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Event" ("category", "createdAt", "description", "id", "location", "title", "updatedAt") SELECT "category", "createdAt", "description", "id", "location", "title", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE TABLE "new_Sermon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "speaker" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "duration" TEXT,
    "thumbnail" TEXT NOT NULL,
    "scripture" TEXT NOT NULL,
    "videoUrl" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Sermon" ("createdAt", "date", "description", "id", "series", "speaker", "title", "updatedAt", "videoUrl") SELECT "createdAt", "date", "description", "id", "series", "speaker", "title", "updatedAt", "videoUrl" FROM "Sermon";
DROP TABLE "Sermon";
ALTER TABLE "new_Sermon" RENAME TO "Sermon";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
