import React from 'react';
import { Form, Input, Button, message, Modal } from 'antd';

import { gmIns } from '../../../../../service/sysact';

/**
 * 仙气值
 */
class GodExp extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleSubmit = (e) => {
    const { guid, part_id } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const val = parseInt(values['xianqi']);
        if (val < 0) {
          message.error('必须大于0');
          return
        }
        Modal.confirm({
          title: '确认操作',
          content: `添加仙气值: ${val}`,
          onOk: () => {
            this.setState({ loading: true });
            gmIns({ guid, cmd: 'user', part_id, content: `god_exp=${val}` }).then(data => {
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
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 56 }}>
          <Form.Item label="仙气值（必须为正）">
            {getFieldDecorator('xianqi', {
              rules: [{
                required: true, message: '不能为空'
              }],
            })(
              <Input type="number" />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={this.state.loading}>发放</Button>
          </Form.Item>
        </Form>

      </div>
    );
  }
}

export default Form.create()(GodExp);
