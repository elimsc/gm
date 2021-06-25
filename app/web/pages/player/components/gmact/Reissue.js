import React from 'react';
import { Card, Form, Input, Button, message, Modal, Select, Checkbox } from 'antd';

import { reIssue } from '../../../../service/gmact';

function needFormReset() {
  const req_url = localStorage.getItem('req_url');
  if (req_url.startsWith('http://192') || req_url.startsWith('http://ifgame')) {
    return false;
  }
  return true;
}

/**
 * 充值补发
 */
class Reissue extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      gmDirectChecked: false,
    };
    this.gm_direct_order_id = 'MT0VLXDZW4'; // // GM直充订单id
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.gmDirectChecked !== this.state.gmDirectChecked) {
      if (this.state.gmDirectChecked === true) {
        this.props.form.setFields({ cp_order_id: { value: this.gm_direct_order_id } });
      } else {
        this.props.form.setFields({ cp_order_id: { value: '' } });
      }
    }
  }

  handleSubmit = (e) => {
    const { guid, part_id, uid } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Modal.confirm({
          title: '确认操作',
          content: '确认进行该操作？',
          onOk: () => {
            this.setState({ loading: true });
            reIssue({ ...values, guid, part_id }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('操作失败');
              }
              this.setState({ loading: false });
              if (needFormReset()) {
                this.props.form.resetFields();
                this.setState({ gmDirectChecked: false });
              }
            });
          }
        });
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    // 配表id与具体内容的映射
    const diamond_id_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 23, 20, 16, 17, 21, 18, 19, 22];
    const diamond_id_map = {
      0: '6元',
      1: '30元',
      2: '68元',
      3: '128元',
      4: '228元',
      5: '328元',
      6: '488元',
      7: '648元',
      8: '特权VIP月卡',
      9: '白金月卡',
      10: '成长基金',
      // 11: '30元档0元购',
      // 12: '68元档0元购',
      // 13: '128元档0元购',
      14: '3240元',
      15: '钻石年卡',
      16: '30元每日',
      17: '68元每日',
      18: '328元每日',
      19: '648元每日',
      20: '12元每日',
      21: '128元每日',
      22: '3240元每日',
      23: '6元每日',
    };

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
      <Form {...formItemLayout} style={{ marginTop: 50 }} onSubmit={this.handleSubmit}>
        <Form.Item
          label="支付类型"
        >
          {getFieldDecorator('pay_type', {
            rules: [{
              required: true, message: '支付类型不能为空',
            }],
          })(
            <Select>
              <Select.Option value={36}>PayNow</Select.Option>
              <Select.Option value={0}>IAP</Select.Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label="订单号"
        >
          <div>
            {getFieldDecorator('cp_order_id', {
              rules: [{
                required: true, message: '订单号不能为空',
              }],
            })(
              <Input />
            )}
            <Checkbox checked={this.state.gmDirectChecked} onChange={e => this.setState({ gmDirectChecked: e.target.checked })}>GM直充</Checkbox>
          </div>
        </Form.Item>

        <Form.Item
          label="配表id"
        >
          {getFieldDecorator('diamond_id', {
            rules: [{
              required: true, message: '配表id不能为空',
            }],
          })(
            <Select>
              {diamond_id_list.map(k => {
                let numK = -1;
                try {
                  numK = parseInt(k);
                } catch (e) {
                  diamond_id_map[k] = "无效选项"
                }
                return <Select.Option key={k} value={numK}>{diamond_id_map[k]} - 配表id{numK}</Select.Option>
              })}
            </Select>
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button loading={this.state.loading} type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(Reissue);
