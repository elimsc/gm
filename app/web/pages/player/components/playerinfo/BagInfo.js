import React from 'react';
import { Input, Divider, Tabs } from 'antd';
import TableInfoList from '@/components/TableInfoList';


class BagInfo extends React.PureComponent {


  render() {
    console.log(this.props.data);
    return (
     <Tabs defaultActiveKey='1'>
      <Tabs.TabPane tab="全部" key='1'>
        <TableInfoList data={this.props.data.total} defaultPageSize={20} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="物品" key='2'>
        <TableInfoList data={this.props.data.itemlist} defaultPageSize={20} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="装备" key='3'>
        <TableInfoList data={this.props.data.equiplist} defaultPageSize={20} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="觉醒者" key='4'>
        <TableInfoList data={this.props.data.herofraglist} defaultPageSize={20} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="藏品" key='5'>
        <TableInfoList data={this.props.data.cangpinlist} defaultPageSize={20} />
      </Tabs.TabPane>
     </Tabs>
    );
  }
}

export default BagInfo;
