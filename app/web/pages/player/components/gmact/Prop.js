import React from 'react';
import { Form, Input, Button, message, Icon } from 'antd';

let id = 0;

class Prop extends React.Component {
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        message.info('数据已提交');
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

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

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <div key={k}>
        <Form.Item
          label="道具名"
          {...formItemLayout}
        >
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              message: "道具名不能为空",
            }],
          })(
            <Input placeholder="道具名" style={{ width: '90%', marginRight: 8 }} />
          )}
          {keys.length > 1 ? (
          <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          ) : null}
        </Form.Item>
        <Form.Item
          label="道具数量"
          {...formItemLayout}
        >
          {getFieldDecorator(`count[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              message: "道具数量不能为空",
            }],
          })(
            <Input placeholder="数量" style={{ width: '90%', marginRight: 8 }} />
          )}
        </Form.Item>
      </div>
    ));


    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item {...tailFormItemLayout}>
          <Button type="dashed" onClick={() => this.add()} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加道具项
          </Button>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">发放</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(Prop);
