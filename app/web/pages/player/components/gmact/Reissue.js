import React from 'react';
import { Card, Form, Input, Button, message, Modal, Select } from 'antd';

import { reIssue } from '../../../../service/gmact';


class Reissue extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleSubmit = (e) => {
    const { guid, part_id, uid } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Modal.confirm({
          title: '确认操作',
          content: '确认进行该操作？',
          onOk: () => {
            this.setState({ loading: true });
            reIssue({ ...values, guid, part_id }).then(data => {
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
      <Form {...formItemLayout} style={{ marginTop: 50 }} onSubmit={this.handleSubmit}>
        <Form.Item
          label="支付类型"
        >
          {getFieldDecorator('pay_type', {
            rules: [{
              required: true, message: '支付类型不能为空',
            }],
          })(
            <Select>
              <Select.Option value={36}>PayNow</Select.Option>
              <Select.Option value={0}>IAP</Select.Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label="订单号"
        >
          {getFieldDecorator('cp_order_id', {
            rules: [{
              required: true, message: '订单号不能为空',
            }],
          })(
            <Input />
          )}
        </Form.Item>

        <Form.Item
          label="配表id"
        >
          {getFieldDecorator('diamond_id', {
            rules: [{
              required: true, message: '配表id不能为空',
            }],
          })(
            <Input />
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button loading={this.state.loading} type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(Reissue);
