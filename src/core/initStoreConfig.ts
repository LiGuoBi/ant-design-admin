import { useAppStore } from '@/store/modules/app';
import { useUserStore } from '@/store/modules/user';
import { getStorage, TOKEN_CACHE_KEY, APP_LAYOUT_CACHE_KEY } from '@/utils/storage';

export default function initStoreConfig() {
  const appStore = useAppStore();
  // 获取布局配置
  const layoutConfig = getStorage(APP_LAYOUT_CACHE_KEY);
  if (layoutConfig) appStore.$patch(layoutConfig);

  const userStore = useUserStore();
  // 获取缓存token
  userStore.token = getStorage(TOKEN_CACHE_KEY);
}
