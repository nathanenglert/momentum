-- CreateTable
CREATE TABLE "Metric" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "value" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Metric_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_MetricToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_MetricToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Metric" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MetricToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_MetricToTag_AB_unique" ON "_MetricToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MetricToTag_B_index" ON "_MetricToTag"("B");
