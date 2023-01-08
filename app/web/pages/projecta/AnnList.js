import React from 'react';
import { Button, Table, Card, Modal, Form, Select, Input, message } from 'antd';

import { createContent, listType, listAnn, deleteAnn } from '../../service/projectAAnn';
import moment from 'moment';
import router from "umi/router";


class AnnList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: false,
      annTypeMap: {},
    }
  }

  componentDidMount() {
    listType().then(data => {
      const annTypes = data.payload
      const annTypeMap = {}
      for (const type of annTypes) {
        annTypeMap[type.identity] = type.name
      }
      this.setState({annTypeMap})
    })
    this.fetch();
  }


  fetch(params = {}) {
    this.setState({ loading: true });
    listAnn({id: '', type: ''}).then(data => {
      if (data.code === 0) {
        this.setState({
          loading: false,
          list: data.payload,
        });
      }
    })

  }

  handleDelete(record) {
    deleteAnn({id:record.id}).then(data => {
      if (data.code === 0) {
        message.success('删除成功');
      } else {
        message.error('删除失败');
      }
      this.fetch();
    });
    this.fetch();
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: '页签标题',
      dataIndex: 'label',
    },{
      title: '标题',
      dataIndex: 'title',
    }, {
      title: '排序',
      dataIndex: 'order',
    },{
      title: '公告类型',
      dataIndex: 'type',
      render : type => {
        return this.state.annTypeMap[type]
      }
    },
    {
      title: '生效时间',
      render: record => {
        return <div>{moment.unix(record.start_time).format('YYYY/MM/DD HH:mm:ss')} - {moment.unix(record.end_time).format('YYYY/MM/DD HH:mm:ss')}</div>
      }
    },
    {
      title: '操作',
      render: (record) => (
        <div>
          <Button onClick={() => {router.push('./EditAnn?id=' + record.id)}} type="primary">编辑</Button>
          <Button style={{ marginLeft: 7 }} onClick={() => {
            Modal.confirm({
              title: '确认删除?',
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


    return (
      <Card>
        

        <Table
          style={{ marginTop: 30 }}
          columns={columns}
          rowKey={record => record.id}
          dataSource={this.state.list}
          loading={this.state.loading}
        />
      </Card>
    );
  }
}

export default Form.create()(AnnList);
