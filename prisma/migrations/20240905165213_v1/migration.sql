-- CreateTable
CREATE TABLE "VillageAsset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerCompanyName" TEXT NOT NULL,
    "assetName" TEXT NOT NULL,
    "authNumber" TEXT NOT NULL,
    "areaM2" TEXT NOT NULL,
    "billingAddress" TEXT NOT NULL,
    "hasRegistered" BOOLEAN NOT NULL,
    "originalAssetInWanYuan" TEXT NOT NULL,
    "usedAreaM2" TEXT NOT NULL,
    "notUsedAreaM2" TEXT NOT NULL,
    "remarks" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LeasingCompany" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "villige_id" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "isUsingBothLandAndBuilding" BOOLEAN NOT NULL,
    "authNumber" TEXT NOT NULL,
    "areaM2" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "endedAt" DATETIME NOT NULL,
    "rentalInWanYuan" TEXT NOT NULL,
    "isPubliclyTraded" BOOLEAN NOT NULL,
    "notPublicReason" TEXT,
    "billingAddressIsOwnerVillage" BOOLEAN NOT NULL,
    "billingNotIdenticalReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LeasingCompany_villige_id_fkey" FOREIGN KEY ("villige_id") REFERENCES "VillageAsset" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
