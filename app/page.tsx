'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Control, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast, useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { create, createV2, update, updateV2 } from '@/lib/actions';

// ownerCompanyName: '水星村村委会',
// assetName: '办公楼',
// authNumber: '1234qwe',
// areaM2: '2000',
// billingAddress: '冥王星合作社',
// hasRegistered: false,
// originalAssetInWanYuan: '1500',

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

const FormSchema = z.object({
  ownerCompanyName: z.string().min(1),
  assetName: z.string().min(1),
  authNumber: z.string().min(1),
  areaM2: z.string().min(1),
  billingAddress: z.string().min(1),
  hasRegistered: z.string().min(1),
  originalAssetInWanYuan: z.string().min(1),
  remarks: z.string().min(1),
  list: z
    .object({
      companyName: z.string().min(1),
      isUsingBothLandAndBuilding: z.string().min(1),
      companyAuthNumber: z.string().min(1),
      companyAreaM2: z.string().min(1),
      startedAt: z.string().min(1),
      endedAt: z.string().min(1),
      rentalInWanYuan: z.string().min(1),
      isPubliclyTraded: z.string().min(1),
      notPublicReason: z.string().min(1),
      billingAddressIsOwnerVillage: z.string().min(1),
      billingNotIdenticalReason: z.string().min(1),
      usedAreaM2: z.string().min(1),
      notUsedAreaM2: z.string().min(1),
    })
    .array(),
});

export const CompanyForm: never = () => {
  const form = useForm({
    defaultValues: {
      list: [
        {
          companyName: '',
          isUsingBothLandAndBuilding: '',
          companyAuthNumber: '',
          companyAreaM2: '',
          startedAt: '',
          endedAt: '',
          rentalInWanYuan: '',
          isPubliclyTraded: '',
          notPublicReason: '',
          billingAddressIsOwnerVillage: '',
          billingNotIdenticalReason: '',
        },
      ],
    },
  });
  const { register, control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'list',
  });

  const onSubmit = async (data) => {
    console.log('d', data);

    await update(data.list, window._current_id);
    window._current_id = undefined;
    // await prisma.villageAsset.create({
    //   data: {
    //     LeasingCompanies: {
    //       create: [...data],
    //     },
    //   },
    // });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(async (data) => {
          await onSubmit(data);
          alert('租赁情况提交成功');
        })}
        className="flex flex-col justify-center items-center space-y-6"
      >
        <div className="w-[70%] space-y-6">
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="border p-2 rounded">
                <FormLabel>租赁单位</FormLabel>
                <Input {...register(`list.${index}.companyName`)} />
                <FormLabel>是否属于“房地一体租赁（是/否）</FormLabel>
                <Input
                  {...register(`list.${index}.isUsingBothLandAndBuilding`)}
                />
                <FormLabel>集体建设用地使用权证号</FormLabel>
                <Input
                  {...register(`list.${index}.companyAuthNumber`)}
                  defaultValue={field.companyAuthNumber}
                />
                <FormLabel>集体建设用地面积</FormLabel>
                <Input {...register(`list.${index}.companyAreaM2`)} />
                <FormLabel>租赁期限（开始日期）</FormLabel>
                <Input {...register(`list.${index}.startedAt`)} />
                <FormLabel>租赁期限（截止日期）</FormLabel>
                <Input {...register(`list.${index}.endedAt`)} />
                <FormLabel>年租金</FormLabel>
                <Input {...register(`list.${index}.rentalInWanYuan`)} />
                <FormLabel>产权交易平台公开交易（是/否）</FormLabel>
                <Input {...register(`list.${index}.isPubliclyTraded`)} />
                <FormLabel>若否,具体原因</FormLabel>
                <Input {...register(`list.${index}.notPublicReason`)} />
                <FormLabel>租金入账与权属单位一致情况(是/否)</FormLabel>
                <Input
                  {...register(`list.${index}.billingAddressIsOwnerVillage`)}
                />
                <FormLabel>若否,实际入账单位</FormLabel>
                <Input
                  {...register(`list.${index}.billingNotIdenticalReason`)}
                />
                <Button
                  type="button"
                  className="my-4"
                  onClick={() => remove(index)}
                >
                  移除
                </Button>
              </div>
            );
          })}
          <Button
            type="button"
            onClick={() =>
              append({
                companyName: '',
                isUsingBothLandAndBuilding: '',
                companyAuthNumber: '',
                companyAreaM2: '',
                startedAt: '',
                endedAt: '',
                rentalInWanYuan: '',
                isPubliclyTraded: '',
                notPublicReason: '',
                billingAddressIsOwnerVillage: '',
                billingNotIdenticalReason: '',
              })
            }
          >
            添加租赁公司
          </Button>
        </div>
        <Button type="submit" className="space-y-3" variant={'destructive'}>
          提交租赁情况
        </Button>
      </form>
    </Form>
  );
};

