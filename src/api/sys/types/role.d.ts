// 角色列表 请求参数
export interface RolePageListParams {
  current: number; // 当前页
  pageSize: number; // 分页数
  roleCode?: string; // 角色编码
  roleName?: string; // 角色名称
  useFlag?: string; // 状态 是否启用 1：启用；0：禁用
}
// 角色列表 请求响应 列表数据结构
export interface RoleTableDateType {
  id: number;
  // 角色编码
  roleCode: string;
  // 角色名称
  roleName: string;
  // 状态
  useFlag: string;
  // 创建时间
  createTime: string;
}

// 角色详情
export interface RoleDetail {
  // 添加时不需要id
  id?: number;
  roleCode: string;
  roleName: string;
  useFlag: string;
  menuIds: number[];
}

// 可用角色列表
export interface UsableRoleListResult {
  id: number;
  roleName: string;
}
