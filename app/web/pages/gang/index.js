import React from 'react';
import { Card, Row, Input, Button, Table, Form, Select, Spin, Tabs, message, Icon } from 'antd';
import { connect } from 'dva';

import { list, info } from '../../service/gang';
import Member from './components/Member';
import Act from './components/Act';
import Notice from './components/Notice';
import TableInfo from '../../components/TableInfo';
import GmIns from './components/GmIns';


@connect(({ global }) => ({ global }))
class GangMan extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      gangList: [],
      gangListLoading: false,
      // selectedGang: null,
      data: {}, // 帮会信息
      dataLoading: false,

      searchText: '',
      searchedColumn: '',
    }
  }

  componentDidUpdate(prevProps) {
    // 清空搜索结果, 清空选中帮会
    if (prevProps.global.part_id !== this.props.global.part_id) {
      this.setState({ gangList: [], data: [] })
    }
  }

  getGangList = (e) => {
    e.preventDefault();
    const { part_id } = this.props.global;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (part_id === -1) {
          message.error("请选择区服");
        } else {
          this.setState({ gangListLoading: true });
          list({ part_id }).then((data) => {
            this.setState({ gangList: data.payload });
            this.setState({ gangListLoading: false });
          })
        }
      }
    });
  }

  // 获取帮会的具体信息
  fetchData = (gang_guid) => {
    const { part_id } = this.props.global;
    this.setState({ dataLoading: true, data: [] });
    info({ gang_guid, part_id }).then(data => {
      this.setState({ data: data.payload, dataLoading: false });
    });
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


  render() {
    const { part_id } = this.props.global;
    const { gangList, gangListLoading, data, dataLoading } = this.state;

    const columns = [
      {
        title: '帮会名',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'GUID',
        dataIndex: 'guid',
        key: 'guid',
      },
      {
        title: '操作',
        key: 'action',
        render: (data) => (
          <Button onClick={() => {
            this.fetchData(data.guid);
          }} type="primary">选中</Button>
        )
      }
    ];

    const tabs = [
      { index: 0, name: '管理成员' },
      { index: 1, name: '公告修改' },
      { index: 2, name: '帮会GM指令' },
      { index: 3, name: '解散帮会' },
    ];

    const selectTab = tab => {
      switch (tab.index) {
        case 0:
          return <Member data={data.memberlist} part_id={part_id} gang_guid={data.guid} />;
        case 1:
          return <Notice notice={data.notice} gang_guid={data.guid} part_id={part_id} />;
        case 2:
          return <GmIns gang_guid={data.guid} part_id={part_id} />;
        case 3:
          return <Act gang_guid={data.guid} part_id={part_id} />
        default: return null;
      }
    }

    return (
      <div>
        <Card>
          <Form layout="inline" onSubmit={(e) => this.getGangList(e)}>
            <Row>
              {/* <Form.Item style={{ marginRight: 40 }} label="选中输入类型" >
                {getFieldDecorator('type', {
                  initialValue: '0',
                })(
                  <Select style={{ width: 100 }}>
                    <Select.Option value="0">帮会名</Select.Option>
                  </Select>
                )}
              </Form.Item> */}
              {/* <Form.Item style={{ marginRight: 40 }} label="查询内容">
                {getFieldDecorator('name', {
                  initialValue: '',
                })(
                  <Input />
                )}
              </Form.Item> */}

              <Button style={{ marginTop: 5 }} htmlType="submit" type="primary">获取帮会列表</Button>
            </Row>
          </Form>
          <Table
            loading={gangListLoading}
            rowKey={record => record.guid}
            style={{ marginTop: 20 }}
            pagination={{ pageSize: 5 }}
            columns={columns}
            dataSource={gangList} />
        </Card>
        <Card style={{ marginTop: 30, minHeight: 600, marginBottom: 40 }} title={<p>
          当前选中帮会：
          {data && data.name ? <span style={{ fontWeight: 'bold' }}>{`${data.name}`}</span> : '无选中帮会'}
        </p>}>
          <Row>
            <Spin tip="加载中..." spinning={dataLoading}>
              <TableInfo data={[
                { title: '帮会GUID', value: data.guid },
                { title: '帮会名', value: data.name },
                { title: '公告', value: data.notice },
                { title: '等级', value: data.level },
              ]} />

              <Tabs type="card">
                {tabs.map(tab => (
                  <Tabs.TabPane key={`${tab.index}`} tab={`${tab.name}`}>
                    {selectTab(tab)}
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </Spin>
          </Row>
        </Card>
      </div>
    );
  }
}

export default Form.create()(GangMan);
