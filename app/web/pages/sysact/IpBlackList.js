import React from 'react';
import { Card, Row, Input, Button, Table, Form, Spin, Tabs, message, Icon, Modal } from 'antd';
import { connect } from 'dva';
import XLSX from 'xlsx';
import { listIpBlackList, addIpBlackList, delIpBlackList } from '../../service/sysact';
import TextArea from 'antd/lib/input/TextArea';

function isSuccess(data) {
  return data.code === 0;
}

@connect(({ global }) => ({ global }))
class IpBlackList extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: false,
    }
  }


  fetchList = () => {
    this.setState({ loading: true, list: [] });
    listIpBlackList().then(data => {
      let black_list = data.payload.black_list
      if (!black_list) {
        black_list = [];
      }
      
      this.setState({ loading: false, list: black_list});
    });
  }

  handleAdd = e => {
    e.preventDefault();
    this.props.form.validateFields(['ip_black_list'], (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        const rows = values.ip_black_list.trim().split('\n').map(v => ({data: v.trim()}));
        addIpBlackList({ rows }).then(data => {
          if (isSuccess(data)) {
            message.success('添加成功');
            this.fetchList();
          } else {
            message.error('添加失败');
            this.setState({ loading: false, showAddModal: false });
          }
          this.props.form.resetFields(['ip_black_list']);
        });
      }
    });
  }

  handleDelete = v => {
    const { part_id } = this.props.global;
    Modal.confirm({
      title: '确认操作',
      content: '确认删除该IP黑名单？',
      onOk: () => {
        this.setState({ loading: true });
        delIpBlackList({ id: v.id }).then(data => {
          if (isSuccess(data)) {
            message.success('删除成功');
            this.fetchList();
          } else {
            message.error('删除失败');
            this.setState({ loading: false });
          }
        })
      }
    })
  }

  handleExport = () => {
    Modal.confirm({
      title: '确认操作',
      content: '确认导出IP黑名单列表？',
      onOk: () => {
        listIpBlackList().then(data => {
          const dataList = data.payload.black_list.map(item => {
            return {ip: item.data}
          });
          var worksheet = XLSX.utils.json_to_sheet(dataList);
          const workbook = { SheetNames: ['sheet1'], Sheets: { 'sheet1': worksheet } };
          XLSX.writeFile(workbook, "IP黑名单列表.xlsx");
        });
      }
    })

  }

  render() {
    const { list, loading } = this.state;
    const { getFieldDecorator } = this.props.form;

    const columns = [
      {
        title: 'IP',
        dataIndex: 'data',
        key: 'data',
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
              <Form.Item label="ip黑名单" {...formItemLayout}>
                {getFieldDecorator('ip_black_list', {
                  rules: [{
                    required: true,
                    message: 'ip不能为空',
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
          <Button style={{ marginTop: 5 }} type="primary" onClick={() => this.fetchList()}>获取ip黑名单列表</Button>
          <Button style={{ marginTop: 5, marginLeft: 20 }} type="primary" onClick={() => this.setState({ showAddModal: true })}>添加ip黑名单</Button>
          <Button style={{ marginTop: 5, marginLeft: 20 }} type="primary" onClick={() => this.handleExport()}>导出IP黑名单列表</Button>
          <Table
            loading={loading}
            rowKey={record => `${record.id}`}
            style={{ marginTop: 20 }}
            pagination={{ pageSize: 5 }}
            columns={columns}
            dataSource={list} />
        </Card>

      </div>
    );
  }
}

export default Form.create()(IpBlackList);