export const BasicForm: never = () => {
  const form = useForm();

  const control = form.control;

  async function onSubmit(data) {
    const res = await create(data);
    window._current_id = res;
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          await onSubmit(data);
          alert('基本信息提交成功');
        })}
        className="flex flex-col justify-center items-center min-w-[80%] w-full space-y-6"
      >
        <div className="w-[70%] space-y-6">
          <FormField
            control={control}
            name="ownerCompanyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>权属单位名称</FormLabel>
                <FormControl>
                  <Input placeholder="例:方夏村委会" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="assetName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>经营性资产(不动产)名称</FormLabel>
                <FormControl>
                  <Input placeholder="例:办公楼,经营性房屋" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="authNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>权证号</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="areaM2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>总建筑面积</FormLabel>
                <FormControl>
                  <Input placeholder="单位:平方米" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="billingAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>入账情况(单位名称)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="hasRegistered"
            render={({ field }) => (
              <FormItem>
                <FormLabel>资产平台登记情况(是/否)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="originalAssetInWanYuan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>资产原值</FormLabel>
                <FormControl>
                  <Input placeholder="单位:万元" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="usedAreaM2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>自用面积</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="notUsedAreaM2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>闲置面积</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>备注</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" variant={'destructive'}>
          提交基本情况
        </Button>
      </form>
    </Form>
  );
};

// model VillageLand {
//   id        Int   @id @default(autoincrement())
//   // 权属单位名称
//   ownerCompanyName String
//   //经营性资产名称
//   landName String
//   //权证号
//   authNumber String
//   //建筑面积
//   areaM2 String
//   //资产平台登记情况(是/否)
//   hasRegistered String
//   hasArts String
//   usedAreaM2 String
//   notUsedAreaM2 String
//   RedAreaM2 String

//   transferredAreaM2 String
//   transferredRedAreaM2 String
//   tranferredValue String
//   transferStartedAt String
//   transferEndedAt String

//   remarks String?

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   LandUser LandUser[]
// }

export const BasicFormV2: never = () => {
  const form = useForm();

  const control = form.control;

  async function onSubmit(data) {
    const res = await createV2(data);
    window._current_idv2 = res;
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          await onSubmit(data);
          alert('基本信息提交成功');
        })}
        className="flex flex-col justify-center items-center min-w-[80%] w-full space-y-6"
      >
        <div className="w-[70%] space-y-6">
          <FormField
            control={control}
            name="ownerCompanyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>权属单位名称</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="landName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>地块名称或位置</FormLabel>
                <FormControl>
                  <Input placeholder="例:xx村xx号" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="authNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>权证号</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="areaM2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>总面积</FormLabel>
                <FormControl>
                  <Input placeholder="单位:平方米" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="hasRegistered"
            render={({ field }) => (
              <FormItem>
                <FormLabel>资产平台登记情况(是/否)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="hasArts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>是否有地上物(是/否)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="usedAreaM2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>自用面积</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="notUsedAreaM2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>闲置面积</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="RedAreaM2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>红证面积</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="transferredAreaM2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>转让面积</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="transferredRedAreaM2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>其中的红证面积</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="transferredValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>转让价格</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="transferStartedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>转让开始时间</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="transferEndedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>转让截止时间</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>备注</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" variant={'destructive'}>
          提交基本情况
        </Button>
      </form>
    </Form>
  );
};

