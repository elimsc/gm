import React from 'react';
import { Form, Input, Button, message, DatePicker } from 'antd';


class BanTalk extends React.Component {

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
        <Form.Item label="禁言时长">
          {getFieldDecorator('time-range', {
              rules: [{ type: 'array', required: true, message: '请输入禁言的时长' }],
            })(
              <Input placeholder="单位为分钟" />
            )}
        </Form.Item>
        <Form.Item label="原因">
          {getFieldDecorator('reason', {
              rules: [{
                required: true, message: '请输入禁言原因',
              }],
            })(
              <Input.TextArea rows={5} placeholder="禁言原因" />
            )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="danger" htmlType="submit">禁言</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(BanTalk);
