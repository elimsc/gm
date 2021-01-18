import React from 'react';

import { Form, Input, Button, message, Modal } from 'antd';

import { delMail } from '../../../../service/gmact';

class DelMail extends React.Component {

  handleSubmit = e => {
    const { part_id, guid } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const mail_id_list = values.mail_id_list.trim().split("\n").map(v => v.trim());
      if (!err) {
        Modal.confirm({
          title: '确认操作',
          content: '确认执行该操作？',
          onOk: () => {
            delMail({ mail_id_list, part_id, guid }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('出错了');
              }
              this.props.form.resetFields();
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
        <Form.Item label="邮件GUID">
          {getFieldDecorator('mail_id_list', {
            rules: [{ required: true, message: '内容不能为空' }]
          })(
            <Input.TextArea rows={8} placeholder="每行一个GUID值" />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(DelMail);
