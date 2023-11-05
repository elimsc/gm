import React from 'react';
import { Form, Input, Button, message, Modal } from 'antd';

import { changePlayerData } from '../../../../../service/gmact';


class Level extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading2: false,
    }
  }



  handleSubmit2 = (e) => {
    const { guid, part_id } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(['value'], (err, values) => {
      if (!err) {
        console.log(values);
        Modal.confirm({
          title: '确认操作',
          content: `设置玩家等级为: ${values['value']}`,
          onOk: () => {
            this.setState({ loading2: true });
            changePlayerData({type: 1, new_value: values['value'], guid, part_id }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('操作失败');
              }
              this.setState({ loading2: false });
              this.props.form.resetFields(['value']);
            });
          }
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

        <Form {...formItemLayout} onSubmit={this.handleSubmit2} style={{ marginTop: 46 }}>
          <Form.Item label="设置玩家等级">
            {getFieldDecorator('value', {
              rules: [{
                required: true, message: '不能为空'
              }],
            })(
              <Input type="number" />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={this.state.loading2}>提交</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Level);
