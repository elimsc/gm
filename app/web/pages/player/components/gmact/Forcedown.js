import React from 'react';
import { Button, message } from 'antd';


class Forcedown extends React.Component {

  handleClick = () => {
    message.info('提交成功');
  }

  render() {
    return (
      <div style={{width: '30%', margin: '50px auto'}}>
        <Button size="large" onClick={() => this.handleClick() } block type="danger">点击强制下线</Button>
      </div>
    );
  }
}

export default Forcedown;
