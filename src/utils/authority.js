import Cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import { message } from 'antd';
import { history } from 'umi';
// import { reloadAuthorized } from './Authorized'; // use localStorage to store the authority info, which might be sent from server in actual project.
// import ModelAuth from '../models/login';
message.config({
  maxCount: 1,
});

//获取随机数
const generateRandomString = (length) => {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const getUserInfo = (token) => {
  let _token = token
      ? token
      : Cookie.load('access_token') || sessionStorage.getItem('access_token'),
    _data = {
      id: null,
      name: null,
      email: null,
      phone: null,
      roles: null,
      source: null,
      modules: null,
    };
  if (_token) {
    try {
      const decode = jwt_decode(_token);
      if (decode && decode.userInfo) {
        const {
          id,
          name,
          email,
          phone,
          internalTimezone,
          roles,
          source,
          modules,
          status,
        } = decode.userInfo;
        const { exp } = decode;
        return {
          id,
          name,
          status,
          internalTimezone,
          email,
          phone,
          // roles: [...roles, ...modules, "EVIEW"],
          roles: [...roles, ...modules],
          source,
          exp,
        };
      }
      return null;
    } catch (error) {
      message.error('非法操作，请登录后重新访问。', 1, () => {
        history.push('/user/login');
      });

      return new Error('这是一个无效的token');
    }
  } else {
    message.error('您处于未登录状态，请登录后进行访问。', 1, async () => {
      // ModelAuth.effects.logout({ statusCode: 401 });
    });
    return null;
  }
};

export function getAuthority(str) {
  let _token =
      Cookie.load('access_token') || sessionStorage.getItem('access_token'),
    _data = {
      roles: null,
    },
    currentRoles = '';
  if (_token) {
    const decode = jwt_decode(_token);
    if (decode && decode.userInfo) {
      const { roles, modules } = decode.userInfo;
      currentRoles = [...roles, ...modules];
    }
  }
  const authorityString =
    typeof str === 'undefined' && currentRoles.length > 0
      ? JSON.stringify(currentRoles)
      : str;

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  }

  return authority;
}

//modules表示用户是否包含外部模块，若包含外部模块将其写入role，做为左侧导航判断
// export function setAuthority() {
//   reloadAuthorized();
// }
