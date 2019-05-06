import React from 'react';
import router from 'umi/router';

import { check } from '../service/login';
import { Layout } from 'antd';


class LoginLayout extends React.PureComponent {

  async componentDidMount() {
    const data = await check();
    if (data.code === 0) {
      router.replace('/'); // 跳转到后台首页
    }
  }

  render() {
    return (
      <Layout style={{ height: '100vh' }}>{this.props.children}</Layout>
    );
  }
}

export default LoginLayout;
