import React from 'react';
import { Form, Input, Button, message, Icon, Modal, Select } from 'antd';
import { money } from '../../../../../service/gmact';



/**
 * 发放货币
 */
class Money extends React.Component {
  constructor(props) {
    super(props);
    this.id = 0;
    this.state = {
      loading: false,
    };
    this.moneyTypes = [
      { id: 0, name: '银两' },
      { id: 1, name: '仙缘' },
      { id: 2, name: '点券' },
      { id: 3, name: '帮贡' },
      { id: 4, name: '门派威望' },
      { id: 5, name: '侠义值' },
      { id: 6, name: '绑定仙缘' },
      { id: 7, name: '恩爱值' },
      { id: 8, name: '队长值' },

    ];
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
    const nextKeys = keys.concat(this.id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    const { guid, part_id } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const names = values.keys.map(i => values['names'][i]);
        const counts = values.keys.map(i => values['counts'][i]);
        console.log({ names, counts });

        let textArr = values.keys.map(i => `货币类型: ${this.moneyTypes.filter(item => item.id === values.names[i])[0].name}, 数量: ${values.counts[i]}`);
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
            money({ reason: values['reason'], names, counts, guid, part_id }).then(data => {
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
          label="货币类型"
          {...formItemLayout}
        >
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              message: "不能为空",
            }],
          })(
            <Select placeholder="货币类型" style={{ width: '90%', marginRight: 8 }}>
              {this.moneyTypes.map(item => (
                <Select.Option value={item.id} key={`${item.id}`}>{item.name}</Select.Option>
              ))}
            </Select>
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
          label="数量"
          {...formItemLayout}
        >
          {getFieldDecorator(`counts[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              message: "不能为空",
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
            <Icon type="plus" /> 添加货币项
          </Button>
        </Form.Item>
        <Form.Item label="操作原因" {...formItemLayout}>
          {getFieldDecorator(`reason`, {
            rules: [{
              required: true,
              message: "不能为空",
            }],
          })(
            <Input.TextArea rows={5} placeholder="操作原因" style={{ width: '90%', marginRight: 8 }} />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">发放</Button>
        </Form.Item>
      </Form >
    );
  }
}

export default Form.create()(Money);
