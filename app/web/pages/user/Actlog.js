import React from 'react';
import { Table } from 'antd';
import moment from 'moment';

import { curActlogList } from '../../service/user';


/**
 * 管理员自身操作日志
 */
class ActLog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      // filter: {},
    }
  }

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      pageSize: pagination.pageSize,
      page: pagination.current,
    });
  }

  fetch(params = {}) {
    this.setState({ loading: true });
    curActlogList({ ...params }).then(data => {
      setTimeout(() => {
        if (data.code === 0) {
          const pagination = { ...this.state.pagination };
          pagination.total = data.payload.count;
          this.setState({
            loading: false,
            data: data.payload.logs,
            pagination,
          });
        }
      }, 200);
    })

  }



  render() {

    const columns = [{
      title: '操作者',
      dataIndex: 'subject',
    }, {
      title: '动作描述',
      dataIndex: 'action',
    }, {
      title: '操作对象（玩家）',
      dataIndex: 'object',
    }, {
      title: '区服',
      dataIndex: 'part_id',
    }, {
      title: '数据',
      dataIndex: 'data',
      width: 600,
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
          {text}
        </div>
      ),
    }, {
      title: '操作时间',
      dataIndex: 'created_at',
      render: (text, record) => {
        return moment(text).format("YYYY-MM-DD HH:mm:ss");
      }
    }];


    return (
      <Table
        style={{ marginTop: 10 }}
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default ActLog;
