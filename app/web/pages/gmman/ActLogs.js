import React from 'react';
import { Button, Table, Card, Form, Input } from 'antd';
import moment from 'moment';

import { actLogList } from '../../service/user';



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
    this.props.form.validateFields(['subject'], (err, values) => {
      if (!err) {
        this.setState((prevState, prevProps) => (
          { loading: true, filter: { subject: values['subject'], pagination: { ...prevState.pagination, current: 1 } } }
        ));
        this.fetch({
          pageSize: this.state.pagination.pageSize,
          page: 1,
          subject: values['subject'],
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: '操作者',
      dataIndex: 'subject',
    }, {
      title: '动作描述',
      dataIndex: 'action',
    }, {
      title: '操作对象（玩家）',
      dataIndex: 'object',
    }, {
      title: '区服',
      dataIndex: 'part_id',
    }, {
      title: '数据',
      dataIndex: 'data',
    }, {
      title: '操作时间',
      dataIndex: 'created_at',
      render: (text, record) => {
        return moment(text).format("YYYY-MM-DD HH:mm:ss");
      }
    }];


    return (
      <Card>
        <Form layout="inline" onSubmit={this.handleSearch}>
          <Form.Item label="操作者">
            {getFieldDecorator('subject', {
            })(
              <Input placeholder="精确的GM用户名" />
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
        </Form>
        <Table
          style={{ marginTop: 30 }}
          columns={columns}
          rowKey={record => record.id}
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
