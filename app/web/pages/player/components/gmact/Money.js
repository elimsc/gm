import React from 'react';
import { Form, Input, Button, message } from 'antd';


class Money extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        message.info('数据已提交');
      }
    });
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
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="点券">
          {getFieldDecorator('dianquan', {
              rules: [],
              initialValue: 0,
            })(
              <Input />
            )}
        </Form.Item>
        <Form.Item label="银两">
          {getFieldDecorator('yinliang', {
              rules: [],
              initialValue: 0,
            })(
              <Input />
            )}
        </Form.Item>
        <Form.Item label="仙缘">
          {getFieldDecorator('xianyuan', {
              rules: [],
              initialValue: 0,
            })(
              <Input />
            )}
        </Form.Item>
        <Form.Item label="绑定仙缘">
          {getFieldDecorator('bound-xianyuan', {
              rules: [],
              initialValue: 0,
            })(
              <Input />
            )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">发放</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(Money);
