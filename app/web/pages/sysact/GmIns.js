import React from 'react';

import { Form, Input, Button, Card, message } from 'antd';

class GmIns extends React.Component {

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
          <Form.Item label="GM指令">
            {getFieldDecorator('ins', {
              rules: [{ required: true, message: '内容不能为空' }]
            })(
              <Input.TextArea rows={5} placeholder="请输入要加载的GM指令" />
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

export default Form.create()(GmIns);
