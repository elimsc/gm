import React from 'react';
import BaseLayout from './BaseLayout';
import LoginLayout from './LoginLayout';
import { message, LocaleProvider } from 'antd';

import zhCN from 'antd/lib/locale-provider/zh_CN';

const BasicLayout = props => {
  message.config({
    top: 24,
    duration: 2,
    maxCount: 3,
  });
  if (props.location.pathname === '/login') {
    return (
      <LocaleProvider locale={zhCN}>
        <LoginLayout style={{ opacity: 0 }}>
          {props.children}
        </LoginLayout>
      </LocaleProvider>
    );
  }
  return (
  <LocaleProvider locale={zhCN}>
    <BaseLayout>
      {props.children}
    </BaseLayout>
  </LocaleProvider>

  );
};

export default BasicLayout;
