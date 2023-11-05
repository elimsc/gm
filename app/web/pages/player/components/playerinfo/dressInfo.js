import React from 'react';
import { Input, Divider, Tabs } from 'antd';
import TableInfoList from '@/components/TableInfoList';


class DressInfo extends React.PureComponent {
  render() {
    console.log(this.props.data);
    return (
     <Tabs>
      <Tabs.TabPane tab="头像" key='1'>
        <TableInfoList data={this.props.data.headlist} defaultPageSize={20} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="头像框" key='2'>
        <TableInfoList data={this.props.data.headframelist} defaultPageSize={20} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="名片" key='3'>
        <TableInfoList data={this.props.data.backgroudlist} defaultPageSize={20} />
      </Tabs.TabPane>
     </Tabs>
    );
  }
}

export default DressInfo;
