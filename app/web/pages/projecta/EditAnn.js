import React from 'react';
import { Card, Form, Input, Button, message, Select, Upload, Icon, DatePicker } from 'antd';
import { connect } from 'dva';
const {RangePicker} = DatePicker;

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import moment from 'moment';

import { createContent, listType, listAnn, deleteContent, updateAnn } from '../../service/projectAAnn';

@connect(({ global }) => ({ global }))
class EditAnn extends React.Component {

  state = {
    types: [],
    pic: "",
    label: "",
    title: "",
    content: "",
    type: "",
    order: 0,
    start_time: 0,
    end_time: 0,
    id: 0,

  }

  componentDidMount() {
    const contentId = this.props.location.query.id;
    listAnn({id: contentId, type: ''}).then(data => {
        if (data.payload.length != 1) {
            message.error('非法的id')
            return
        }
        const annContent = data.payload[0];
        const {pic, label, title, content, type, order, start_time, end_time, id } = annContent;
        this.setState({pic, label, title, content, type, order, start_time, end_time, id });
    })

    listType().then(data => {
        this.setState({types: data.payload})
    })
  }

  handleSubmit = (e) => {
    const {label, title, content, order, type, pic, start_time, end_time, id} = this.state;
    e.preventDefault();

    if (!type) {
      message.error('公告类型不能为空')
      return
    }
    if (!content) {
      message.error('公告正文不能为空')
      return
    }
    updateAnn({id, label, title, content, order, type, pic, start_time, end_time}).then(data => {
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
            label="公告类型"
          >
            <Select value={this.state.type} placeholder="公告类型" onChange={v => this.setState({type: v})} >
              {this.state.types.map(type => (
                <Select.Option key={`${type.identity}`} value={type.identity}>{type.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="页签标题"
          >
            <Input value={this.state.label} placeholder="页签标题" onChange={e => this.setState({label: e.target.value})} required />
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
            label="图片"
          >
            <Input type="file" onChange={e => {
              const file = e.target.files[0];
              let reader = new FileReader();
              reader.readAsDataURL(file);
              self = this;
              reader.onload = function(){
                //读取完毕后输出结果
                self.setState({pic: this.result})
             }
            }} />
            {this.state.pic ? <img style={{width: '100%'}} src={this.state.pic} /> : null}
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

export default Form.create()(EditAnn);
