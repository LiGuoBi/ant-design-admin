import request from '@/utils/request';
import {
  RolePageListParams,
  RoleTableDateType,
  UsableRoleListResult,
  RoleDetail,
} from './types/role';

// 角色table列表
export const getRolePageList = (data: RolePageListParams) => {
  return request<PageListResult<RoleTableDateType>>({
    url: '/master/role/page',
    method: 'post',
    data,
  });
};

// 可用角色列表
export const getUsableRoleList = () => {
  return request<UsableRoleListResult[]>({
    url: '/master/role/useRole',
    method: 'get',
  });
};

// 获取角色记录
export const getRoleDetail = (id: number) => {
  return request<RoleDetail>({
    url: `/master/role/get/${id}`,
    method: 'get',
    hideErrorTips: false,
    // params: {}
  });
};

// 角色新增/修改
export const roleSave = (data: RoleDetail) => {
  return request({
    url: '/master/role/save',
    method: 'post',
    data,
  });
};
