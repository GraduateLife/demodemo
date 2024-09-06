-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LeasingCompany" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "villige_id" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "isUsingBothLandAndBuilding" TEXT NOT NULL,
    "authNumber" TEXT NOT NULL,
    "areaM2" TEXT NOT NULL,
    "startedAt" TEXT NOT NULL,
    "endedAt" TEXT NOT NULL,
    "rentalInWanYuan" TEXT NOT NULL,
    "isPubliclyTraded" TEXT NOT NULL,
    "notPublicReason" TEXT,
    "billingAddressIsOwnerVillage" TEXT NOT NULL,
    "billingNotIdenticalReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LeasingCompany_villige_id_fkey" FOREIGN KEY ("villige_id") REFERENCES "VillageAsset" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LeasingCompany" ("areaM2", "authNumber", "billingAddressIsOwnerVillage", "billingNotIdenticalReason", "companyName", "createdAt", "endedAt", "id", "isPubliclyTraded", "isUsingBothLandAndBuilding", "notPublicReason", "rentalInWanYuan", "startedAt", "updatedAt", "villige_id") SELECT "areaM2", "authNumber", "billingAddressIsOwnerVillage", "billingNotIdenticalReason", "companyName", "createdAt", "endedAt", "id", "isPubliclyTraded", "isUsingBothLandAndBuilding", "notPublicReason", "rentalInWanYuan", "startedAt", "updatedAt", "villige_id" FROM "LeasingCompany";
DROP TABLE "LeasingCompany";
ALTER TABLE "new_LeasingCompany" RENAME TO "LeasingCompany";
CREATE TABLE "new_VillageAsset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerCompanyName" TEXT NOT NULL,
    "assetName" TEXT NOT NULL,
    "authNumber" TEXT NOT NULL,
    "areaM2" TEXT NOT NULL,
    "billingAddress" TEXT NOT NULL,
    "hasRegistered" TEXT NOT NULL,
    "originalAssetInWanYuan" TEXT NOT NULL,
    "usedAreaM2" TEXT NOT NULL,
    "notUsedAreaM2" TEXT NOT NULL,
    "remarks" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_VillageAsset" ("areaM2", "assetName", "authNumber", "billingAddress", "createdAt", "hasRegistered", "id", "notUsedAreaM2", "originalAssetInWanYuan", "ownerCompanyName", "remarks", "updatedAt", "usedAreaM2") SELECT "areaM2", "assetName", "authNumber", "billingAddress", "createdAt", "hasRegistered", "id", "notUsedAreaM2", "originalAssetInWanYuan", "ownerCompanyName", "remarks", "updatedAt", "usedAreaM2" FROM "VillageAsset";
DROP TABLE "VillageAsset";
ALTER TABLE "new_VillageAsset" RENAME TO "VillageAsset";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
