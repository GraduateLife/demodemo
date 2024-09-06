import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// companyName String @unique
// //经营性资产名称
// assetName String
// //权证号
// authNumber String
// //建筑面积
// areaM2 String
// //入账单位名称
// billingAddress String
// //资产平台登记情况(是/否)
// hasRegistered Boolean
// //资产原值
// originalAssetInWanYuan String

// LeasingCompanies LeasingCompany[]

// companyName String
// isUsingBothLandAndBuilding Boolean
// authNumber String
// areaM2 String
// startedAt DateTime
// endedAt DateTime
// rentalInWanYuan String
// isPubliclyTraded Boolean
// notPublicReason String?
// billingAddressIsOwnerVillige Boolean
// billingNotIdenticalReason String?
// usedAreaM2 String
// notUsedAreaM2 String
// remarks String?

async function main() {
  const d = await prisma.villageAsset.create({
    data: {
      ownerCompanyName: '水星村村委会',
      assetName: '办公楼',
      authNumber: '1234qwe',
      areaM2: '2000',
      billingAddress: '冥王星合作社',
      hasRegistered: false,
      originalAssetInWanYuan: '1500',
      usedAreaM2: '20',
      notUsedAreaM2: '2000',
      // LeasingCompanies: {
      //   create: [
      //     {
      //       areaM2: '1000',
      //       companyName: '阿三公司',
      //       isUsingBothLandAndBuilding: false,
      //       authNumber: '12vreon',
      //       startedAt: new Date('2000-1-27'),
      //       endedAt: new Date('2035-1-27'),
      //       rentalInWanYuan: '50',
      //       isPubliclyTraded: false,
      //       notPublicReason: '因为我是例子',
      //       billingAddressIsOwnerVillage: false,
      //       billingNotIdenticalReason: '我是例子',
      //     },
      //     {
      //       areaM2: '1000',
      //       companyName: '阿四公司',
      //       isUsingBothLandAndBuilding: false,
      //       authNumber: '12vrecewon',
      //       startedAt: new Date('2000-1-27'),
      //       endedAt: new Date('2035-1-27'),
      //       rentalInWanYuan: '50',
      //       isPubliclyTraded: false,
      //       notPublicReason: '因为我是例子',
      //       billingAddressIsOwnerVillage: false,
      //       billingNotIdenticalReason: '我是例子',
      //     },
      //     {
      //       areaM2: '1000',
      //       companyName: '阿五公司',
      //       isUsingBothLandAndBuilding: false,
      //       authNumber: '12vrecewon',
      //       startedAt: new Date('2000-1-27'),
      //       endedAt: new Date('2035-1-27'),
      //       rentalInWanYuan: '50',
      //       isPubliclyTraded: true,
      //       billingAddressIsOwnerVillage: true,
      //     },
      //   ],
      // },
    },
  });
  console.log(d);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
