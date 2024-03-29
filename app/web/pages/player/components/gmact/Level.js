import React from 'react';
import { Form, Input, Button, message, Divider, Select, Modal } from 'antd';

import { setPlayerLevel, setPetLevel } from '../../../../service/gmact';
import { fetchInfo } from '../../../../service/playerinfo'


class Level extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading2: false,
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

  handleSubmit2 = (e) => {
    const { guid, part_id } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(['player_level'], (err, values) => {
      if (!err) {
        console.log(values);
        Modal.confirm({
          title: '确认操作',
          content: `设置玩家等级为: ${values['player_level']}`,
          onOk: () => {
            this.setState({ loading2: true });
            setPlayerLevel({ level: values['player_level'], guid, part_id }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('操作失败');
              }
              this.setState({ loading2: false });
              this.props.form.resetFields(['player_level']);
            });
          }
        });

      }
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
            this.setState({ loading3: true });
            setPetLevel({ level: values['pet_level'], pet_guid: values['pet_name'], guid, part_id }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('操作失败');
              }
              this.setState({ loading3: false });
              this.props.form.resetFields(['pet_name', 'pet_level']);
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

        <Form {...formItemLayout} onSubmit={this.handleSubmit2} style={{ marginTop: 30 }}>
          <Form.Item label="设置玩家等级">
            {getFieldDecorator('player_level', {
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
        <Divider />
        <Form {...formItemLayout} onSubmit={this.handleSubmit3} style={{ marginTop: 30 }}>
          <Form.Item label="选择宠物">
            {getFieldDecorator('pet_name', {
              rules: [{
                required: true, message: '不能为空'
              }],
            })(
              <Select placeholder="选择宠物">
                {this.state.pets.map(pet => (
                  <Select.Option key={`${pet.guid}`} value={pet.guid}>{`${pet.name}(${pet.guid})`}</Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="设置宠物等级">
            {getFieldDecorator('pet_level', {
              rules: [{
                required: true, message: '不能为空'
              }],
            })(
              <Input type="number" />
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

export default Form.create()(Level);
