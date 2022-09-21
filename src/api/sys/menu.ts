import request from '@/utils/request';
import { MenuTreeType, menuSaveParams } from './types/menu';

// 获取菜单tree  type=0获取菜单上级Tree，type=1获取按钮上级Tree 不传type获取全部
export const getMenuTree = (type?: 0 | 1) => {
  const params: any = {};
  if (type) params.type = type;
  return request<MenuTreeType[]>({
    url: '/master/menu/tree',
    method: 'get',
    params,
  });
};

// 获取菜单详情
export const getMenuDetail = (id: number) => {
  return request<menuSaveParams>({
    url: `/master/menu/get`,
    method: 'get',
    params: { id },
  });
};

// 菜单新增/修改
export const menuSave = (data: menuSaveParams) => {
  return request({
    url: '/master/menu/save',
    method: 'post',
    data,
  });
};

// 菜单删除
export const menuDelete = (id: number) => {
  return request({
    url: `/master/menu/delete/${id}`,
    method: 'delete',
  });
};
