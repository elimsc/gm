import React from 'react';
import { Table } from 'antd';

class BanAccountLog extends React.Component {
  render() {
    const data = this.props.data;

    const columns = [
      {
        title: '账户UID',
        dataIndex: 'uid',
        key: 'uid',
      },
      {
        title: '区号',
        dataIndex: 'part_id',
        key: 'pard_id',
      },
      {
        title: '封号结束时间',
        dataIndex: 'end_time',
        key: 'end_time',
      },
      {
        title: '封号时间',
        dataIndex: 'gm_time',
        key: 'gm_time',
      },
    ];
    return (
      <Table dataSource={data} columns={columns} style={{ marginLeft: 10 }} />
    );
  }
}

export default BanAccountLog;
