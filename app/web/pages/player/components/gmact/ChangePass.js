import React from 'react';
import { Card, Form, Input, Button, message, Modal } from 'antd';

import { changePass } from '../../../../service/gmact';


class ChangePass extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleSubmit = (e) => {
    const { guid, part_id, uid } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Modal.confirm({
          title: '确认操作',
          content: '确认设置新的密码？',
          onOk: () => {
            this.setState({ loading: true });
            changePass({ value: values['password'], uid, part_id }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('操作失败');
              }
              this.setState({ loading: false });
              this.props.form.resetFields();
            });
          }
        });
      }
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的安全码不一致');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
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
          span: 8,
          offset: 6,
        },
      },
    };

    return (
      <Form {...formItemLayout} style={{ marginTop: 50 }} onSubmit={this.handleSubmit}>
        <Form.Item
          label="新密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '密码不能为空',
            }],
          })(
            <Input type="password" placeholder="新密码" />
          )}
        </Form.Item>
        <Form.Item
          label="确认新密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              validator: this.compareToFirstPassword
            }],
          })(
            <Input type="password" placeholder="确认新密码" />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button loading={this.state.loading} type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(ChangePass);
