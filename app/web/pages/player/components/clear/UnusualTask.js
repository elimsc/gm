import React from 'react';
import { Button, message, Modal, Form, Input } from 'antd';

import { clearUnTask } from '../../../../service/clear';

@Form.create()
class UnusualTask extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleSubmit = e => {
    const { guid, part_id } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        Modal.confirm({
          title: '确认操作',
          content: `确认进行该操作？`,
          onOk: () => {
            this.setState({ loading: true });
            clearUnTask({ guid, part_id, task_id: values['task_id'] }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('操作失败');
              }
              this.setState({ loading: false });
              this.props.form.resetFields();
            });
          }
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
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 80 }}>
          <Form.Item label="任务ID">
            {getFieldDecorator('task_id', {
              rules: [{
                required: true, message: '不能为空'
              }],
            })(
              <Input type="number" style={{ width: '90%', marginRight: 8 }} />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={this.state.loading}>提交</Button>
          </Form.Item>
        </Form>

      </div>
    );
  }
}

export default UnusualTask;
