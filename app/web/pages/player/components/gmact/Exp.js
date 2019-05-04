import React from 'react';
import { Form, Input, Button, message, Divider, Select } from 'antd';

import { exp } from '../../../../service/gmact';


class Exp extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading1: false,
      loading2: false,
      loading3: false
    }
  }

  handleSubmit1 = (e) => {
    const {guid, part_id} = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(['jinyan'], (err, values) => {
      if (!err) {
        console.log(values);
        this.setState({ loading1: true });
        exp({ type: 1, data: values, guid, part_id }).then(data => {
          if (data.code === 0) {
            message.success('操作成功');
          } else {
            message.error('操作失败');
          }
          this.setState({ loading1: false });
          this.props.form.resetFields(['jinyan']);
        });

      }
    });
  }

  handleSubmit2 = (e) => {
    const {guid, part_id} = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(['player_level'], (err, values) => {
      if (!err) {
        console.log(values);
        this.setState({ loading2: true });
        exp({ type: 2, data: values, guid, part_id }).then(data => {
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

  handleSubmit3 = (e) => {
    const {guid, part_id} = this.props;
    e.preventDefault();
    console.log(this.props.form);
    this.props.form.validateFieldsAndScroll(['pet_name', 'pet_level'], (err, values) => {
      if (!err) {
        console.log(values);
        this.setState({ loading3: true });
        exp({ type: 3, data: values, guid, part_id }).then(data => {
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
        <Form {...formItemLayout} onSubmit={this.handleSubmit1} style={{ marginTop: 30 }}>
          <Form.Item label="玩家添加经验">
            {getFieldDecorator('jinyan', {
              rules: [{
                required: true, message: '不能为空'
              }],
            })(
              <Input type="number" />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={this.state.loading1}>提交</Button>
          </Form.Item>
        </Form>
        <Divider />
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
                <Select.Option value="1">宠物1</Select.Option>
                <Select.Option value="2">宠物2</Select.Option>
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

export default Form.create()(Exp);
