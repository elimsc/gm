import React from 'react';

import { Form, Input, Button, Card, message, Select } from 'antd';
import { connect } from 'dva';

import { srvForcedown } from '../../service/sysact';

@connect(({ global }) => ({ global }))
class SrvForceDown extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        srvForcedown({ part_id: this.props.global.part_id }).then(data => {
          if (data.code === 0) {
            message.success('操作成功');
          } else {
            message.error('操作失败');
          }
        })
      }
    });
  }

  render() {
    const { part_id, srvList } = this.props.global;

    const cur_srv = srvList.filter(v => v.part_id === part_id)[0];
    let part_name = '无';
    if (cur_srv) {
      part_name = cur_srv.part_name;
    }

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
        sm: { span: 10, offset: 6 },
      }
    }

    return (
      <Card title={`当前选中区服: ${part_name}`} style={{ minHeight: 500 }}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 100 }}>
          {/* <Form.Item label="选择服务器">
            {getFieldDecorator('srv', {
              rules: [{ required: true, message: '请选择服务器' }]
            })(
              <Select placeholder="请选择服务器">
                <Select.Option value="srv1">服务器1</Select.Option>
                <Select.Option value="srv2">服务器2</Select.Option>
                <Select.Option value="srv3">服务器3</Select.Option>
              </Select>
            )}
          </Form.Item> */}
          <Form.Item {...tailFormItemLayout}>
            <Button block type="danger" size="large" htmlType="submit">强制下线</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(SrvForceDown);
