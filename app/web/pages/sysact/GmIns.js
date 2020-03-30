import React from 'react';

import { Form, Input, Button, Card, message, Modal } from 'antd';

import { gmIns } from '../../service/sysact';
import { connect } from 'dva';

@connect(({ global }) => ({ global }))
class GmIns extends React.Component {

  handleSubmit = e => {
    const { part_id } = this.props.global;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Modal.confirm({
          title: '确认操作',
          content: '确认执行该操作？',
          onOk: () => {
            gmIns({ ...values, part_id, guid: '0' }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('出错了');
              }
            })
          }
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
        sm: { span: 10, offset: 8 },
      }
    }

    return (
      // <Card title={`当前选中区服: ${part_name}`}>
      <Card>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 40 }}>
          <Form.Item label="CMD">
            {getFieldDecorator('cmd', {
              rules: [{ required: true, message: '内容不能为空' }]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="Content">
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '内容不能为空' }]
            })(
              <Input.TextArea rows={5} />
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

export default Form.create()(GmIns);
