/**
 * 联盟操作
 */

import React from 'react';
import { Button, message, Modal } from 'antd';
import { dismiss } from '../../../service/gang';

class Act extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleClick = () => {
    const { part_id, gang_guid } = this.props;
    Modal.confirm({
      title: '确认操作',
      content: '确认解散该联盟？',
      onOk: () => {
        this.setState({ loading: true });
        dismiss({ part_id, gang_guid }).then(data => {
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
        <Button loading={this.state.loading} size="large" onClick={() => this.handleClick()} block type="danger">解散联盟</Button>
      </div >
    );
  }
}

export default Act;
