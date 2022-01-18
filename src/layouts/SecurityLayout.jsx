import { useState, useEffect } from 'react';
import { history } from 'umi';
import { getUserInfo } from '@/utils/authority';

const SecurityLayout = (props) => {
  const { children } = props;
  const [isLogined, setIsLogined] = useState(getUserInfo() ? true : false);
  useEffect(() => {
    let _isLogined = getUserInfo() ? true : false;
    if (!_isLogined) {
      setIsLogined(_isLogined);
      history.push('/user/login');
    }
  }, []);

  if (!isLogined) {
    return null;
  } else {
    return children;
  }
};

export default SecurityLayout;
