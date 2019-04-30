import React from 'react';
import { Button, message } from 'antd';

import { clearSecureCode } from '../../../../service/clear';


class ClearSecureCode extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleClick = () => {
    this.setState({ loading: true });
    clearSecureCode().then(data => {
      if (data.code === 0) {
        message.success('操作成功');
      } else {
        message.error('操作失败');
      }
      this.setState({ loading: false });
    })
  }

  render() {
    return (
      <div style={{ width: '30%', margin: '50px auto' }}>
        <Button loading={this.state.loading} size="large" onClick={() => this.handleClick()} block type="danger">点击清除当前安全码</Button>
      </div>
    );
  }
}

export default ClearSecureCode;
