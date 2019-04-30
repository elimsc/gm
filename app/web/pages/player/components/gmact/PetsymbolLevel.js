import React from 'react';
import { Form, Input, Button, message } from 'antd';

import { petsymbolLevel } from '../../../../service/gmact';


class PetsymbolLevel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        this.setState({ loading: true });
        petsymbolLevel({ value: values['petsymbol_level'] }).then(data => {
          if (data.code === 0) {
            message.success('操作成功');
          } else {
            message.error('操作失败');
          }
          this.setState({ loading: false });
          this.props.form.resetFields(['petsymbol_level']);
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
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 40 }}>
        <Form.Item label="设置宠物符等级">
          {getFieldDecorator('petsymbol_level', {
            rules: [{
              required: true, message: '不能为空',
            }],
          })(
            <Input type="number" />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={this.state.loading}>提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(PetsymbolLevel);
