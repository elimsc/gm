import React from 'react';
import { Button, message, Modal } from 'antd';

import { untiePhone } from '../../../../service/gmact';

class UntiePhone extends React.Component {
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
      content: '确认解除绑定手机？',
      onOk: () => {
        this.setState({ loading: true });

        untiePhone({ uid, part_id }).then(data => {
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
        <Button loading={this.state.loading} size="large" onClick={() => this.handleClick()} block type="danger">点击解除当前绑定手机</Button>
      </div>
    );
  }
}

export default UntiePhone;
