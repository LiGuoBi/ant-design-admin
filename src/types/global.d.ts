// .d.ts 文件是 typescript 的声明文件
// https://zhuanlan.zhihu.com/p/133344957
// https://zhuanlan.zhihu.com/p/394448926
import type { TableColumnsType } from 'ant-design-vue';

// 没有 import引入 不需要加 declare global {}
declare global {
  // 类型可以为空
  declare type Nullable<T> = T | null;

  // 定义类型拷贝对象中的某一部分
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };

  // 请求响应结果结构
  declare interface ResponseResult<T = any> {
    data: T;
    code: number;
    message: string;
  }

  // 分页列表 数据结构
  declare interface PageListResult<T = any> {
    // 当前页
    current: number;
    // 总条数
    total: number;
    // 每页数量
    size: number;
    // 列表
    records: T[];
  }

  // 表格数据结构
  declare interface TableStateType<D = any> {
    // 表格列的配置描述
    columns: TableColumnsType;
    // 表格数据
    data: D[];
    loading: boolean;
    pagination: {
      current: number;
      pageSize: number;
      total: number;
    };
  }
}
