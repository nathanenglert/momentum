-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Habit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "frequency" TEXT NOT NULL DEFAULT 'WEEKLY',
    "streak" INTEGER NOT NULL DEFAULT 0,
    "originTaskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Habit" ("frequency", "id", "originTaskId", "userId") SELECT "frequency", "id", "originTaskId", "userId" FROM "Habit";
DROP TABLE "Habit";
ALTER TABLE "new_Habit" RENAME TO "Habit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
