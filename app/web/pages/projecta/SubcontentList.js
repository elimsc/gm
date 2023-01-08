import React from 'react';
import { Button, Table, Card, Modal, Form, Select, Input, message } from 'antd';

import { createContent, listType, listAnn, deleteAnn, listAnnSubcontent, deleteAnnSubcontent } from '../../service/projectAAnn';
import moment from 'moment';
import router from "umi/router";


class SubcontentList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: false,
      annMap: {},
    }
  }

  componentDidMount() {
    listAnn({id: "", type: ""}).then(data => {
      const annMap = {}
      for (const ann of data.payload) {
        annMap[ann.id] = ann.title
      }
      this.setState({annMap})
    })
    this.fetch();
  }


  fetch(params = {}) {
    this.setState({ loading: true });
    listAnnSubcontent({id: '', ann_id: ''}).then(data => {
      if (data.code === 0) {
        this.setState({
          loading: false,
          list: data.payload,
        });
      }
    })

  }

  handleDelete(record) {
    deleteAnnSubcontent({id:record.id}).then(data => {
      if (data.code === 0) {
        message.success('删除成功');
      } else {
        message.error('删除失败');
      }
      this.fetch();
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const {annMap} = this.state;

    const annFilterList = [];
    for (const k in annMap) {
      annFilterList.push({
        text: annMap[k],
        value: k,
      })
    }

    const columns = [{
      title: '标题',
      dataIndex: 'title',
    }, {
      title: '排序',
      dataIndex: 'order',
    },{
      title: '所属公告',
      dataIndex: 'ann_id',
      render: ann_id => {
        return annMap[ann_id]
      },
      filters: annFilterList,
      onFilter: (value, record) => record.ann_id == value,
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
          <Button onClick={() => {router.push('./EditSubcontent?id=' + record.id)}} type="primary">编辑</Button>
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

export default Form.create()(SubcontentList);
