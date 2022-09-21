import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, RequestParams } from '../_util';

const userList = [
  {
    id: 1,
    name: 'admin',
    account: 'admin',
    password: '12345678',
    createTime: '2022-01-06 15:49:09',
    mobile: '13577151539',
    token: 'ff8c9b38-0819-446a-bf8b-ce6ed8c7f140',
    permissions: [
      {
        menuCode: 'dashboard',
        menuName: '监测数据',
        children: [
          {
            menuCode: 'welcome',
            menuName: '欢迎页',
            children: [],
          },
        ],
      },
      {
        menuCode: 'system',
        menuName: '系统管理',
        children: [
          {
            menuCode: 'user',
            menuName: '用户管理',
            children: [
              {
                menuCode: 'user:add',
                menuName: '新增权限',
              },
              {
                menuCode: 'user:edit',
                menuName: '编辑权限',
              },
              {
                menuCode: 'user:delete',
                menuName: '删除权限',
              },
            ],
          },
          {
            menuCode: 'role',
            menuName: '角色管理',
          },
          {
            menuCode: 'menu',
            menuName: '菜单管理',
          },
        ],
      },
    ],
  },
];

export default [
  // 用户登录
  {
    url: '/sys/user/login',
    timeout: 500,
    method: 'post',
    response: (requestParams: RequestParams) => {
      const { account, pwd } = requestParams.body;
      const checkUser = userList.find((item) => item.account === account && item.password === pwd);
      if (!checkUser) {
        return resultError('用户密码输入错误');
      }
      return resultSuccess(checkUser);
    },
  },
  // 用户信息
  {
    url: '/sys/user/getUser',
    timeout: 200,
    method: 'get',
    response: (requestParams: RequestParams) => {
      const token = requestParams.headers?.token;
      if (!token) {
        return resultError('没有 token');
      }
      const checkUser = userList.find((item) => item.token === token);
      if (!checkUser) {
        return resultError('没有这个用户');
      }
      return resultSuccess(checkUser);
    },
  },
] as MockMethod[];
