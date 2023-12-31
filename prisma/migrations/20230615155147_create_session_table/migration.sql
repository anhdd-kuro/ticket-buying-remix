-- CreateTable
-- CREATE TABLE "Session" (
--     "id" TEXT NOT NULL PRIMARY KEY,
--     "shop" TEXT NOT NULL,
--     "state" TEXT NOT NULL,
--     "isOnline" BOOLEAN NOT NULL DEFAULT false,
--     "scope" TEXT,
--     "expires" DATETIME,
--     "accessToken" TEXT NOT NULL,
--     "userId" BIGINT
-- );
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT,
    "expires" TIMESTAMP,
    "accessToken" TEXT NOT NULL,
    "userId" BIGINT
);
