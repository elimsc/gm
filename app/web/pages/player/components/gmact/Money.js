import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { money } from '../../../../service/gmact';

/**
 * 发放货币
 */
class Money extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        money(values).then(data => {
          if (data.code === 0) {
            message.success('操作成功');
          } else {
            message.error('出错啦');
          }
        })
      }
    });
    this.props.form.resetFields();
    this.setState({ loading: false });
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
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 40 }}>
        <Form.Item label="点券">
          {getFieldDecorator('dianquan', {
            rules: [],
            initialValue: 0,
          })(
            <Input type="number" />
          )}
        </Form.Item>
        <Form.Item label="银两">
          {getFieldDecorator('yinliang', {
            rules: [],
            initialValue: 0,
          })(
            <Input type="number" />
          )}
        </Form.Item>
        <Form.Item label="仙缘">
          {getFieldDecorator('xianyuan', {
            rules: [],
            initialValue: 0,
          })(
            <Input type="number" />
          )}
        </Form.Item>
        <Form.Item label="绑定仙缘">
          {getFieldDecorator('bxianyuan', {
            rules: [],
            initialValue: 0,
          })(
            <Input type="number" />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={this.state.loading}>发放</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(Money);
