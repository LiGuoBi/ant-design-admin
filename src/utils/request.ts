import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { notification } from 'ant-design-vue';
import { getStorage, setStorage, TOKEN_CACHE_KEY } from '@/utils/storage';

import { refreshToken } from '@/api/sys/user';
import { useUserStore } from '@/store/modules/user';

// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests: (() => void)[] = [];

// RequestConfig 继承 AxiosRequestConfig 扩展自定义请求配置字段
interface RequestConfig<T = any> extends AxiosRequestConfig {
  data?: T;
  // 隐藏请求失败默认提示
  hideErrorTips?: boolean;
}

// RequestInstance 继承 AxiosInstance 扩展请求配置和响应返回值类型
interface RequestInstance extends AxiosInstance {
  /** 设置泛型T，默认为any，将请求后的结果返回变成Promise<ResponseResult<T>> */
  <T = any>(config: RequestConfig): Promise<ResponseResult<T>>;
  /**
   * 设置泛型T，默认为any，将请求后的结果返回变成Promise<T>，
   * 示列： request.get<ResponseResult<UserInfoResult>>('/url')
   */
  get<T = any>(url: string, config?: RequestConfig): Promise<T>;
  post<T = any, D = any>(url: string, data?: D, config?: RequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: RequestConfig): Promise<T>;
  // head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: RequestConfig<D>): Promise<R>;
  // options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  // put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  // patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}

// 创建 axios 实例
const request: RequestInstance = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_APP_API_URL,
  // baseURL: process.env.VUE_APP_API_BASE_URL_MOCK,
  timeout: 5000, // 请求超时时间
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
}) as RequestInstance;

// 异常拦截处理器
const handleError = (error: any) => {
  // 错误抛到业务代码
  error = { code: 500, message: '服务器异常，请联系管理员！' };
  return Promise.reject(error);
};

// request interceptor 请求拦截器
request.interceptors.request.use((config: RequestConfig) => {
  //获取token，并将其添加至请求头中
  const token: string = getStorage(TOKEN_CACHE_KEY);
  if (token) {
    config.headers && (config.headers.token = token);
  }
  return config;
}, handleError);

// response interceptor 响应拦截器
request.interceptors.response.use((response: AxiosResponse) => {
  const config: RequestConfig = response.config;
  const { code, message } = response.data;
  const token = getStorage(TOKEN_CACHE_KEY);
  if (code === 200) {
    return response.data;
  } else {
    const userStore = useUserStore();
    // 402 token过期 刷新token
    if (code === 402) {
      if (!isRefreshing) {
        // isRefreshing 赋值 true，请求刷新token接口
        isRefreshing = true;
        return refreshToken({ token })
          .then((res) => {
            // console.log('重新获取token成功');
            setStorage(TOKEN_CACHE_KEY, res.data.refToken);
            // 获取到新token，将队列中的请求进行重试
            requests.forEach((fn) => fn());
            // 清空队列
            requests = [];
            // 重新请求当前接口
            return request(config);
          })
          .catch((error) => {
            if (!config.hideErrorTips) {
              notification.error({
                message: '错误',
                description: 'token失效，请重新登录',
              });
              userStore.logout().then(() => {
                // 删除token，刷新页面，通过路由守卫重定向到登录页
                window.location.reload();
              });
            }
            return Promise.reject(error);
          })
          .finally(() => {
            isRefreshing = false;
          });
      } else {
        // 正在刷新token，将返回一个未执行resolve的promise
        return new Promise((resolve) => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          requests.push(() => {
            resolve(request(config));
          });
        });
      }
    } else if (code === 401) {
      // 未登录
      if (!config.hideErrorTips && token) {
        notification.error({
          message: '错误',
          description: '未登录账户',
        });
        userStore.logout().then(() => {
          // 删除token，刷新页面，通过路由守卫重定向到登录页
          window.location.reload();
        });
      }
    } else {
      if (!config.hideErrorTips) {
        notification.error({
          message: '错误',
          description: message,
        });
      }
    }
    // 请求失败，返回一个失败的Promise
    return Promise.reject(response.data);
  }
}, handleError);

export default request;
