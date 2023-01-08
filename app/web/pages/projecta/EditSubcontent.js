import React from 'react';
import { Card, Form, Input, Button, message, Select, Upload, Icon, DatePicker } from 'antd';
import { connect } from 'dva';
const {RangePicker} = DatePicker;

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import moment from 'moment';

import { createContent, listType, listAnn, deleteContent, updateAnn, listAnnSubcontent, updateAnnSubcontent } from '../../service/projectAAnn';

@connect(({ global }) => ({ global }))
class EditSubcontent extends React.Component {

  state = {
    anns: [],
    title: "",
    content: "",
    ann_id: "",
    order: 0,
    start_time: 0,
    end_time: 0,
    id: 0,

  }

  componentDidMount() {
    const contentId = this.props.location.query.id;
    listAnnSubcontent({id: contentId, ann_id: ''}).then(data => {
        if (data.payload.length != 1) {
            message.error('非法的id')
            return
        }
        const annContent = data.payload[0];
        const {title, content, ann_id, order, start_time, end_time, id } = annContent;
        this.setState({title, content, ann_id, order, start_time, end_time, id});
    })

    listAnn({id: "", type: ""}).then(data => {
        this.setState({anns: data.payload})
    })
  }

  handleSubmit = (e) => {
    const {title, content, order, ann_id, start_time, end_time, id} = this.state;
    e.preventDefault();

    if (!ann_id) {
      message.error('所属公告不能为空')
      return
    }
    if (!content) {
      message.error('正文不能为空')
      return
    }
    updateAnnSubcontent({title, content, order, ann_id, start_time, end_time, id}).then(data => {
      if (data.code === 0) {
        message.success('修改成功');
      } else {
        message.error('修改失败');
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
            <Select value={this.state.ann_id} placeholder="所属公告" onChange={v => this.setState({ann_id: v})} >
              {this.state.anns.map(ann => (
                <Select.Option key={`${ann.id}`} value={ann.id}>{ann.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            label="排序"
          >
            <Input value={this.state.order} type="number" onChange={e => this.setState({order: e.target.value})} required />
          </Form.Item>
          <Form.Item
            label="标题"
          >
            <Input value={this.state.title} placeholder="标题" onChange={e => this.setState({title: e.target.value})} required />
          </Form.Item>
          

          <Form.Item
            label="正文"
          >
            <ReactQuill defaultValue={this.state.content} style={{height: '500px'}} theme="snow" value={this.state.content} onChange={v => this.setState({content: v})} />
          </Form.Item>
         {this.state.start_time ? 
          <Form.Item  style={{marginTop: '80px'}}
          label="生效时间"
        >
          <RangePicker 
              defaultValue={[moment(moment.unix(this.state.start_time).format('YYYY-MM-DD HH:mm:ss'), "YYYY-MM-DD HH:mm:ss"), moment(moment.unix(this.state.end_time).format('YYYY-MM-DD HH:mm:ss'), "YYYY-MM-DD HH:mm:ss")]} 
              showTime
              onChange={date => this.setState({start_time: date[0].unix(), end_time: date[1].unix()})} />
        </Form.Item> : null}

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(EditSubcontent);
