import React from 'react';

import { Form, Input, Button, Card, message, Modal } from 'antd';

import { gmIns, snapshotImport } from '../../service/sysact';
import { connect } from 'dva';

@connect(({ global }) => ({ global }))
class SnapshotImport extends React.Component {

  lines2Array = v => {
    return v.split("\n")
      .filter(str => !(!str || /^\s*$/.test(str)))
      .map(str => str.trim());
  }

  handleSubmit = e => {
    e.preventDefault();

    const { part_id, srvList } = this.props.global;

    const cur_srv = srvList.filter(v => v.part_id === part_id)[0];
    let part_name = '无';
    if (cur_srv) {
      part_name = cur_srv.part_name;
    }

    if (part_id === -1) {
      message.error('请先选择要导入到的内网区服');
      return;
    }

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Modal.confirm({
          title: '确认操作',
          content: `确认导入到: ${part_name}?`,
          onOk: () => {
            const from_part_ids = this.lines2Array(values['from_part_ids']);
            const from_guids = this.lines2Array(values['from_guids']);
            const to_guids = this.lines2Array(values['to_guids']);
            const keys = this.lines2Array(values['keys']);
            if (!(from_part_ids.length === from_guids.length
              && from_guids.length == to_guids.length && to_guids.length == keys.length)) {
              message.error('输入框中值的数目必须相同');
              return;
            }
            snapshotImport({ from_guids, from_part_ids, to_guids, keys, to_part_id: part_id }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
                this.props.form.resetFields();
              } else {
                message.error(data.message);
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
      <Card title={`当前选中区服: ${part_name}`}>
        {/* <Card> */}
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 40 }}>
          <Form.Item label="外网角色所在区号">
            {getFieldDecorator('from_part_ids', {
              rules: [{ required: true, message: '不能为空' }]
            })(
              <Input.TextArea rows={5} placeholder="每行一个值" />
            )}
          </Form.Item>
          <Form.Item label="外网角色guid">
            {getFieldDecorator('from_guids', {
              rules: [{ required: true, message: '不能为空' }]
            })(
              <Input.TextArea rows={5} placeholder="每行一个值" />
            )}
          </Form.Item>
          <Form.Item label="内网角色guid">
            {getFieldDecorator('to_guids', {
              rules: [{ required: true, message: '不能为空' }]
            })(
              <Input.TextArea rows={5} placeholder="每行一个值" />
            )}
          </Form.Item>
          <Form.Item label="数据别名key">
            {getFieldDecorator('keys', {
              rules: [{ required: true, message: '不能为空' }]
            })(
              <Input.TextArea rows={5} placeholder="每行一个值" />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">导入</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(SnapshotImport);
