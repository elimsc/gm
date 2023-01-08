import React from 'react';
import { Card, Form, Input, Button, message, Select, Upload, Icon, DatePicker } from 'antd';
import { connect } from 'dva';
const {RangePicker} = DatePicker;

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { createAnn, listType, listAnn, deleteAnn, createAnnSubcontent } from '../../service/projectAAnn';

@connect(({ global }) => ({ global }))
class AnnSubcontent extends React.Component {

  state = {
    anns: [],
    ann_id: 0,
    title: "",
    content: "",
    order: 0,
    start_time: 0,
    end_time: 0,

  }

  componentDidMount() {
    listAnn({id: "", type: ""}).then(data => {
        this.setState({anns: data.payload})
    })
  }

  handleSubmit = (e) => {
    const {title, content, order, ann_id, start_time, end_time} = this.state;
    e.preventDefault();

    if (!ann_id) {
      message.error('所属公告不能为空')
      return
    }
    if (!content) {
      message.error('正文不能为空')
      return
    }
    createAnnSubcontent({title, content, order, ann_id, start_time, end_time}).then(data => {
      if (data.code === 0) {
        message.success('添加成功');
      } else {
        message.error('添加失败');
      }
    })
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };


    return (
      <Card>
        <Form {...formItemLayout} style={{ marginTop: 10 }} onSubmit={this.handleSubmit}>
          <Form.Item
            label="所属公告"
          >
            <Select placeholder="所属公告" onChange={v => this.setState({ann_id: v})} >
              {this.state.anns.map(ann => (
                <Select.Option key={`${ann.id}`} value={ann.id}>{ann.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            label="排序"
          >
            <Input type="number" onChange={e => this.setState({order: e.target.value})} required />
          </Form.Item>
          <Form.Item
            label="标题"
          >
            <Input placeholder="标题" onChange={e => this.setState({title: e.target.value})} required />
          </Form.Item>
          

          <Form.Item
            label="正文"
          >
            <ReactQuill style={{height: '500px'}} theme="snow" value={this.state.content} onChange={v => this.setState({content: v})} />
          </Form.Item>
          <Form.Item  style={{marginTop: '80px'}}
            label="生效时间"
          >
            <RangePicker showTime onChange={date => this.setState({start_time: date[0].unix(), end_time: date[1].unix()})} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(AnnSubcontent);
