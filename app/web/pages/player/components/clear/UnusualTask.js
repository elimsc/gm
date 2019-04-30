import React from 'react';
import { Button, message } from 'antd';

import { clearUnTask } from '../../../../service/clear';

class UnusualTask extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleClick = () => {
    this.setState({ loading: true });
    clearUnTask().then(data => {
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
        <Button loading={this.loading} size="large" onClick={() => this.handleClick()} block type="danger">点击清除非正常任务</Button>
      </div>
    );
  }
}

export default UnusualTask;
