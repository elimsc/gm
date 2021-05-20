import React from 'react';
import { Button, Table, Card, Form, Input, DatePicker, Modal } from 'antd';
import moment from 'moment';
import XLSX from 'xlsx';

import { actLogList } from '../../service/user';

const { RangePicker } = DatePicker;


class ActLogs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      filter: {},
    }
  }

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      pageSize: pagination.pageSize,
      page: pagination.current,
    });
  }

  fetch(params = {}) {
    this.setState({ loading: true });
    actLogList({ ...this.state.filter, ...params }).then(data => {
      if (data.code === 0) {
        const pagination = { ...this.state.pagination };
        pagination.total = data.payload.count;
        this.setState({
          loading: false,
          data: data.payload.logs,
          pagination,
        });
      }
    })

  }


  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['subject', 'range'], (err, values) => {
      if (!err) {
        let startTime;
        let endTime;
        if (values['range'] && values['range'][0] && values['range'][1]) {
          startTime = values['range'][0].format('YYYY-MM-DD');
          endTime = values['range'][1].format("YYYY-MM-DD");
        }
        this.setState((prevState, prevProps) => (
          {
            loading: true, filter: {
              subject: values['subject'],
              pagination: { ...prevState.pagination, current: 1 },
              startTime: startTime,
              endTime: endTime,
            }
          }
        ));

        this.fetch({
          pageSize: this.state.pagination.pageSize,
          page: 1,
          subject: values['subject'],
          startTime,
          endTime,
        });
      }
    });
  }

  handleExport = () => {
    var self = this;
    Modal.confirm({
      title: '确认进行该操作',
      content: `你即将导出${this.state.pagination.total}条数据`,
      onOk() {
        self.setState({ loading: true });
        actLogList({ ...self.state.filter, pageSize: self.state.pagination.total }).then(data => {
          if (data.code === 0) {
            self.setState({
              loading: false
            });
            const exportData = data.payload.logs;
            const prettyData = exportData.map(item => {
              return {
                '操作者': item.subject,
                '渠道': item.channel_id,
                '动作描述': item.action,
                '操作对象(玩家)': item.object,
                '区服': item.part_id,
                '数据': item.data,
                '操作时间': moment(item.created_at).format('YYYY-MM-DD HH:mm:ss'),
              }
            });

            var worksheet = XLSX.utils.json_to_sheet(prettyData);
            const workbook = { SheetNames: ['sheet1'], Sheets: { 'sheet1': worksheet } };
            XLSX.writeFile(workbook, "操作记录导出.xlsx");
          }
        })
      }
    })
  }

  // onTimeSelect = (date, dateString) => {
  //   this.setState({
  //     filter: {
  //       ...this.state.filter,
  //       startTime: dateString[0],
  //       endTime: dateString[1],
  //     }
  //   })
  // }

  render() {
    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: '操作者',
      dataIndex: 'subject',
    }, {
      title: '渠道',
      dataIndex: 'channel_id',
      render: id => {
        if (!id) {
          return -1;
        }
        return id;
      }
    }, {
      title: '动作描述',
      dataIndex: 'action',
    }, {
      title: '操作对象（玩家）',
      dataIndex: 'object',
    }, {
      title: '区服',
      dataIndex: 'part_id',
    },
    {
      title: '数据',
      dataIndex: 'data',
      width: 600,
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
          {text}
        </div>
      ),
    }, {
      title: '操作时间',
      dataIndex: 'created_at',
      render: (text, record) => {
        return moment(text).format("YYYY-MM-DD HH:mm:ss");
      }
    }];

    // if (!Array.isArray(this.state.data) || this.state.data.length === 0) return null;

    return (
      <Card>
        <Form layout="inline" onSubmit={this.handleSearch}>
          <Form.Item label="操作者">
            {getFieldDecorator('subject', {
            })(
              <Input placeholder="精确的GM用户名" />
            )}
          </Form.Item>
          <Form.Item label="日期范围">
            {getFieldDecorator('range', {
            })(
              <RangePicker />
            )}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >
              查询
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              onClick={this.handleExport}
              type="primary"
            >
              导出
            </Button>
          </Form.Item>
        </Form>

        <Table
          style={{ marginTop: 30 }}
          columns={columns}
          rowKey={record => `${record.id}`}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </Card>
    );
  }
}

export default Form.create()(ActLogs);
