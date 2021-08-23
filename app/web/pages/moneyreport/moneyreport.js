import React from 'react';
import { Card, Row, Input, Button, Table, Form, Spin, Tabs, message, Icon, Modal } from 'antd';
import { connect } from 'dva';

import { getMoneyList, addMoneyList, delMoneyList } from '../../service/moneyreport';

function isSuccess(data) {
  // return data.payload.moneylist.length != 0;
  return data.payload.mode;
}

@connect(({ global }) => ({ global }))
class MoneyReport extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      hasFetched: false, // 用于添加的时候判断要不要将新添加的项显示到当前页面，已获取金额列表时添加，否则不添加
      list: [],
      loading: false,
    }
  }

  componentDidUpdate(prevProps) {

    // if (prevProps.global.part_id !== this.props.global.part_id) {
    //   this.setState({ gangList: [], data: [] })
    // }
  }

  // 获取金额列表
  fetchList = () => {
    const { part_id } = this.props.global;
    this.setState({ loading: true, list: [] });
    getMoneyList({ part_id }).then(data => {
      this.setState({ loading: false, list: data.payload.moneylist, hasFetched: true });
    });
  }

  // 添加金额范围
  handleAdd = e => {
    const { part_id } = this.props.global;
    e.preventDefault();
    this.props.form.validateFields(['low', 'high', 'uaid'], (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        addMoneyList({ part_id, list: [values] }).then(data => {
          if (isSuccess(data)) {
            message.success('添加成功');
            if (this.state.hasFetched) {
              this.setState({ loading: false, showAddModal: false, list: this.state.list.concat(values) });
            } else {
              this.setState({ loading: false, showAddModal: false });
            }
          } else {
            message.error('添加失败');
            this.setState({ loading: false, showAddModal: false });
          }
          this.props.form.resetFields(['low', 'high', 'uaid']);
        });
      }
    });
  }

  // 删除金额范围
  handleDelete = v => {
    const { part_id } = this.props.global;
    Modal.confirm({
      title: '确认操作',
      content: '确认删除该充值金额范围？',
      onOk: () => {
        this.setState({ loading: true });
        delMoneyList({ part_id, list: [v] }).then(data => {
          if (isSuccess(data)) {
            message.success('删除成功');
            this.setState({ loading: false, list: this.state.list.filter(item => item.low != v.low || item.high != v.high) });
          } else {
            message.error('删除失败');
            this.setState({ loading: false });
          }
        })
      }
    })
  }

  render() {
    const { list, loading } = this.state;
    const { getFieldDecorator } = this.props.form;

    const columns = [
      {
        title: 'uaid',
        dataIndex: 'uaid',
        key: 'uaid',
      },
      {
        title: '下限',
        dataIndex: 'low',
        key: 'low',
      },
      {
        title: '上限',
        dataIndex: 'high',
        key: 'high',
      },
      {
        title: '操作',
        key: 'action',
        render: (data) => (
          <Button onClick={() => {
            this.handleDelete(data);
          }} type="danger">删除</Button>
        )
      }
    ];

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    const formTailLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18, offset: 4 },
    };


    return (
      <div>
        <Card>
          <Modal
            onCancel={() => this.setState({ showAddModal: false })}
            footer={null}
            destroyOnClose
            visible={this.state.showAddModal}
          >
            <Form style={{ marginTop: 40 }} onSubmit={this.handleAdd}>
              <Form.Item label="uaid" {...formItemLayout}>
                {getFieldDecorator('uaid', {
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="下限" {...formItemLayout}>
                {getFieldDecorator('low', {
                  rules: [{
                    required: true,
                    message: '下限不能为空',
                  }],
                })(
                  <Input type="number" />
                )}
              </Form.Item>
              <Form.Item label="上限" {...formItemLayout}>
                {getFieldDecorator('high', {
                  rules: [{
                    required: true,
                    message: '上限不能为空',
                  }],
                })(
                  <Input type="number" />
                )}
              </Form.Item>
              <Form.Item {...formTailLayout}>
                <Button htmlType="submit" type="primary">提交</Button>
              </Form.Item>

            </Form>
          </Modal>
          <Button style={{ marginTop: 5 }} type="primary" onClick={() => this.fetchList()}>获取不允许上报的充值金额范围</Button>
          <Button style={{ marginTop: 5, marginLeft: 20 }} type="primary" onClick={() => this.setState({ showAddModal: true })}>添加金额范围</Button>
          <Table
            loading={loading}
            rowKey={record => `${record.low}-${record.high}`}
            style={{ marginTop: 20 }}
            pagination={{ pageSize: 5 }}
            columns={columns}
            dataSource={list} />
        </Card>

      </div>
    );
  }
}

export default Form.create()(MoneyReport);
