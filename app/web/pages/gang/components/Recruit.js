/**
 * 招募公告管理
 */
import React from 'react';
import { Form, Button, Input, message, Modal } from 'antd';

import { recruit } from '../../../service/gang';

class Recruit extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleSubmit = e => {
    const { gang_guid, gang_id } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const content = values['recruit'];
        Modal.confirm({
          title: '确认操作',
          content: '确认修改该联盟的着迷公告？',
          onOk: () => {
            this.setState({ loading: true });
            recruit({ gang_guid, gang_id, recruit: content }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('出错啦');
              }
              this.setState({ loading: false });
            });
          }
        });
      }
    });
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 4,
          offset: 4,
        },
      },
    };

    const { getFieldDecorator } = this.props.form;
    const { recruit } = this.props;

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="招募公告">
          {getFieldDecorator('recruit', {
            initialValue: recruit,
          })(
            <Input.TextArea rows={6} />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button loading={this.state.loading} type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(Recruit);