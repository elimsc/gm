import React from 'react';
import { Form, Input, Button, message, Select, Modal } from 'antd';

import { exp } from '../../../../../service/gmact';
import { fetchInfo } from '../../../../../service/playerinfo';

/**
 * 发放宠物经验
 */
class PetExp extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading3: false,
      pets: [],
    }
  }

  componentDidMount() {
    const { guid, part_id, uid } = this.props;
    fetchInfo('pet-info', { guid, part_id, uid }).then(data => {
      const pets = data.payload.map(pet => {
        let pet_guid = '';
        let pet_name = '';
        pet.forEach(item => {
          if (item.key === 'guid') {
            pet_guid = item.value;
          }
          if (item.key === 'name') {
            pet_name = item.value;
          }
        });
        if (pet_guid && pet_name) {
          return { guid: pet_guid, name: pet_name };
        }
      });
      this.setState({ pets });
    });
  }



  handleSubmit3 = (e) => {
    const { guid, part_id } = this.props;
    e.preventDefault();
    console.log(this.props.form);
    this.props.form.validateFieldsAndScroll(['pet_name', 'pet_level'], (err, values) => {
      if (!err) {
        console.log(values);
        Modal.confirm({
          title: '确认操作',
          content: `设置宠物 [${values['pet_name']}] 等级为: ${values['pet_level']}`,
          onOk: () => {
            message.info('功能未实现');
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
        <Form {...formItemLayout} onSubmit={this.handleSubmit3} style={{ marginTop: 60 }}>
          <Form.Item label="选择宠物">
            {getFieldDecorator('pet_name', {
              rules: [{
                required: true, message: '不能为空'
              }],
            })(
              <Select placeholder="选择宠物" style={{ width: '90%', marginRight: 8 }}>
                {this.state.pets.map(pet => (
                  <Select.Option key={`${pet.guid}`} value={pet.guid}>{`${pet.name}(${pet.guid})`}</Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="宠物添加经验">
            {getFieldDecorator('pet_level', {
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
          <Form.Item {...tailFormItemLayout} >
            <Button type="primary" htmlType="submit" loading={this.state.loading3}>提交</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(PetExp);
