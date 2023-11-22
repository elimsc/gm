/**
 * GM指令
 */
import React from 'react';
import { Form, Button, Input, Modal, message } from 'antd';

import { gmIns } from '../../../service/gang';

class GmIns extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleSubmit = e => {
    const { gang_guid, gang_id } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Modal.confirm({
          title: '确认操作',
          content: '确认执行该指令？',
          onOk: () => {
            this.setState({ loading: true });
            gmIns({ gang_guid, gang_id, ...values }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('出错啦');
              }
              this.props.form.resetFields();
              this.setState({ loading: false });
            });
          }
        });
      }
    });
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 4,
          offset: 4,
        },
      },
    };

    const { getFieldDecorator } = this.props.form;

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="CMD">
          {getFieldDecorator('command', {
            rules: [{ required: true, message: '不能为空' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="字符串参数" >
          {getFieldDecorator('string_param')(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="数值参数" >
          {getFieldDecorator('int_param')(
            <Input type='number' />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button loading={this.state.loading} type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(GmIns);