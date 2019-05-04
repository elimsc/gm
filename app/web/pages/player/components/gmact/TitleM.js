import React from 'react';
import { Form, Input, Button, message, Divider, Select } from 'antd';

import { titlem } from '../../../../service/gmact';


class TitleM extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading1: false,
      loading2: false,
    }
  }

  handleSubmit1 = (e) => {
    const {guid, part_id} = this.props; 
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(['add_title'], (err, values) => {
      if (!err) {
        console.log(values);
        this.setState({ loading1: true });
        titlem({ type: 1, data: values, guid, part_id }).then(data => {
          if (data.code === 0) {
            message.success('操作成功');
          } else {
            message.error('操作失败');
          }
          this.setState({ loading1: false });
          this.props.form.resetFields(['add_title']);
        });
      }
    });
  }

  handleSubmit2 = (e) => {
    const {guid, part_id} = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(['del_title'], (err, values) => {
      if (!err) {
        console.log(values);
        this.setState({ loading2: true });
        titlem({ type: 2, data: values, guid, part_id }).then(data => {
          if (data.code === 0) {
            message.success('操作成功');
          } else {
            message.error('操作失败');
          }
          this.setState({ loading2: false });
          this.props.form.resetFields(['del_title']);
        });

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
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit1} style={{ marginTop: 30 }}>
          <Form.Item label="添加称号">
            {getFieldDecorator('add_title', {
              rules: [{
                required: true, message: '不能为空'
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
        <Divider />

        <Form {...formItemLayout} onSubmit={this.handleSubmit2} style={{ marginTop: 50 }}>
          <Form.Item label="删除称号">
            {getFieldDecorator('del_title', {
              rules: [{
                required: true, message: '不能为空'
              }],
            })(
              <Select placeholder="选择称号">
                <Select.Option value="1">称号1</Select.Option>
                <Select.Option value="2">称号2</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout} >
            <Button type="danger" htmlType="submit">删除</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(TitleM);
