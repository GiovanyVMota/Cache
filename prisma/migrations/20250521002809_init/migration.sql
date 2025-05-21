-- CreateTable
CREATE TABLE "Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "method" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL
);
