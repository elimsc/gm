import React from 'react';
import BaseLayout from './BaseLayout';
import LoginLayout from './LoginLayout';
import { message } from 'antd';

const BasicLayout = props => {
  message.config({
    top: 24,
    duration: 2,
    maxCount: 3,
  });
  if (props.location.pathname === '/login') {
    return (
      <LoginLayout>
        {props.children}
      </LoginLayout>
    );
  }
  return (
    <BaseLayout>
      {props.children}
    </BaseLayout>
  );
};

export default BasicLayout;
