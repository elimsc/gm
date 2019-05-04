import React from 'react';
import { Form, Input, Button, message } from 'antd';

import { changeSecureCode } from '../../../../service/gmact';


class SecureCode extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleSubmit = (e) => {
    const {guid, part_id} = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.setState({ loading: true });
        changeSecureCode({ value: values['secure_code'], guid, part_id }).then(data => {
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

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('secure_code')) {
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
          label="新安全码"
        >
          {getFieldDecorator('secure_code', {
            rules: [{
              required: true, message: '安全码不能为空',
            }],
          })(
            <Input type="password" placeholder="新安全码" />
          )}
        </Form.Item>
        <Form.Item
          label="确认新安全码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              validator: this.compareToFirstPassword
            }],
          })(
            <Input type="password" placeholder="确认新安全码" />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button loading={this.state.loading} type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(SecureCode);
