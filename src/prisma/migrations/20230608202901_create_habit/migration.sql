/*
  Warnings:

  - You are about to drop the column `frequency` on the `Task` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Habit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "frequency" TEXT NOT NULL DEFAULT 'WEEKLY',
    "originTaskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "completedDate" DATETIME,
    "description" TEXT,
    "dueDate" DATETIME,
    "habitId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NOT_STARTED',
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Task_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("completedDate", "description", "dueDate", "id", "status", "title", "userId") SELECT "completedDate", "description", "dueDate", "id", "status", "title", "userId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
