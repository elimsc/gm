import React from 'react';
import router from 'umi/router';

import { check } from '../service/login';


class LoginLayout extends React.PureComponent {

  async componentDidMount() {
    const data = await check();
    if (data.code === 0 ) {
      router.replace('/'); // 跳转到后台首页
    }
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

export default LoginLayout;
