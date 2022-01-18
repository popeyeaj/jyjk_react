import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Cookie from 'react-cookies';
import { history } from 'umi';
const cookieExpirationDays = 30;
export default (props) => {
  const [isLogined, setIsLogined] = useState(false);

  const doLogin = () => {
    setIsLogined(true);
    const expires = new Date();
    expires.setTime(
      expires.getTime() + 1000 * 60 * 60 * 32 * cookieExpirationDays,
    );
    Cookie.save(
      'access_token',
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2MGZmYTM3MmZmYzcwYzNlYWFkZDFkYmIiLCJhdXRoIjoic2FsZXNfYWRtaW4iLCJ1c2VySW5mbyI6eyJpZCI6IjYwZmZhMzcyZmZjNzBjM2VhYWRkMWRiYiIsIm5hbWUiOiJldmFuX3NhbGUxIiwiZW1haWwiOiJldmFuX3NhbGUxMDE2QG90aXMuY29tIiwicGhvbmUiOiIxMzEyMTI4MTAxNiIsInRva2VuIjpudWxsLCJyb2xlcyI6WyJzYWxlc19hZG1pbiJdLCJzdGF0dXMiOiJhY3RpdmF0ZWQiLCJzb3VyY2UiOiJPQ0wiLCJjb3VudHJ5Q29kZSI6IkNITiIsImludGVybmFsVGltZXpvbmUiOiJBc2lhL1NoYW5naGFpIiwibGFuZ3VhZ2VJZCI6bnVsbCwidGVybXNBY2NlcHRlZEF0IjoiMjAyMS0xMC0xNFQwOTo0MDoyMy42NzdaIiwibW9kdWxlcyI6W10sInBhc3N3b3JkU2V0Ijp0cnVlfSwiZXhwIjoxNjQ1MDc1NTc3fQ.vfbZFGU5EjD_KMrL5BQHptsRBucKGW9o7P6ceODHm64vq0ptunLFrU8QSfqGCtRPDrmU1KS5KYENwvXvbJE0_g',
      {
        path: '/',
        expires,
      },
    );
    history.push('/');
  };

  return (
    <>
      <Helmet>
        <title>login</title>
      </Helmet>
      {!isLogined && (
        <button type="button" onClick={doLogin}>
          登录
        </button>
      )}
    </>
  );
};
