import request from '@/utils/request';
import {
  UserLoginParams,
  UserLoginResult,
  UserInfoResult,
  UserPageListParams,
  UserTableDataType,
  UserAddParams,
  UserEditParams,
} from './types/user';

// 登录
export const userLogin = (data: UserLoginParams) => {
  // 通过泛型，定义request返回结果
  return request<UserLoginResult>({
    url: '/sys/user/login',
    method: 'post',
    data,
    hideErrorTips: true,
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return request<UserInfoResult>({
    url: '/sys/user/getUser',
    method: 'get',
    hideErrorTips: true,
    // params: {}
  });
};

// 刷新token
export const refreshToken = (data: any) => {
  return request<{ refToken: string }>({
    url: '/sys/user/ref/token',
    method: 'post',
    data,
    hideErrorTips: true,
  });
};

// 用户table列表
export const getUserPageList = (data: UserPageListParams) => {
  return request<PageListResult<UserTableDataType>>({
    url: '/sys/user/page',
    method: 'post',
    data,
  });
};

// 用户删除
export const userDelete = (id: number) => {
  return request({
    url: `/sys/user/deleted/${id}`,
    method: 'delete',
  });
};

// 用户增加
export const userAdd = (data: UserAddParams) => {
  return request({
    url: '/sys/user/add',
    method: 'post',
    data,
  });
};

// 用户编辑
export const userEdit = (data: UserEditParams) => {
  return request({
    url: '/sys/user/update',
    method: 'post',
    data,
  });
};

// 用户重置密码
export const userResetPassword = (id: number) => {
  return request({
    url: `/sys/user/update/pwd/${id}`,
    method: 'post',
  });
};
