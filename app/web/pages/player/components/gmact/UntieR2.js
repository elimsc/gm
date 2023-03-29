import React from 'react';
import { Button, message, Modal } from 'antd';

import { untieR2 } from '../../../../service/gmact';

class UntieR2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleClick = () => {
    const { part_id, uid } = this.props;
    Modal.confirm({
      title: '确认操作',
      content: '确认解除R2Game账号绑定？',
      onOk: () => {
        this.setState({ loading: true });

        untieR2({ uid, part_id }).then(data => {
          if (data.code === 0) {
            message.success('操作成功');
          } else {
            message.error('操作失败');
          }
          this.setState({ loading: false });
        });
      }
    })
  }

  render() {
    return (
      <div style={{ width: '30%', margin: '50px auto' }}>
        <Button loading={this.state.loading} size="large" onClick={() => this.handleClick()} block type="danger">点击解除R2Game账号绑定</Button>
      </div>
    );
  }
}

export default UntieR2;
