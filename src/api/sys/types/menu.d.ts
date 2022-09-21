// export interface MenuTreeResult {}

export interface MenuTreeType {
  id: number;
  menuName: string;
  menuCode: string;
  /** 状态 是否启用 1：启用；0：禁用 */
  useFlag: string;
  /** 等级 */
  level: number;
  /** 菜单类型 0:系统；1:菜单；2：按钮；3：数据权限,10：app权限 */
  type: string;
  /** 排序 */
  sort: number;
  /** 父级id */
  parentId: number;
  children?: MenuTreeType[];
}

export interface menuSaveParams {
  id?: number;
  menuName: string;
  menuCode: string;
  useFlag: string; // 状态
  type: string; // 类型
  sort: number; // 排序
  parentId: number | string; // 上级id
}
