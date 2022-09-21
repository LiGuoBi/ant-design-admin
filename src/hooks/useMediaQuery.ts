import { ref } from 'vue';

export const MediaQueryEnum /* : {
  [key: string]: {
    matchMedia: string;
    minWidth?: number;
    maxWidth?: number;
  };
} */ = {
  xs: {
    maxWidth: 575,
    matchMedia: '(max-width: 575px)',
  },
  sm: {
    minWidth: 576,
    maxWidth: 767,
    matchMedia: '(min-width: 576px) and (max-width: 767px)',
  },
  md: {
    minWidth: 768,
    maxWidth: 991,
    matchMedia: '(min-width: 768px) and (max-width: 991px)',
  },
  lg: {
    minWidth: 992,
    maxWidth: 1199,
    matchMedia: '(min-width: 992px) and (max-width: 1199px)',
  },
  xl: {
    minWidth: 1200,
    maxWidth: 1599,
    matchMedia: '(min-width: 1200px) and (max-width: 1599px)',
  },
  xxl: {
    minWidth: 1600,
    matchMedia: '(min-width: 1600px)',
  },
};

export type MediaQueryKey = keyof typeof MediaQueryEnum;

// 获取当前窗口 响应式布局断点
export const getScreenClassName = () => {
  let className: MediaQueryKey = 'md';
  // 支持 ssr 没有window对象返回 md
  if (typeof window === 'undefined') {
    return className;
  }
  const mediaQueryKey = (Object.keys(MediaQueryEnum) as MediaQueryKey[]).find((key) => {
    const { matchMedia } = MediaQueryEnum[key];
    if (window.matchMedia(matchMedia).matches) {
      return true;
    }
    return false;
  });
  className = mediaQueryKey as unknown as MediaQueryKey;
  return className;
};

// window.matchMedia api文档：https://www.runoob.com/jsref/met-win-matchmedia.html
const useMedia = () => {
  const colSpan = ref<string>(getScreenClassName());

  Object.keys(MediaQueryEnum).forEach((key) => {
    const { matchMedia } = MediaQueryEnum[key as MediaQueryKey];
    const query = window.matchMedia(matchMedia);
    if (query.matches) {
      colSpan.value = key;
    }
    // 监测尺寸变化
    query.onchange = (e) => {
      if (e.matches) {
        colSpan.value = key;
      }
    };
  });

  return colSpan;
};

export default useMedia;
