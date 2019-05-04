import React from 'react';
import { Form, Input, Button, message, DatePicker } from 'antd';

import {banAccount} from '../../../../service/ban';


class BanAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleSubmit = (e) => {
    const {guid, part_id} = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log({...values, guid, part_id});
        this.setState({loading: true});
        banAccount({...values, guid, part_id}).then(data => {
          if (data.code === 0) {
            message.success('操作成功');
          } else {
            message.error('操作失败');
          }
          this.setState({loading: false});
        })
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
        <Form.Item label="封号时间">
          {getFieldDecorator('time-range', {
              rules: [{ type: 'array', required: true, message: '请选择时间范围' }],
            })(
              <DatePicker.RangePicker />
            )}
        </Form.Item>
        <Form.Item label="原因">
          {getFieldDecorator('reason', {
              rules: [{
                required: true, message: '请输入封号原因',
              }],
            })(
              <Input.TextArea rows={5} placeholder="封号原因" />
            )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button loading={this.state.loading} type="danger" htmlType="submit">封号</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(BanAccount);
