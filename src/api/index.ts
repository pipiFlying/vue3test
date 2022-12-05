import request from '@/utils/request';

export const getSource = () => {
  return request({
    url: '/os/bmw-prod/3e4db10a-9da1-4b44-80d8-c128f42764a8.json',
    method: 'get',
    params: {},
    headers: {}
  });
};

export const getLocal = () => {
  // 在vue3中静态文件全部放在public中，vue打包后会自动去public中找需要访问的静态文件名，故此url只需要填写文件名即可不需要外部的
  // public地址，如果填写了地址反而会找不到文件而报错；
  return request({
    url: 'local.json',
    method: 'get',
    params: {},
    headers: {}
  });
};

export const getMock = () => {
  return request({
    url: '/api/users',
    method: 'get',
    params: {},
    headers: {}
  });
};

export const getMysql = (id: number) => {
  return request({
    url: `/api/apilist`,
    method: 'get',
    params: { id },
    headers: {}
  });
};

export const getToken = (params: object) => {
  return request({
    url: '/uaa/token',
    method: 'post',
    data: { ...params },
    headers: {}
  });
};
