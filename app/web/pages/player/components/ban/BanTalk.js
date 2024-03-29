import React from 'react';
import { Form, Input, Button, message, DatePicker, Divider, Modal } from 'antd';

import { banTalk } from '../../../../service/ban';


class BanTalk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loading2: false,
    }
  }

  handleSubmit1 = (e) => {
    const { guid, part_id } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(['time_range', 'reason'], (err, values) => {
      if (!err) {
        const start = values['time_range'][0].toDate().getTime();
        const end = values['time_range'][1].toDate().getTime();
        console.log({ reason: values['reason'], guid, part_id, start, end });
        Modal.confirm({
          title: '确认操作',
          content: '确认对该角色进行禁言操作？',
          onOk: () => {
            this.setState({ loading: true });
            banTalk({ reason: values['reason'], guid, part_id, start, end, type: 0 }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('操作失败');
              }
              this.props.form.resetFields(['time_range', 'reason']);
              this.setState({ loading: false });
            });
          }
        });
      }
    });
  }

  handleSubmit2 = (e) => {
    const { guid, part_id } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(['reason2'], (err, values) => {
      if (!err) {
        console.log({ ...values, guid, part_id });
        Modal.confirm({
          title: '确认操作',
          content: '确认解除该角色的禁言？',
          onOk: () => {
            this.setState({ loading2: true });
            banTalk({ reason: values['reason2'], guid, part_id, start: 0, end: 0, type: 1 }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('操作失败');
              }
              this.props.form.resetFields(['reason2']);
              this.setState({ loading2: false });
            });
          },
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
          <Form.Item label="禁言时间">
            {getFieldDecorator('time_range', {
              rules: [{ type: 'array', required: true, message: '请选择时间范围' }],
            })(
              <DatePicker.RangePicker showTime />
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
        <Divider />
        <Form {...formItemLayout} onSubmit={this.handleSubmit2} style={{ marginTop: 50 }}>

          <Form.Item label="原因">
            {getFieldDecorator('reason2', {
              rules: [{
                required: true, message: '请输入原因',
              }],
            })(
              <Input.TextArea rows={5} placeholder="操作原因" />
            )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button loading={this.state.loading2} type="primary" htmlType="submit">解除禁言</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(BanTalk);
