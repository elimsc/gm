import React from 'react';
import { Button, Table, Card, Form, Input, DatePicker, Modal, message } from 'antd';
import { listgroup, detailByTargetGuid, deleteByTargetGuid, ban, banTalk } from '../../service/jubao';

import moment from 'moment';

/**
 * 举报信息查询
 */
class Jubao extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [], // 列表
      loading: false,
      detail: [], // 详情
      loading2: false,
      selectedGuid: '', // 当前选中的被举报中
    }
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    this.setState({ loading: true });
    listgroup().then(data => {
      if (data.code === 0) {
        this.setState({
          loading: false,
          data: data.payload,
        });
      }
    })
  }

  handleSelect(guid) {
    this.setState({ selectedGuid: guid, loading2: true });
    detailByTargetGuid(guid).then(data => {
      if (data.code === 0) {
        console.log(data.payload)
        this.setState({ loading2: false, detail: data.payload });
      }
    })
  }

  handleBan(uid, guid, part_id) {
    Modal.confirm({
      title: '确认',
      content: '确认进行该操作？',
      onOk: () => {
        this.setState({ loading: true });
        ban({ uid: `${uid}`, guid: `${guid}`, part_id }).then(data => {
          if (data.code == 0) {
            message.success("封号成功");
          } else {
            message.error('封号失败');
          }
          this.setState({ loading: false });
        })
      }
    })
  }

  handleBanTalk(guid, part_id) {
    Modal.confirm({
      title: '确认',
      content: '确认进行该操作？',
      onOk: () => {
        this.setState({ loading: true });
        banTalk({ guid: `${guid}`, part_id }).then(data => {
          if (data.code == 0) {
            message.success("禁言成功");
          } else {
            message.error('禁言失败');
          }
          this.setState({ loading: false });
        })
      }
    })
  }

  handleDelete(guid) {
    Modal.confirm({
      title: '确认',
      content: '确认进行该操作？',
      onOk: () => {
        this.setState({ loading: true });
        deleteByTargetGuid(guid).then(data => {
          if (data.code === 0) {
            this.setState({ loading: false });
            this.fetch();
          }
        })
      }
    })
  }

  render() {

    const typeMap = {
      1: '垃圾广告',
      2: '诈骗信息',
      3: '收号卖号',
      4: '举报外挂',
      5: '呢称不雅',
      6: '举报其他',
    }

    const columns = [{
      title: '被举报人GUID',
      dataIndex: 'target_guid',
    }, {
      title: '区服',
      dataIndex: 'part_id',
    }, {
      title: '被举报次数',
      dataIndex: 'count',
    }, {
      title: '封号/禁言',
      render: (record) => {
        return (
          <div>
            <Button onClick={() => this.handleBan(record.target_uid, record.target_guid, record.part_id)} >封号</Button>
            <Button onClick={() => this.handleBanTalk(record.target_guid, record.part_id)} style={{ marginLeft: 10 }} >禁言</Button>
          </div>
        )
      }
    }, {
      title: '操作',
      render: (record) => {
        return (
          <div>
            <Button type="primary" onClick={() => this.handleSelect(record.target_guid)}>详情</Button>
            <Button style={{ marginLeft: 10 }} type="danger" onClick={() => this.handleDelete(record.target_guid)}>删除</Button>
          </div>
        )
      }
    }];

    const columns2 = [
      {
        title: '举报人GUID',
        dataIndex: 'informant_guid',
        width: '15%',
      }, {
        title: '类型',
        dataIndex: 'type',
        width: '10%',
        render: (record) => {
          return typeMap[record];
        }
      }, {
        title: '举报时间',
        dataIndex: 'jubao_time',
        width: '20%',
        render: (record) => {
          return moment(record.jubao_time).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: '举报内容',
        dataIndex: 'content',
      }
    ]

    // if (!Array.isArray(this.state.data) || this.state.data.length === 0) return null;

    return (
      <div>
        <Card>
          <Table
            columns={columns}
            rowKey={record => `${record.target_guid}`}
            dataSource={this.state.data}
            loading={this.state.loading}

            pagination={{ pageSize: 3 }}
          />
        </Card>
        <Card style={{ marginTop: 20 }} title={`当前选中的被举报人GUID为: ${this.state.selectedGuid}`}>
          <Table
            columns={columns2}
            rowKey={record => `${record.id}`}
            dataSource={this.state.detail}
            loading={this.state.loading2}
            pagination={{ pageSize: 7 }}
          />
        </Card>
      </div>
    );
  }
}

export default Form.create()(Jubao);
