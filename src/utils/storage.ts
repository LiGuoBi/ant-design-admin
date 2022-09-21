export function getStorage(key: string) {
  if (!key) return undefined;
  const str = window.localStorage.getItem(key) ?? '';
  if (!str) return undefined;
  return JSON.parse(str);
}

export function setStorage(key: string, data: any) {
  return window.localStorage.setItem(key, JSON.stringify(data));
}

export function removeStorage(key: string) {
  return window.localStorage.removeItem(key);
}

export function clearAllStorage() {
  window.localStorage.clear();
}

// 缓存Key
// token缓存key
export const TOKEN_CACHE_KEY = 'xw_token';
// 网站布局key
export const APP_LAYOUT_CACHE_KEY = 'xw_layout_config';
// 用户信息
export const USERINFO_CACHE_KEY = 'xw_user_info';
