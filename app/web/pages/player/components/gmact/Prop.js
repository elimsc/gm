import React from 'react';
import { Form, Input, Button, message, Icon, Modal } from 'antd';
import { prop } from '../../../../service/gmact';


let id = 0;

/**
 * 发放道具
 */
class Prop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    const { guid, part_id } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        let textArr = values.keys.map(i => `道具名: ${values.names[i]}, 数量: ${values.counts[i]}`);
        Modal.confirm({
          title: '确认操作',
          content: (
            <div>
              {
                textArr.map((item, i) => (
                  <p key={`${i}`}>{item}</p>
                ))
              }
            </div>
          ),
          onOk: () => {
            this.setState({ loading: true });
            prop({ ...values, guid, part_id }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('出错啦');
              }
              this.props.form.resetFields();
              this.setState({ loading: false });
            });
          }
        });
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
          {getFieldDecorator(`counts[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              message: "道具数量不能为空",
            }],
          })(
            <Input placeholder="数量" type="number" style={{ width: '90%', marginRight: 8 }} />
          )}
        </Form.Item>
      </div>
    ));


    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 40 }}>
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
