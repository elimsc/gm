import React from 'react';
import { Form, Select, Input, Button, Modal, message } from 'antd';

import { setHeroData } from '../../../../../service/gmact';

/**
 * 修改基础装备信息
 */
@Form.create()
class BasicEquip extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  sub_type_map = {
    1: '武器',
    2: '防具',
    3: '帽子',
    4: '鞋子'
  }

  value_type_map = {
    1: '装备ID',
    2: '等级',
  }

  handleSubmit = (e) => {
    var heroName = {};
    for (const hero of this.props.heros) {
      heroName[hero.id] = hero.name
    }

    const { guid, part_id } = this.props;
    e.preventDefault();
    console.log(this.props.form);
    this.props.form.validateFieldsAndScroll(['hero_id', 'value_type', 'new_value', 'sub_type'], (err, values) => {
      if (!err) {
        console.log(values);
        Modal.confirm({
          title: '确认操作',
          content: `是否确定将 ${heroName[values['hero_id']]} ${this.sub_type_map[values['sub_type']]}部位的属性 ${this.value_type_map[values['value_type']]} 更换为为: ${values['new_value']}`,
          onOk: () => {
            this.setState({ loading: true });
            setHeroData({ ...values, guid, part_id, type:2 }).then(data => {
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
    const { heros } = this.props;


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
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 46 }}>
        <Form.Item label="选择英雄">
          {getFieldDecorator('hero_id', {
            rules: [{
              required: true, message: '不能为空'
            }],
          })(
            <Select placeholder="选择英雄">
              {heros.map(hero => (
                <Select.Option key={`${hero.id}`} value={hero.id}>{`${hero.name}(${hero.id})`}</Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="选择部位">
          {getFieldDecorator('sub_type', {
            rules: [{
              required: true, message: '不能为空'
            }],
          })(
            <Select>
                {Object.keys(this.sub_type_map).map(k => (
                  <Select.Option key={k} value={k}>{this.sub_type_map[k]}</Select.Option>
                ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="选择数据类型">
          {getFieldDecorator('value_type', {
            rules: [{
              required: true, message: '不能为空'
            }],
          })(
            <Select>
                {Object.keys(this.value_type_map).map(k => (
                  <Select.Option key={k} value={k}>{this.value_type_map[k]}</Select.Option>
                ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="修改数据为">
          {getFieldDecorator('new_value', {
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

export default BasicEquip;
