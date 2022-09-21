// 接口数据格式用于返回统一的格式
export interface RequestParams {
  method: string;
  body: any;
  headers?: { token?: string };
  query: any;
}

export function resultSuccess<T = any>(data: T, message = '成功') {
  return {
    code: 200,
    data,
    message,
  };
}

export function resultError(message = '失败', code = 500) {
  return {
    code,
    message,
  };
}

export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  message = '成功',
) {
  const pageData = pagination(page, pageSize, list);
  return {
    ...resultSuccess({
      records: pageData,
      current: page,
      size: pageSize,
      total: list.length,
    }),
    message,
  };
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize));
  return ret;
}
