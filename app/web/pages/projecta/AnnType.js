import React from 'react';
import { Button, Table, Card, Modal, Form, Select, Input, message } from 'antd';

import { createType, listType, deleteType, updateType } from '../../service/projectAAnn';


class AnnType extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      types: [],
      loading: false,
      showUpdateModal: false,
      showCreateModal: false,
      selectType: {},
    }
  }

  componentDidMount() {
    this.fetch();
  }


  fetch(params = {}) {
    this.setState({ loading: true });
    listType().then(data => {
      if (data.code === 0) {
        this.setState({
          loading: false,
          types: data.payload,
        });
      }
    })

  }

  handleDelete(record) {
    deleteType({id:record.id}).then(data => {
      if (data.code === 0) {
        message.success('删除成功');
      } else {
        message.error('删除失败');
      }
      this.fetch();
    });
    this.fetch();
  }

  handleUpdate = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['id', 'identity', 'name'], (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        updateType(values).then(data => {
          if (data.code === 0) {
            message.success('修改成功');
          } else {
            message.error('修改失败');
          }
          this.setState({ loading: false, showUpdateModal: false });
          this.fetch();
        });
      }
    });
  }

  handleCreate = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['identity', 'name'], (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        createType(values).then(data => {
          if (data.code === 0) {
            message.success('创建成功');
          } else {
            message.error('创建失败');
          }
          this.setState({ loading: false, showCreateModal: false });
          this.fetch();
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: '唯一标识',
      dataIndex: 'identity',
    }, {
      title: '名称',
      dataIndex: 'name',
    }, {
      title: '操作',
      render: (record) => (
        <div>
          <Button onClick={() => {
            this.setState({ selectType: record, showUpdateModal: true })
          }} type="primary">编辑</Button>
          <Button style={{ marginLeft: 7 }} onClick={() => {
            Modal.confirm({
              title: '确认删除?',
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


    return (
      <Card>
        <Button type='primary' onClick={() => this.setState({showCreateModal: true})}>新建公告类型</Button>
        <Modal
          onCancel={() => this.setState({ showUpdateModal: false })}
          footer={null}
          destroyOnClose
          visible={this.state.showUpdateModal}
        >
          <Form style={{ marginTop: 40 }} onSubmit={this.handleUpdate}>
            {getFieldDecorator('id', {
              initialValue: this.state.selectType.id,
            })(
              <Input type="hidden" />
            )}
            <Form.Item label="唯一标识" {...formItemLayout}>
            {getFieldDecorator('identity', {
              initialValue: this.state.selectType.identity,
            })(
              <Input disabled />
            )}
            </Form.Item>
            <Form.Item label="名称" {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: this.state.selectType.name,
              })(<Input type="text" />)}
            </Form.Item>
            <Form.Item {...formTailLayout}>
              <Button htmlType="submit" type="primary">提交</Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          onCancel={() => this.setState({ showCreateModal: false })}
          footer={null}
          destroyOnClose
          visible={this.state.showCreateModal}
        >
          <Form style={{ marginTop: 40 }} onSubmit={this.handleCreate}>
            <Form.Item label="唯一标识" {...formItemLayout}>
            {getFieldDecorator('identity', {
            })(
              <Input type="text" />
            )}
            </Form.Item>
            <Form.Item label="名称" {...formItemLayout}>
              {getFieldDecorator('name', {
              })(<Input type="text" />)}
            </Form.Item>
            <Form.Item {...formTailLayout}>
              <Button htmlType="submit" type="primary">提交</Button>
            </Form.Item>
          </Form>
        </Modal>

        <Table
          style={{ marginTop: 30 }}
          columns={columns}
          rowKey={record => record.id}
          dataSource={this.state.types}
          loading={this.state.loading}
        />
      </Card>
    );
  }
}

export default Form.create()(AnnType);
