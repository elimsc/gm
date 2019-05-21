import React from 'react';
import { Button, message, Modal } from 'antd';

import { clearUnGang } from '../../../../service/clear';

class UnusualGang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleClick = () => {
    const { part_id, guid } = this.props;
    Modal.confirm({
      title: '确认操作',
      content: '确认进行该操作？',
      onOk: () => {
        this.setState({ loading: true });
        clearUnGang({ part_id, guid }).then(data => {
          if (data.code === 0) {
            message.success('操作成功');
          } else {
            message.error('操作失败');
          }
          this.setState({ loading: false });
        })
      }
    })
  }

  render() {
    return (
      <div style={{ width: '30%', margin: '50px auto' }}>
        <Button loading={this.state.loading} size="large" onClick={() => this.handleClick()} block type="danger">点击清除非正常帮派数据</Button>
      </div >
    );
  }
}

export default UnusualGang;
