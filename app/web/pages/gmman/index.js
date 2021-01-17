import React from 'react';
import { Button, Table, Card, Modal, Form, Select, Input, message } from 'antd';

import { list, update, deleteById } from '../../service/user';

const role_map = {
  1: '普通管理员',
  2: '运营管理员',
  3: '超级管理员',
}


class GmMan extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      selectUser: {},
      showUpdateModal: false,
      filter: {},
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
    list({ ...this.state.filter, ...params }).then(data => {
      if (data.code === 0) {
        const pagination = { ...this.state.pagination };
        pagination.total = data.payload.count;
        this.setState({
          loading: false,
          data: data.payload.users,
          pagination,
        });
      }
    })

  }

  handleUpdate = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['id', 'role', 'password'], (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        update(values).then(data => {
          if (data.code === 0) {
            message.success('修改成功');
          } else {
            message.error('修改失败');
          }
          this.setState({ loading: false, showUpdateModal: false });
          this.fetch({
            pageSize: this.state.pagination.pageSize,
            page: this.state.pagination.current,
          })
        });
      }
    });
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['username'], (err, values) => {
      if (!err) {
        this.setState((prevState, prevProps) => (
          { loading: true, filter: { username: values['username'], pagination: { ...prevState.pagination, current: 1 } } }
        ));
        this.fetch({
          pageSize: this.state.pagination.pageSize,
          page: 1,
          username: values['username'],
        });
      }
    });
  }

  handleDelete = record => {
    this.setState({ loading: true });
    deleteById(record.id).then(data => {
      this.setState({ loading: false });
      if (data.code === 0) {
        message.success('修改成功');
        this.fetch({
          pageSize: this.state.pagination.pageSize,
          page: this.state.pagination.current,
        });
      } else {
        message.error('修改失败');
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: '用户名',
      dataIndex: 'username',
    }, {
      title: '角色',
      dataIndex: 'role',
      render: role => {
        if (role) {
          return role_map[role];
        } else {
          return '普通管理员';
        }
      },
    }, {
      title: '操作',
      render: (record) => (
        <div>
          <Button onClick={() => {
            this.setState({ selectUser: record, showUpdateModal: true })
          }} type="primary">编辑</Button>
          <Button style={{ marginLeft: 7 }} onClick={() => {
            Modal.confirm({
              title: '确认删除该管理员?',
              onOk: () => {
                this.handleDelete(record);
              }
            })
          }} type="danger">删除</Button>
        </div>
      ),
    }];

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    const formTailLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18, offset: 4 },
    };

    if (!Array.isArray(this.state.data) || this.state.data.length === 0) return null;

    return (
      <Card>
        <Modal
          onCancel={() => this.setState({ showUpdateModal: false })}
          footer={null}
          destroyOnClose
          visible={this.state.showUpdateModal}
        >
          <Form style={{ marginTop: 40 }} onSubmit={this.handleUpdate}>
            {getFieldDecorator('id', {
              initialValue: this.state.selectUser.id,
            })(
              <Input type="hidden" />
            )}
            <Form.Item label="权限" {...formItemLayout}>
              {getFieldDecorator('role', {
                initialValue: this.state.selectUser.role ? this.state.selectUser.role : 1,
                rules: [{
                  required: true,
                  message: '请选择权限',
                }],
              })(
                <Select>
                  <Select.Option value={1}>{role_map[1]}</Select.Option>
                  <Select.Option value={2}>{role_map[2]}</Select.Option>
                  <Select.Option value={3}>{role_map[3]}</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="密码" {...formItemLayout}>
              {getFieldDecorator('password', {
              })(<Input type="password" placeholder="保留空白说明不修改" />)}
            </Form.Item>
            <Form.Item {...formTailLayout}>
              <Button htmlType="submit" type="primary">提交</Button>
            </Form.Item>

            <div style={{ marginLeft: 30, marginTop: -10 }}>
              普通管理员：仅具有浏览玩家信息权限 <br />
              运营管理员：浏览+修改玩家数据权限+服务器广播权限 <br />
              超级管理员：拥有所有权限+管理GM用户 <br />
            </div>
          </Form>
        </Modal>
        <Form layout="inline" onSubmit={this.handleSearch}>
          <Form.Item label="用户名">
            {getFieldDecorator('username', {
            })(
              <Input placeholder="精确的用户名" />
            )}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >
              查询
            </Button>
          </Form.Item>
        </Form>
        <Table
          style={{ marginTop: 30 }}
          columns={columns}
          rowKey={record => record.id}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </Card>
    );
  }
}

export default Form.create()(GmMan);
