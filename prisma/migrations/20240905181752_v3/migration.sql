/*
  Warnings:

  - You are about to drop the column `areaM2` on the `LeasingCompany` table. All the data in the column will be lost.
  - You are about to drop the column `authNumber` on the `LeasingCompany` table. All the data in the column will be lost.
  - Added the required column `companyAreaM2` to the `LeasingCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyAuthNumber` to the `LeasingCompany` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LeasingCompany" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "villige_id" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "isUsingBothLandAndBuilding" TEXT NOT NULL,
    "companyAuthNumber" TEXT NOT NULL,
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
    CONSTRAINT "LeasingCompany_villige_id_fkey" FOREIGN KEY ("villige_id") REFERENCES "VillageAsset" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LeasingCompany" ("billingAddressIsOwnerVillage", "billingNotIdenticalReason", "companyName", "createdAt", "endedAt", "id", "isPubliclyTraded", "isUsingBothLandAndBuilding", "notPublicReason", "rentalInWanYuan", "startedAt", "updatedAt", "villige_id") SELECT "billingAddressIsOwnerVillage", "billingNotIdenticalReason", "companyName", "createdAt", "endedAt", "id", "isPubliclyTraded", "isUsingBothLandAndBuilding", "notPublicReason", "rentalInWanYuan", "startedAt", "updatedAt", "villige_id" FROM "LeasingCompany";
DROP TABLE "LeasingCompany";
ALTER TABLE "new_LeasingCompany" RENAME TO "LeasingCompany";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
