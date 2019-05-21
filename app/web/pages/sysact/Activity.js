import React from 'react';
import { Form, Modal, message, Card, Input, Button, Select } from 'antd';
import { connect } from 'dva';

import { gmIns } from '../../service/sysact';

@connect(({ global }) => ({ global }))
class Activity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleSubmit = e => {
    const { part_id } = this.props.global;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const type = values['type'];
        Modal.confirm({
          title: '确认操作',
          content: '确认执行该操作？',
          onOk: () => {
            this.setState({ loading: true });
            const cmd = 'activity';
            let content;
            switch (type) {
              case 0:
                content = `hide=${values['id']}`
                break;
              case 1:
                content = `show=${values['id']}`
                break;
              case 2:
                content = `hide_func=${values['id']}`
                break;
              case 3:
                content = `show_func=${values['id']}`
                break;
              default:
                message.info('功能未实现');
                this.setState({ loading: false });
                return;
            }
            // 执行操作
            gmIns({ part_id, cmd, guid: '0', content }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('出错了');
              }
              this.setState({ loading: false });
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

    const types = [
      { type: 0, name: '关闭活动' },
      { type: 1, name: '开启活动' },
      { type: 2, name: '关闭功能' },
      { type: 3, name: '开启功能' },
    ];

    return (
      // <Card title={`当前选中区服: ${part_name}`}>
      <Card>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 40 }}>
          <Form.Item label="操作类型">
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '内容不能为空' }]
            })(
              <Select>
                {types.map(type => (
                  <Select.Option value={type.type}>{type.name}</Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="活动/功能ID">
            {getFieldDecorator('id', {
              rules: [{ required: true, message: '内容不能为空' }]
            })(
              <Input type="number" />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={this.state.loading}>提交</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(Activity);
