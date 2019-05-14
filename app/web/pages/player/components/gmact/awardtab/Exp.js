import React from 'react';
import { Form, Input, Button, message, Modal } from 'antd';

import { exp } from '../../../../../service/gmact';

/**
 * 玩家经验
 */
class Exp extends React.PureComponent {

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
        console.log(values);
        Modal.confirm({
          title: '确认操作',
          content: `添加经验: ${values['jingyan']}`,
          onOk: () => {
            this.setState({ loading: true });
            exp({ ...values, guid, part_id }).then(data => {
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
          <Form.Item label="玩家添加经验">
            {getFieldDecorator('jingyan', {
              rules: [{
                required: true, message: '不能为空'
              }],
            })(
              <Input type="number" style={{ width: '90%', marginRight: 8 }} />
            )}
          </Form.Item>
          <Form.Item label="操作原因" {...formItemLayout}>
            {getFieldDecorator(`reason`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                message: "操作原因不能为空",
              }],
            })(
              <Input.TextArea rows={5} placeholder="操作原因" style={{ width: '90%', marginRight: 8 }} />
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

export default Form.create()(Exp);
