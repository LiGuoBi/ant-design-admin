// 登录请求参数
export interface UserLoginParams {
  account: string;
  pwd: string;
}
// 登录响应结果
export interface UserLoginResult {
  name: string;
  token: string;
}

// 用户信息
export interface UserInfoResult {
  id: number;
  name: string; // 姓名
  account: string; // 账号
  mobile: string; // 手机号码
  useFlag: string; // 是否启用
  // 水库列表
  reservoirList: ReservoirType[];

  permissions: PermissionType[];
}
// 权限
export interface PermissionType {
  menuCode: string;
  /** 菜单名称 */
  menuName: string;
  /** 菜单类型：1:菜单；2：按钮 */
  type: string;

  children: PermissionType[];
}

export interface ReservoirType {
  id: number;
  rsnm: string; // 名称
  /** 水库代码 */
  rscd: string;
  /** 所在镇 */
  szz: string;
  /** 所在村 */
  ssc: string;
  /** 坝型，字典bxdm */
  dmtp: string;
  /** 水库规模 字典gcgmdm */
  prsc: string;
}

// 用户列表 请求参数
export interface UserPageListParams {
  current: number; // 当前页
  pageSize: number; // 分页数
  name: string; // 用户名
  account: string; // 账号
  useFlag: string; // 状态
}

// 用户表格type
export interface UserTableDataType {
  id: number;
  name: string;
  account: string;
  useFlag: string;
  mobile: string;
  createName: string;
  createTime: string;
}

// 新增用户 请求参数
export interface UserAddParams {
  name: string; // 用户名称
  account: string; // 账号
  password: string;
  /** 确认密码 后端不需要 */
  confirmPassword?: string;
  mobile: string; // 电话
  // 关联水库
  belongsReservoirDictIds: number[];
  roleId: number | string; // 关联角色
  useFlag: string;
}

/** 编辑用户 请求响应 */
export interface UserEditParams {
  id: number | string;
  name: string; // 用户名称
  account: string; // 账号
  mobile: string; // 电话
  belongsReservoirDictIds: number[];
  roleId: number | string; // 关联角色
  useFlag: string;
}
