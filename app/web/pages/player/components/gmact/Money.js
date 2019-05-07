import React from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import { money } from '../../../../service/gmact';

/**
 * 发放货币
 */
class Money extends React.PureComponent {

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
          content: (<div>
            <p>{`点券: ${values['dianquan']}`}</p>
            <p>{`银两: ${values['yinliang']}`}</p>
            <p>{`仙缘: ${values['xianyuan']}`}</p>
            <p>{`绑定仙缘: ${values['bxianyuan']}`}</p>
          </div>),
          onOk: () => {
            this.setState({ loading: true });
            money({ ...values, guid, part_id }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('出错啦');
              }
              this.props.form.resetFields();
              this.setState({ loading: false });
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
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 40 }}>
        <Form.Item label="点券">
          {getFieldDecorator('dianquan', {
            rules: [],
            initialValue: 0,
          })(
            <Input type="number" />
          )}
        </Form.Item>
        <Form.Item label="银两">
          {getFieldDecorator('yinliang', {
            rules: [],
            initialValue: 0,
          })(
            <Input type="number" />
          )}
        </Form.Item>
        <Form.Item label="仙缘">
          {getFieldDecorator('xianyuan', {
            rules: [],
            initialValue: 0,
          })(
            <Input type="number" />
          )}
        </Form.Item>
        <Form.Item label="绑定仙缘">
          {getFieldDecorator('bxianyuan', {
            rules: [],
            initialValue: 0,
          })(
            <Input type="number" />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={this.state.loading}>发放</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(Money);
