import React from 'react';
import { Form, Select, Input, Button, Modal, message } from 'antd';

import { setPetPraclevel } from '../../../../../service/gmact';

/**
 * 修改宠物等级
 */
@Form.create()
class PracLevel extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleSubmit = (e) => {
    const { guid, part_id } = this.props;
    e.preventDefault();
    console.log(this.props.form);
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        Modal.confirm({
          title: '确认操作',
          content: `设置宠物 [${values['pet_guid']}] 对应修炼等级为: ${values['level']}`,
          onOk: () => {
            this.setState({ loading: true });
            setPetPraclevel({ ...values, guid, part_id }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('操作失败');
              }
              this.setState({ loading: false });
              this.props.form.resetFields();
            });
          }
        });

      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { pets } = this.props;
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
    const value_type = [
      { type: 0, name: '生命' },
      { type: 1, name: '法力' },
      { type: 2, name: '攻击' },
      { type: 3, name: '物防' },
      { type: 4, name: '法防' },
      { type: 5, name: '速度' },
      { type: 6, name: '状态' },
      { type: 7, name: '封印' },
      { type: 8, name: '敏捷' },
    ];

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 30 }}>
        <Form.Item label="选择宠物">
          {getFieldDecorator('pet_guid', {
            rules: [{
              required: true, message: '不能为空'
            }],
          })(
            <Select placeholder="选择宠物">
              {pets.map(pet => (
                <Select.Option key={`${pet.guid}`} value={pet.guid}>{`${pet.name}(${pet.guid})`}</Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="修炼属性类型">
          {getFieldDecorator('type', {
            rules: [{
              required: true, message: '不能为空'
            }],
          })(
            <Select placeholder="选择类型">
              {value_type.map(type => (
                <Select.Option key={`${type.type}`} value={type.type}>{`${type.name}`}</Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="设置修炼等级">
          {getFieldDecorator('level', {
            rules: [{
              required: true, message: '不能为空'
            }],
          })(
            <Input type="number" />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout} >
          <Button type="primary" htmlType="submit" loading={this.state.loading}>提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default PracLevel;
