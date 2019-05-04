import React from 'react';
import { Form, Input, Button, message, DatePicker } from 'antd';

import {banTalk} from '../../../../service/ban';

class BanTalk extends React.Component {
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
        banTalk({...values, guid, part_id}).then(data => {
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
        <Form.Item label="禁言时长（分）">
          {getFieldDecorator('time-range', {
              rules: [{ required: true, message: '请输入禁言的时长' }],
            })(
              <Input type="number" placeholder="单位为分钟" />
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
          <Button loading={this.state.loading} type="danger" htmlType="submit">禁言</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(BanTalk);
