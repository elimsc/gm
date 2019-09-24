import React from 'react';

import { Form, Input, Button, Card, message, Modal } from 'antd';

import { gmIns } from '../../../../service/sysact';

class GmIns extends React.Component {

  handleSubmit = e => {
    const { part_id, guid } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        Modal.confirm({
          title: '确认操作',
          content: '确认执行该操作？',
          onOk: () => {
            gmIns({ ...values, part_id, guid }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('出错了');
              }
            })
          }
        });
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
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 40 }}>
        <Form.Item label="CMD">
          {getFieldDecorator('cmd', {
            rules: [{ required: true, message: '内容不能为空' }]
          })(
            <Input />
          )}
        </Form.Item>

        <Form.Item label="Content">
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '内容不能为空' }]
          })(
            <Input.TextArea rows={5} />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(GmIns);
