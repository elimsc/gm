import React from 'react';
import { Button, message } from 'antd';

import { forcedown } from '../../../../service/gmact';

class Forcedown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleClick = () => {
    this.setState({ loading: true });
    forcedown().then(data => {
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
        <Button size="large" onClick={() => this.handleClick()} block type="danger" loading={this.state.loading}>点击强制下线</Button>
      </div>
    );
  }
}

export default Forcedown;
