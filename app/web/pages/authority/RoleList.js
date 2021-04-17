import React from 'react';
import { Button, Table, Card, Modal, Form, Select, Input, message, Icon } from 'antd';

import { roleList, deleteRole } from '../../service/authority';
import router from 'umi/router';


class RoleList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      selected: {},
    }
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    this.setState({ loading: true });
    roleList().then(data => {
      if (data.code === 0) {
        this.setState({
          loading: false,
          data: data.payload,
        });
      }
    })
  }


  handleDelete = record => {
    this.setState({ loading: true });
    deleteRole(record).then(data => {
      this.setState({ loading: false });
      if (data.code === 0) {
        message.success('修改成功');
        this.fetch();
      } else {
        message.error('修改失败');
      }
    })
  }



  render() {
    const channel_map = {
      '-1': '所有渠道',
      '3': '天拓',
    }

    const columns = [
      {
        title: '角色名',
        dataIndex: 'role_name',
      },
      {
        title: '渠道',
        dataIndex: 'channel_id',
        render: channel_id => {
          if (channel_id) {
            return channel_map[channel_id];
          }
          return '所有渠道';
        },
      },
      {
        title: '操作',
        render: (record) => (
          <div>
            <Button onClick={() => {
              router.push(`./editrole?id=${record.id}`);

            }} type="primary">编辑</Button>
            <Button style={{ marginLeft: 7 }} onClick={() => {
              Modal.confirm({
                title: '确认删除该角色?',
                onOk: () => {
                  this.handleDelete(record);
                }
              })
            }} type="danger">删除</Button>
          </div>
        ),
      }];


    if (!Array.isArray(this.state.data)) return null;

    return (
      <Card>
        <Table
          style={{ marginTop: 30 }}
          columns={columns}
          rowKey={record => record.id}
          dataSource={this.state.data}
          loading={this.state.loading}
        />
      </Card>
    );
  }
}

export default RoleList;
