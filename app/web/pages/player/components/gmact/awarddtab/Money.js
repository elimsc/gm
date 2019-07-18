import React from 'react';
import { Form, Input, Button, message, Modal, Select } from 'antd';

import { awardD } from '../../../../../service/gmact';

/**
 * 货币
 */
class Money extends React.PureComponent {

  moneyType = {
    0: '银两',
    1: '仙缘',
    2: '点券',
    3: '帮贡',
    4: '门派威望',
    5: '侠义值',
    6: '绑定仙缘',
    7: '恩爱值',
    8: '队长值',
  }


  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleSubmit = (e) => {
    const { guid, part_id } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Modal.confirm({
          title: '确认操作',
          content: `添加货币: ${this.moneyType[values["id"]]}, 数量: ${values["cnt"]}`,
          onOk: () => {
            this.setState({ loading: true });
            awardD({ guid, part_id, type: 1, id: parseInt(values["id"]), param: -1, cnt: values['cnt'] }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('操作失败');
              }
              this.setState({ loading: false });
              this.props.form.resetFields();
            });
          }
        })

      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const moneyType = this.moneyType;

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
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 40 }}>

          <Form.Item label="货币类型）">
            {getFieldDecorator('id', {
              rules: [{
                required: true, message: '不能为空'
              }],
            })(
              <Select>
                {Object.keys(moneyType).map(i => {
                  return <Select.Option key={`${i}`} value={i}>{moneyType[i]}</Select.Option>
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="数量（正加负减）">
            {getFieldDecorator('cnt', {
              rules: [{
                required: true, message: '不能为空'
              }],
            })(
              <Input type="number" />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={this.state.loading}>发放</Button>
          </Form.Item>
        </Form>

      </div>
    );
  }
}

export default Form.create()(Money);
