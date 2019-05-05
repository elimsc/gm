import React from 'react';
import { Button, Table, Card, Modal, Form, Select, Input, message } from 'antd';

import { list, changeRole } from '../../service/user';

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
      showAuthorityModal: false,
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
      setTimeout(() => {
        if (data.code === 0) {
          const pagination = { ...this.state.pagination };
          pagination.total = data.payload.count;
          this.setState({
            loading: false,
            data: data.payload.users,
            pagination,
          });
        }
      }, 200);
    })

  }

  handleAuthoritySubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['id', 'role'], (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        changeRole(values).then(data => {
          if (data.code === 0) {
            message.success('修改成功');
          } else {
            message.error('修改失败');
          }
          this.setState({ loading: false, showAuthorityModal: false });
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
        <div><Button onClick={() => {
          this.setState({ selectUser: record, showAuthorityModal: true })
        }} type="primary">编辑权限</Button></div>
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

    return (
      <Card>
        <Modal
          onCancel={() => this.setState({ showAuthorityModal: false })}
          footer={null}
          destroyOnClose
          visible={this.state.showAuthorityModal}
        >
          <Form style={{ marginTop: 40 }} onSubmit={this.handleAuthoritySubmit}>
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
            <Form.Item {...formTailLayout}>
              <Button htmlType="submit" type="primary">提交</Button>
            </Form.Item>
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
