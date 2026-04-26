import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

export const Schema = z.object({
  世界状态: z.object({
    当前时间: z.string().prefault('未知'),
    当前地点: z.string().prefault('未知'),
    今日黄历: z.string().prefault('【未卜】等待新客上门'),
    暗骰点数: z.coerce.number().prefault(0),
    在场人物: z.record(
      z.string().describe('角色名'),
      z.boolean()
    ).prefault({}),
  }),
  福泽堂: z.object({
    经营时间: z.coerce.number().prefault(0),
    完成单数: z.coerce.number().prefault(0),
    库房: z.record(
      z.string().describe('物品名'),
      z.object({
        描述: z.string().prefault(''),
      })
    ).prefault({}),
  }),
  袁枚: z.object({
    七宝收集进度: z.coerce.number().transform(v => _.clamp(v, 0, 6)).prefault(0),
  }),
  主线: z.object({
    是否开启: z.boolean().prefault(false),
  }),
});

$(() => {
  registerMvuSchema(Schema);
});
