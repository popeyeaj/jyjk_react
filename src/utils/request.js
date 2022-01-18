/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { getLocale, connect, history } from 'umi';
import { notification, message } from 'antd';
import ModelAuth from '../models/login';
import Cookie from 'react-cookies';
import { SITE_SOURCE } from '@/config/config';
import moment from 'moment';

message.config({
  maxCount: 1,
});
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
const ignoreErrType = ['AbortError'];

/** 异常处理程序 */
let isAuthorized = true;
const errorHandler = async (error) => {
  const { response, data } = error;

  if (response && response.status) {
    const errorText = data.message || codeMessage[response.status];
    const { status, url } = response;
    if (status === 401) {
      if (isAuthorized) {
        isAuthorized = false;
        if (location.pathname === '/user/login') {
          message.error('页面链接已失效，即将返回登录页。', 2);
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          message.error('登录状态已失效，请重新登录。', 2);
          setTimeout(ModelAuth.effects.logout, 2000, { statusCode: 401 });
        }
      }
    } else {
      message.error(`请求错误 ${status}，errorText`, 2);
    }
  } else if (!response) {
    let { type } = error;
    if (ignoreErrType.indexOf(type.trim()) === -1) {
      message.error(`您的网络发生异常，无法连接服务器。`, 2);
    }
  }

  return error;
};

/** 配置request请求时的默认参数 */

const request = extend({
  errorHandler,
  responseType: 'json',
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});
request.interceptors.request.use((response, options) => {
  const lange = getLocale();
  let headers = {
    'Accept-Language': lange,
    'internal-entity': SITE_SOURCE,
    'internal-timezone': moment()._z.name,
    SameSite: 'None',
  };
  if (Cookie.load('access_token') || sessionStorage.getItem('access_token')) {
    isAuthorized = true;
    headers.Authorization = `Bearer ${
      Cookie.load('access_token') || sessionStorage.getItem('access_token')
    }`;
  }
  return {
    options: { ...options, headers },
  };
});
request.use(async (ctx, next) => {
  await next();
  let { req, res } = ctx;

  if (res) {
    if (res.status === 400) {
      //若出现该错误统一拦截（系统管理员、销售管理员调用最后一步接口除外）
      if (
        //若两个管理员同时修改一个企业统一拦截
        (res?.data?.errorCode === 'error.users.user_has_updated' &&
          !req?.url?.includes('processNewEnterpriseByPreview') &&
          !req?.url?.includes('addOrUpdateUserByPreview')) ||
        //该企业的销售管理员变更统一拦截
        (res?.data?.errorCode === 'error.users.admin_has_changed' &&
          !req?.url?.includes('processNewEnterpriseByPreview'))
      ) {
        message.error(res.message, 2);
        setTimeout(() => {
          let getUserId = location.pathname.match(
            new RegExp('/user/(.*)/units/edit'),
          )?.[1];

          switch (res?.data?.errorCode) {
            case 'error.users.user_has_updated':
              if (getUserId) {
                history.push(`/settings/user/${getUserId}/detail`);
              }
              break;
            case 'error.users.admin_has_changed':
              history.push(`/settings/user`);
              break;
          }
        }, 1000);
      }
    }
  }
});
export default request;
