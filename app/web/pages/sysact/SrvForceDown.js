import React from 'react';

import { Form, Input, Button, Card, message, Select } from 'antd';

class SrvForceDown extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        message.info('功能未实现');
      }
    });
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
        sm: { span: 10 }
      }
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 8 },
      }
    }

    return (
      <Card>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 40 }}>
          <Form.Item label="选择服务器">
            {getFieldDecorator('srv', {
              rules: [{ required: true, message: '请选择服务器' }]
            })(
              <Select placeholder="请选择服务器">
                <Select.Option value="srv1">服务器1</Select.Option>
                <Select.Option value="srv2">服务器2</Select.Option>
                <Select.Option value="srv3">服务器3</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="danger" htmlType="submit">强制下线</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(SrvForceDown);
