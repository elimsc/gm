import React from 'react';
import { Card, Row, Input, Button, Table, Form, Spin, Tabs, message, Icon, Modal } from 'antd';
import { connect } from 'dva';
import XLSX from 'xlsx';
import { getUidList, addUidList, delUidList } from '../../service/moneyreport';
import TextArea from 'antd/lib/input/TextArea';

function isSuccess(data) {
  // return data.payload.uid_list.length != 0;
  return data.payload.mode;
}

@connect(({ global }) => ({ global }))
class UidReport extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      hasFetched: false, // 用于添加的时候判断要不要将新添加的项显示到当前页面，已获取列表时添加，否则不添加
      list: [],
      loading: false,
    }
  }

  componentDidUpdate(prevProps) {

    // if (prevProps.global.part_id !== this.props.global.part_id) {
    //   this.setState({ gangList: [], data: [] })
    // }
  }

  // 获取uid列表
  fetchList = () => {
    const { part_id } = this.props.global;
    this.setState({ loading: true, list: [] });
    getUidList({ part_id }).then(data => {
      const dataList = data.payload.uid_list.map(uid => ({ uid }));
      this.setState({ loading: false, list: dataList, hasFetched: true });
    });
  }

  // 添加uid
  handleAdd = e => {
    const { part_id } = this.props.global;
    e.preventDefault();
    this.props.form.validateFields(['uid'], (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        const list = values.uid.trim().split('\n').map(v => v.trim());
        addUidList({ part_id, list }).then(data => {
          if (isSuccess(data)) {
            message.success('添加成功');
            if (this.state.hasFetched) {
              this.setState({ loading: false, showAddModal: false, list: this.state.list.concat(list.map(v => ({ uid: v }))) });
            } else {
              this.setState({ loading: false, showAddModal: false });
            }
          } else {
            message.error('添加失败');
            this.setState({ loading: false, showAddModal: false });
          }
          this.props.form.resetFields(['uid']);
        });
      }
    });
  }

  // 删除uid
  handleDelete = v => {
    const { part_id } = this.props.global;
    Modal.confirm({
      title: '确认操作',
      content: '确认删除该uid？',
      onOk: () => {
        this.setState({ loading: true });
        delUidList({ part_id, list: [v.uid] }).then(data => {
          if (isSuccess(data)) {
            message.success('删除成功');
            this.setState({ loading: false, list: this.state.list.filter(item => item.uid != v.uid) });
          } else {
            message.error('删除失败');
            this.setState({ loading: false });
          }
        })
      }
    })
  }

  // 导出uid列表
  handleExport = () => {
    const { part_id } = this.props.global;
    Modal.confirm({
      title: '确认操作',
      content: '确认导出uid列表？',
      onOk: () => {
        getUidList({ part_id }).then(data => {
          const dataList = data.payload.uid_list.map(uid => ({ uid }));
          var worksheet = XLSX.utils.json_to_sheet(dataList);
          const workbook = { SheetNames: ['sheet1'], Sheets: { 'sheet1': worksheet } };
          XLSX.writeFile(workbook, "不允许上报的uid列表.xlsx");
        });
      }
    })

  }

  render() {
    const { list, loading } = this.state;
    const { getFieldDecorator } = this.props.form;

    const columns = [
      {
        title: 'uid',
        dataIndex: 'uid',
        key: 'uid',
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
              <Form.Item label="uid" {...formItemLayout}>
                {getFieldDecorator('uid', {
                  rules: [{
                    required: true,
                    message: 'uid不能为空',
                  }],
                })(
                  <TextArea rows={6} placeholder="每行一个值" />
                )}
              </Form.Item>
              <Form.Item {...formTailLayout}>
                <Button htmlType="submit" type="primary">提交</Button>
              </Form.Item>

            </Form>
          </Modal>
          <Button style={{ marginTop: 5 }} type="primary" onClick={() => this.fetchList()}>获取不允许上报的uid列表</Button>
          <Button style={{ marginTop: 5, marginLeft: 20 }} type="primary" onClick={() => this.setState({ showAddModal: true })}>添加uid</Button>
          <Button style={{ marginTop: 5, marginLeft: 20 }} type="primary" onClick={() => this.handleExport()}>导出uid列表</Button>
          <Table
            loading={loading}
            rowKey={record => `${record.uid}`}
            style={{ marginTop: 20 }}
            pagination={{ pageSize: 5 }}
            columns={columns}
            dataSource={list} />
        </Card>

      </div>
    );
  }
}

export default Form.create()(UidReport);
