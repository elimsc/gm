import React from 'react';
import { Form, Input, Button, message, DatePicker, Divider, Modal, Select } from 'antd';

import { banAccount } from '../../../../service/ban';


class BanAccount extends React.Component {
  constructor(props) {
    super(props);
    this.banTypes = {
      "-1": '所有',
      0: '账号',
      1: '手机号',
      2: '身份证号',
    }
    this.state = {
      loading: false,
      loading2: false,
    }
  }


  handleSubmit1 = (e) => {
    const { uid, part_id } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(['time_range', 'reason', 'type1'], (err, values) => {
      if (!err) {
        const start = values['time_range'][0].toDate().getTime();
        const end = values['time_range'][1].toDate().getTime();
        Modal.confirm({
          title: '确认操作',
          content: '确认对该账号进行封号操作？',
          onOk: () => {
            this.setState({ loading: true });
            banAccount({ reason: values['reason'], uid, part_id, start, end, type: 0, ban_type: parseInt(values['type1']) }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('操作失败');
              }
              this.props.form.resetFields(['time_range', 'reason', 'type1']);
              this.setState({ loading: false });
            });
          }
        });
      }
    });
  }

  handleSubmit2 = (e) => {
    const { uid, part_id } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(['reason2', 'type2'], (err, values) => {
      if (!err) {
        Modal.confirm({
          title: '确认操作',
          content: '确认解除该账号的封号？',
          onOk: () => {
            this.setState({ loading2: true });
            banAccount({ reason: values['reason2'], uid, part_id, start: 0, end: 0, type: 1, ban_type: parseInt(values['type2']) }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('操作失败');
              }
              this.props.form.resetFields(['reason2', 'type2']);
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
          <Form.Item label="封号时间">
            {getFieldDecorator('time_range', {
              rules: [{ type: 'array', required: true, message: '请选择时间范围' }],
            })(
              <DatePicker.RangePicker showTime />
            )}
          </Form.Item>
          <Form.Item label="封号级别">
            {getFieldDecorator('type1', {
              rules: [{
                required: true, message: '请输入封号级别',
              }],
            })(
              <Select>
                {Object.keys(this.banTypes).map(k => (
                  <Select.Option key={k} value={k}>{this.banTypes[k]}</Select.Option>
                ))}
              </Select>
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
        <Divider />
        <Form {...formItemLayout} onSubmit={this.handleSubmit2} style={{ marginTop: 50 }}>
          <Form.Item label="解封级别">
            {getFieldDecorator('type2', {
              rules: [{
                required: true, message: '请输入解封级别',
              }],
            })(
              <Select>
                {Object.keys(this.banTypes).map(k => (
                  <Select.Option key={k} value={k}>{this.banTypes[k]}</Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
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
            <Button loading={this.state.loading2} type="primary" htmlType="submit">解除封号</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(BanAccount);