export const LandForm: never = () => {
  const form = useForm({
    defaultValues: {
      list: [
        {
          companyName: '',
          companyAreaM2: '',
          startedAt: '',
          endedAt: '',
          rentalInWanYuan: '',
          isPubliclyTraded: '',
          notPublicReason: '',
          billingAddressIsOwnerVillage: '',
          billingNotIdenticalReason: '',
        },
      ],
    },
  });
  const { register, control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'list',
  });

  const onSubmit = async (data) => {
    console.log('d', data);

    await updateV2(data.list, window._current_idv2);
    window._current_idv2 = undefined;
    // await prisma.villageAsset.create({
    //   data: {
    //     LeasingCompanies: {
    //       create: [...data],
    //     },
    //   },
    // });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(async (data) => {
          await onSubmit(data);
          alert('租赁情况提交成功');
        })}
        className="flex flex-col justify-center items-center space-y-6"
      >
        <div className="w-[70%] space-y-6">
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="border p-2 rounded">
                <FormLabel>租赁单位</FormLabel>
                <Input {...register(`list.${index}.companyName`)} />
                <FormLabel>集体建设用地面积</FormLabel>
                <Input {...register(`list.${index}.companyAreaM2`)} />
                <FormLabel>租赁期限（开始日期）</FormLabel>
                <Input {...register(`list.${index}.startedAt`)} />
                <FormLabel>租赁期限（截止日期）</FormLabel>
                <Input {...register(`list.${index}.endedAt`)} />
                <FormLabel>年租金</FormLabel>
                <Input {...register(`list.${index}.rentalInWanYuan`)} />
                <FormLabel>产权交易平台公开交易（是/否）</FormLabel>
                <Input {...register(`list.${index}.isPubliclyTraded`)} />
                <FormLabel>若否,具体原因</FormLabel>
                <Input {...register(`list.${index}.notPublicReason`)} />
                <FormLabel>租金入账与权属单位一致情况(是/否)</FormLabel>
                <Input
                  {...register(`list.${index}.billingAddressIsOwnerVillage`)}
                />
                <FormLabel>若否,实际入账单位</FormLabel>
                <Input
                  {...register(`list.${index}.billingNotIdenticalReason`)}
                />
                <Button
                  type="button"
                  className="my-4"
                  onClick={() => remove(index)}
                >
                  移除
                </Button>
              </div>
            );
          })}
          <Button
            type="button"
            onClick={() =>
              append({
                companyName: '',
                companyAreaM2: '',
                startedAt: '',
                endedAt: '',
                rentalInWanYuan: '',
                isPubliclyTraded: '',
                notPublicReason: '',
                billingAddressIsOwnerVillage: '',
                billingNotIdenticalReason: '',
              })
            }
          >
            添加租赁公司
          </Button>
        </div>
        <Button type="submit" className="space-y-3" variant={'destructive'}>
          提交租赁情况
        </Button>
      </form>
    </Form>
  );
};

export default () => {
  return (
    <>
      <h1 className="font-extrabold text-3xl">村级经营性固定资产</h1>
      <h1>输入基本情况</h1>
      <BasicForm />
      <h1>输入租赁情况</h1>
      <CompanyForm />
      <h1 className="font-extrabold text-3xl">村级集体建设用地</h1>
      <h1>输入基本情况</h1>
      <BasicFormV2 />
      <h1>输入租用情况</h1>
      <LandForm />
    </>
  );
};
