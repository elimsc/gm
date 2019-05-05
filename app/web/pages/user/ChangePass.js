import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { connect } from 'dva';

import { changePass } from '../../service/user';

@connect(({ global }) => ({ global }))
class ChangePass extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.form.resetFields();
        changePass({ ...values, part_id: this.props.global.part_id }).then(data => {
          if (data.code === 0) {
            message.success('修改密码成功');
          } else {
            message.error('操作失败');
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
      <div>
        <Form {...formItemLayout} style={{ marginTop: 50 }} onSubmit={this.handleSubmit}>
          <Form.Item
            label="密码"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '密码不能为空',
              }],
            })(
              <Input type="password" placeholder="密码" />
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
      </div>
    );
  }
}

export default Form.create()(ChangePass);
