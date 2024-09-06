'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function create(data) {
  console.log('z', data);
  const d = await prisma.villageAsset.create({
    data: {
      ...data,
    },
  });
  return d.id;
}

export async function update(data, id: string) {
  console.log('z', data);
  const found = await prisma.villageAsset.findUnique({
    where: { id: Number(id) },
  });
  const d = await prisma.villageAsset.update({
    where: { id: Number(id) },
    data: {
      ...found,
      id: Number(id),
      LeasingCompanies: {
        create: [...data],
      },
    },
  });
  return 'ok';
}

export async function createV2(data) {
  console.log('z', data);
  const d = await prisma.villageLand.create({
    data: {
      ...data,
    },
  });
  return d.id;
}

export async function updateV2(data, id: string) {
  console.log('z', data);
  const found = await prisma.villageLand.findUnique({
    where: { id: Number(id) },
  });
  const d = await prisma.villageLand.update({
    where: { id: Number(id) },
    data: {
      ...found,
      id: Number(id),
      LandUser: {
        create: [...data],
      },
    },
  });
  return 'ok';
}
