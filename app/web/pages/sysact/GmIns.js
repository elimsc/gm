import React from 'react';

import { Form, Input, Button, Card, message } from 'antd';

import { gmIns } from '../../service/sysact';
import { connect } from 'dva';

@connect(({ global }) => ({ global }))
class GmIns extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        gmIns(values).then(data => {
          if (data.code === 0) {
            message.success('操作成功');
          } else {
            message.error('出错了');
          }
        })
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
      <Card title={`当前选中区服: ${part_name}`}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 40 }}>
          <Form.Item label="GM指令">
            {getFieldDecorator('ins', {
              rules: [{ required: true, message: '内容不能为空' }]
            })(
              <Input.TextArea rows={5} placeholder="请输入要加载的GM指令" />
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
