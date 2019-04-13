import React from 'react';
import { Card, Form, Input, Button, message, Select } from 'antd';

import { create } from '../../service/user';

class Authority extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.form.resetFields();
        create(values).then(data => {
          if (data.code === 0) {
            message.success('添加管理员成功');
          } else {
            message.error('添加失败，请重试');
          }
        })
      }
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Card>
        <Form {...formItemLayout} style={{marginTop: 50}} onSubmit={this.handleSubmit}>
          <Form.Item
              label="用户名"
            >
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: '用户名不能为空',
              }],
            })(
              <Input placeholder="用户名" />
            )}
          </Form.Item>
          <Form.Item
            label="权限"
          >
            {getFieldDecorator('role', {
              rules: [{
                required: true, message: '权限不能为空',
              }],
            })(
              <Select placeholder="设置权限">
                <Select.Option value={1}>普通管理员</Select.Option>
                <Select.Option value={2}>运营管理员</Select.Option>
                <Select.Option value={3}>超级管理员</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="确认密码"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                validator: this.compareToFirstPassword
              }],
            })(
              <Input type="password" placeholder="确认密码" />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(Authority);
