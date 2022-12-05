import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import store from '@/store';
import router from '@/router';
import { loading } from '@/utils/loading';
import { storeUser } from '@/utils';

const ErrConfig = [
  { status: 400, msg: '错误请求' },
  // { status: 401, msg: '未授权，请重新登录' },
  { status: 403, msg: '拒绝发访问' },
  { status: 404, msg: '请求错误，未找到该资源' },
  { status: 405, msg: '请求方法未允许' },
  { status: 408, msg: '请求超时' },
  { status: 500, msg: '服务端错误' },
  { status: 501, msg: '网络未实现' },
  { status: 502, msg: '网络错误' },
  { status: 503, msg: '服务不可用' },
  { status: 504, msg: '网络超时' },
  { status: 505, msg: 'http版本不支持该请求' }
];

const baseConfig = {
  BaseURL: process.env.VUE_APP_BASE_URL,
  timeout: 50000
};

const instance: AxiosInstance = axios.create(baseConfig);
instance.defaults.headers['x-proxy'] = true;

instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // 全局loading开启
    await loading.open();
    const { token } = store.getters;
    const headers = config.headers;
    if (headers) {
      // 注入园区的依赖头部信息
      headers['x-tenant-alias-header'] = '%E6%B5%8B%E8%AF%95%E5%9B%AD%E5%8C%BA';
      headers['x-tenant-header'] = '1560475631006625870';
      headers['x-tenant-name-header'] = '%E6%B5%8B%E8%AF%95%E5%9B%AD%E5%8C%BA';
      token && (headers.Authorization = `Bearer ${token}`);
      headers['Content-type'] = 'application/json;charset=utf-8';
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    // 全局loading关闭
    await loading.close();
    const { code } = response.data;
    return response;
  },
  async (err) => {
    if (err && err.response) {
      await loading.close();
      const { status } = err.response;
      if (status === 401) {
        ElMessage.error('登录失效，请重新登陆');
        router.replace({ name: 'login' });
        storeUser.clear();
        return;
      }
      ErrConfig.forEach((e) => e.status === status && ElMessage.error(e.msg));
    }
    return Promise.reject(err);
  }
);

export default instance;
