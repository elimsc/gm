import React from 'react';
import { Button, Table, Card, Modal, Form, Select, Input, message, Icon } from 'antd';

import { menuList, deleteMenu, updateMenu } from '../../service/authority';


class MenuList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      selectedMenu: {},
      showUpdateModal: false,
      searchText: '',
      searchedColumn: '',
    }
  }

  componentDidMount() {
    this.fetch();
  }


  fetch() {
    this.setState({ loading: true });
    menuList().then(data => {
      if (data.code === 0) {
        this.setState({
          loading: false,
          data: data.payload,
        });
      }
    })
  }

  handleUpdate = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['id', 'menu_name', 'menu_sid', 'urls'], (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        updateMenu(values).then(data => {
          if (data.code === 0) {
            message.success('修改成功');
          } else {
            message.error('修改失败');
          }
          this.setState({ loading: false, showUpdateModal: false });
          this.fetch();
        });
      }
    });
  }


  handleDelete = record => {
    this.setState({ loading: true });
    deleteMenu(record.id).then(data => {
      this.setState({ loading: false });
      if (data.code === 0) {
        message.success('修改成功');
        this.fetch();
      } else {
        message.error('修改失败');
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
          重制
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
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



  render() {
    const { getFieldDecorator } = this.props.form;

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '菜单名',
        dataIndex: 'menu_name',
        ...this.getColumnSearchProps('menu_name'),
      },
      {
        title: '菜单层次',
        dataIndex: 'menu_sid',
        ...this.getColumnSearchProps('menu_sid'),
      },
      {
        title: '操作',
        render: (record) => (
          <div>
            <Button onClick={() => {
              this.setState({ selectedMenu: record, showUpdateModal: true });

            }} type="primary">编辑</Button>
            <Button style={{ marginLeft: 7 }} onClick={() => {
              Modal.confirm({
                title: '确认删除该菜单?',
                onOk: () => {
                  this.handleDelete(record);
                }
              })
            }} type="danger">删除</Button>
          </div>
        ),
      }];

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    const formTailLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18, offset: 4 },
    };

    if (!Array.isArray(this.state.data)) return null;

    return (
      <Card>
        <Modal
          onCancel={() => this.setState({ showUpdateModal: false })}
          footer={null}
          destroyOnClose
          visible={this.state.showUpdateModal}
        >
          <Form style={{ marginTop: 40 }} onSubmit={this.handleUpdate}>
            {getFieldDecorator('id', {
              initialValue: this.state.selectedMenu.id,
            })(
              <Input type="hidden" />
            )}
            <Form.Item
              label="菜单名"
              {...formItemLayout}
            >
              {getFieldDecorator('menu_name', {
                initialValue: this.state.selectedMenu.menu_name,
                rules: [{
                  required: true, message: '菜单名不能为空',
                }],
              })(
                <Input placeholder="菜单名" />
              )}
            </Form.Item>
            <Form.Item
              label="菜单层次"
              {...formItemLayout}
            >
              {getFieldDecorator('menu_sid', {
                initialValue: this.state.selectedMenu.menu_sid,
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <Input placeholder="ex: 1-1-1" />
              )}
            </Form.Item>
            <Form.Item
              label="相关后端url"
              {...formItemLayout}
            >
              {getFieldDecorator('urls', {
                initialValue: this.state.selectedMenu.urls,
              })(
                <Input.TextArea placeholder="GET /api/xxxx 每行一个值" rows={5} />
              )}
            </Form.Item>

            <Form.Item {...formTailLayout}>
              <Button htmlType="submit" type="primary">提交</Button>
            </Form.Item>

          </Form>
        </Modal>

        <Table
          style={{ marginTop: 30 }}
          columns={columns}
          rowKey={record => record.id}
          dataSource={this.state.data}
          loading={this.state.loading}
        />
      </Card>
    );
  }
}

export default Form.create()(MenuList);
