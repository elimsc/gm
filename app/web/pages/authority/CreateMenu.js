import React from 'react';
import { Card, Form, Input, Button, message } from 'antd';

import { createMenu } from '../../service/authority';

class CreateMenu extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.form.resetFields();
        createMenu(values).then(data => {
          if (data.code === 0) {
            message.success('添加成功');
          } else {
            message.error('添加失败，请重试');
          }
        })
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
        <Form {...formItemLayout} style={{ marginTop: 50 }} onSubmit={this.handleSubmit}>
          <Form.Item
            label="菜单名"
          >
            {getFieldDecorator('menu_name', {
              rules: [{
                required: true, message: '菜单名不能为空',
              }],
            })(
              <Input placeholder="菜单名" />
            )}
          </Form.Item>
          <Form.Item
            label="菜单层次"
          >
            {getFieldDecorator('menu_sid', {
              rules: [{
                required: true, message: '不能为空',
              }],
            })(
              <Input placeholder="ex: 1-1-1" />
            )}
          </Form.Item>
          <Form.Item
            label="相关后端url"
          >
            {getFieldDecorator('urls')(
              <Input.TextArea placeholder="GET /api/xxxx 每行一个值" rows={5} />
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

export default Form.create()(CreateMenu);
