import React from 'react';
import { Card, Form, Button, message, Modal, DatePicker } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import { exportChatlog } from '../../service/batchact';

@connect(({ global }) => ({ global }))
class Chatlog extends React.Component {

  constructor(props) {
    super(props);
    this.fileContent = {};
    this.state = {
      loading: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const start = moment(values['date'][0]).format("YYYYMMDD")
        const end = moment(values['date'][1]).format("YYYYMMDD")

        Modal.confirm({
          title: '确认操作',
          content: '确认进行该操作吗？',
          onOk: () => {
            this.setState({ loading: true });
            exportChatlog({ start, end }).then(res => res.blob()).then(blob => {
              let a = document.createElement('a');
              let url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = `${start}-${end}.txt`;
              a.click();
              window.URL.revokeObjectURL(url);
              a = null;

              this.setState({ loading: false });
              this.props.form.resetFields();
            })
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
        sm: { span: 8 },
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
          offset: 8,
        },
      },
    };

    return (
      <div>
        <Card>
          <Form {...formItemLayout} style={{ marginTop: 50 }} onSubmit={this.handleSubmit}>

            <Form.Item
              label="日期选择"
            >
              {getFieldDecorator('date', {
                rules: [{
                  required: true, message: '日期不能为空',
                }],
              })(
                <DatePicker.RangePicker></DatePicker.RangePicker>
              )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button loading={this.state.loading} type="primary" htmlType="submit">导出聊天记录</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(Chatlog);
