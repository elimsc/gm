/**
 * 帮会成员
 */

import React from 'react';
import { Button, Table, Modal, message, Icon, Input } from 'antd';
import { ban } from '../../../service/gang';

class Member extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleBan = (uid) => {
    const { part_id } = this.props;
    Modal.confirm({
      title: '确认操作',
      content: '确认对该账号进行封号？',
      onOk: () => {
        this.setState({ loading: true });
        ban({ part_id, uid }).then(data => {
          if (data.code === 0) {
            message.success('操作成功');
          } else {
            message.error('操作失败');
          }
          this.setState({ loading: false });
        })
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
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.trim().toLowerCase()),
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

  render() {
    const { data } = this.props;

    const columns = [
      {
        title: '角色名',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: '账号UID',
        dataIndex: 'uid',
        key: 'uid',
        ...this.getColumnSearchProps('uid'),
      },
      {
        title: '角色GUID',
        dataIndex: 'guid',
        key: 'guid',
        ...this.getColumnSearchProps('guid'),
      },
      {
        title: '职务',
        dataIndex: 'duty',
        key: 'duty',
        render: (v, record) => {
          switch (v) {
            case 0: return '成员';
            case 1: return '精英';
            case 2: return '王牌';
            case 3: return '长老';
            case 4: return '副帮主';
            case 5: return '帮主';
            default: return v;
          }
        }
      },
      {
        title: '操作',
        key: 'action',
        render: (data) => (
          <Button onClick={() => {
            this.handleBan(data.uid)
          }} type="primary">封号</Button>
        )
      }
    ];

    return (
      <Table
        rowKey={record => record.guid}
        style={{ marginTop: 20 }}
        pagination={{ pageSize: 10 }}
        columns={columns}
        loading={this.state.loading}
        dataSource={data} />
    );
  }
}

export default Member;