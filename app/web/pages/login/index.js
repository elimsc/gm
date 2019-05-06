import React from 'react';
import { Row, Col, Form, Input, Button, Spin, message } from 'antd';
import router from 'umi/router';

import styles from './index.css';
import { login } from '../../service/login';
import { Card } from 'antd-mobile';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.form.setFieldsValue({ 'password': '' });
        this.setState({ loading: true });
        login(values).then(data => {
          if (data.code === 0) {
            // 存储token 并跳转
            localStorage.setItem(window.location.href.split("/")[2], data.payload.token);
            setTimeout(() => {
              this.setState({ loading: false });
              router.push('/');
            }, 10);
          } else {
            this.setState({ loading: false });
            message.error('账户名或密码错误，请重试');
          }
        })
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
        sm: { span: 14 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
      <Spin tip="登陆中..." delay spinning={this.state.loading}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
          <Card style={{ width: 600, height: 330, boxShadow: '3px 3px 30px #888888' }}>
            <h2 style={{ textAlign: 'center', marginTop: 30, marginBottom: 23 }}>管理员登陆</h2>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="用户名">
                {getFieldDecorator('username', {
                  rules: [{
                    required: true, message: '用户名不能为空',
                  }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="密码">
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: '密码不能为空',
                  }],
                })(
                  <Input type="password" />
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" block>登陆</Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Spin>
    );
  }
}

export default Form.create()(Login);
