-- CreateTable
CREATE TABLE "VillageLand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerCompanyName" TEXT NOT NULL,
    "landName" TEXT NOT NULL,
    "authNumber" TEXT NOT NULL,
    "areaM2" TEXT NOT NULL,
    "hasRegistered" TEXT NOT NULL,
    "hasArts" TEXT NOT NULL,
    "usedAreaM2" TEXT NOT NULL,
    "notUsedAreaM2" TEXT NOT NULL,
    "RedAreaM2" TEXT NOT NULL,
    "transferredAreaM2" TEXT NOT NULL,
    "transferredRedAreaM2" TEXT NOT NULL,
    "transferredValue" TEXT NOT NULL,
    "transferStartedAt" TEXT NOT NULL,
    "transferEndedAt" TEXT NOT NULL,
    "remarks" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LandUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "villige_id" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyAreaM2" TEXT NOT NULL,
    "startedAt" TEXT NOT NULL,
    "endedAt" TEXT NOT NULL,
    "rentalInWanYuan" TEXT NOT NULL,
    "isPubliclyTraded" TEXT NOT NULL,
    "notPublicReason" TEXT,
    "billingAddressIsOwnerVillage" TEXT NOT NULL,
    "billingNotIdenticalReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LandUser_villige_id_fkey" FOREIGN KEY ("villige_id") REFERENCES "VillageLand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
