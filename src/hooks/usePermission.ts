import { useUserStore } from '@/store/modules/user';

export function usePermission() {
  const userStore = useUserStore();

  const $auth = (value: string) => {
    return userStore.permissionCodes.includes(value);
  };

  return { $auth };
}
