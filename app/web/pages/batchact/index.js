import React from 'react';
import { Card, Form, Input, Button, message, Select, Upload, Icon } from 'antd';

class BatchAct extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        message.info('当前功能尚未实现');
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
              label="操作类型"
            >
            {getFieldDecorator('type', {
              rules: [{
                required: true, message: '操作类型不能为空',
              }],
            })(
              <Select placeholder="请选择操作类型">
                <Select.Option value="1">批量增加道具</Select.Option>
                <Select.Option value="2">批量删除道具</Select.Option>
                <Select.Option value="3">批量封号</Select.Option>
                <Select.Option value="4">批量禁言</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="批量操作文件(txt)"
          >
            {getFieldDecorator('file', {
              rules: [{
                required: true, message: '文件不能为空',
              }],
            })(
              <Upload>
                <Button><Icon type="upload" /> 点击上传</Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="原因"
          >
            {getFieldDecorator('confirm', {
              rules: [],
            })(
              <Input.TextArea placeholder="说明原因" rows={6} />
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

export default Form.create()(BatchAct);
