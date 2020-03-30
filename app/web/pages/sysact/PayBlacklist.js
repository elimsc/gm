import React from 'react';

import { Form, Input, Button, Card, message, Modal, Select, Table, Icon } from 'antd';

import { listPayBlacklist, updatePayBlacklist } from '../../service/sysact';
import { connect } from 'dva';

@connect(({ global }) => ({ global }))
class PayBlacklist extends React.Component {
  state = {
    loading: false,
    updateLoading: false,
    list: [],
    mode: 0,
  }

  handleUpdate = e => {
    const { part_id } = this.props.global;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Modal.confirm({
          title: '确认操作',
          content: <div>确认执行 <span style={{ color: 'red' }}>{values.action == 1 ? '添加' : '删除'}</span> <span style={{ color: 'red' }}>{values.mode == 1 ? '黑名单' : '白名单'}</span> 操作？</div>,
          onOk: () => {
            this.setState({ updateLoading: true });
            const list = values.list.split("\n")
              .filter(str => !(!str || /^\s*$/.test(str)))
              .map(str => str.trim());
            const data = {};
            data.mode = values.mode;
            if (values.action == 1) {
              data.add_list = list;
              data.del_list = [];
            } else {
              data.del_list = list;
              data.add_list = [];
            }

            updatePayBlacklist({ ...data, part_id }).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('出错了');
              }
            }).finally(() => {
              this.setState({ updateLoading: false });
              this.getList(this.state.mode);
            });

            this.props.form.resetFields();
          }
        });
      }
    });
  }

  handleSingleDel = (mode, v) => {
    const { part_id } = this.props.global;
    Modal.confirm({
      title: '确认操作',
      content: <div>确认删除 <span style={{ color: 'red' }}>{mode === 1 ? '黑名单' : '白名单'}</span> {v} ？</div>,
      onOk: () => {
        this.setState({ loading: true });
        updatePayBlacklist({ part_id, mode, del_list: [v], add_list: [] }).then(data => {
          if (data.code === 0) {
            message.success('操作成功');
          } else {
            message.error('出错了');
          }
        }).finally(() => {
          this.setState({ loading: false });
          this.getList(this.state.mode);
        });
      }
    })
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : '#333' }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => text,
  });
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  // 获取黑白名单列表
  getList = (mode) => {
    if (mode != 0 && mode != 1) return;

    const { part_id } = this.props.global;
    this.setState({ loading: true });
    listPayBlacklist({ mode, part_id }).then(data => {
      this.setState({ list: data.payload, mode });
    }).catch(e => {
      message.error('获取失败');
    }).finally(() => {
      this.setState({ loading: false });
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { part_id, srvList } = this.props.global;

    const cur_srv = srvList.filter(v => v.part_id === part_id)[0];
    let part_name = '无';
    if (cur_srv) {
      part_name = cur_srv.part_name;
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 }
      }
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 8 },
      }
    }


    const columns = [
      { title: '名单', dataIndex: 'value', key: 'value', ...this.getColumnSearchProps('value'), },
      {
        title: '类型', dataIndex: 'type', key: 'type',
        filters: [{ text: '手机号', value: '手机号' }, { text: 'UID', value: 'UID' }, { text: 'IMEI', value: 'IMEI' }],
        onFilter: (value, record) => record.type === value,
      },
      {
        key: 'action',
        title: '操作',
        render: record => {
          return <Button type='danger' onClick={() => this.handleSingleDel(this.state.mode, record.value)}>删除</Button>
        }
      }
    ];

    return (
      <div>
        <Card style={{ marginBottom: 40 }}>
          <Button type="primary" onClick={() => this.getList(1)} style={{ marginRight: 20 }}>获取黑名单列表</Button>
          <Button type="primary" onClick={() => this.getList(2)}>获取白名单列表</Button>
          <Table style={{ marginTop: 5 }} loading={this.state.loading} columns={columns} dataSource={this.state.list} />
        </Card>
        <Card title="增/删黑白名单">
          <Form {...formItemLayout} onSubmit={this.handleUpdate} style={{ marginTop: 10 }}>
            <Form.Item label="类型">
              {getFieldDecorator('mode', {
                rules: [{ required: true, message: '内容不能为空' }]
              })(
                <Select>
                  <Select.Option value={1}>黑名单</Select.Option>
                  <Select.Option value={2}>白名单</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="操作">
              {getFieldDecorator('action', {
                rules: [{ required: true, message: '内容不能为空' }]
              })(
                <Select>
                  <Select.Option value={1}>添加</Select.Option>
                  <Select.Option value={2}>删除</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="名单列表">
              {getFieldDecorator('list', {
                rules: [{ required: true, message: '内容不能为空' }]
              })(
                <Input.TextArea rows={5} placeholder="每行一个值" />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button loading={this.state.updateLoading} type="primary" htmlType="submit">提交</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(PayBlacklist);
