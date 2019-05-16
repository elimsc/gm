import React from 'react';
import { Card, Form, Input, Button, message, Select, Modal, List, Spin } from 'antd';
import { connect } from 'dva';

import { create, listTpl, delTpl } from '../../service/anntpl';
import { addBroadcast } from '../../service/broadcast';

@connect(({ global }) => ({ global }))
class Broadcast extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      tpls: [],
      showTplListModal: false,
      loadingTplList: false,
      loading: false,
    }
  }

  componentDidMount() {
    this.fetchAnntpls();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['content', 'duration', 'frequency', 'part_id'], (err, values) => {
      if (!err) {
        console.log(values);
        Modal.confirm({
          title: '确认操作',
          content: '确认发布广播？',
          onOk: () => {
            addBroadcast(values).then(data => {
              if (data.code === 0) {
                message.success('操作成功');
              } else {
                message.error('操作失败');
              }
              this.props.form.resetFields(['content', 'duration', 'frequency', 'part_id']);
            })
          }
        })
      }
    });
  }

  handleAnntplSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(['anntpl'], (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        create(values).then(data => {
          this.props.form.setFieldsValue({ anntpl: '' });
          if (data.code === 0) {
            message.success('提交成功');
            this.fetchAnntpls();
          } else {
            message.error('操作失败');
          }
          this.setState({ loading: false });
        })
      }
    });
  }

  // 获取词条数据
  fetchAnntpls = () => {
    this.setState({ loading: true });
    listTpl().then(data => {
      if (data.code === 0) {
        this.setState({ tpls: data.payload, loading: false });
      }
    })
  }

  // 显示词条列表
  showTplList = () => {
    this.fetchAnntpls();
    this.setState({ showTplListModal: true });
  }

  // 删除词条
  deleteAnnTpl = id => {
    delTpl(id).then(data => {
      this.fetchAnntpls();
      message.success('操作成功');
    })
  }

  // 选中词条时调用
  onAnntplSelect = (value) => {
    const { form } = this.props;
    const current_content = form.getFieldValue('content');
    form.setFieldsValue({ content: (current_content ? current_content : '') + value });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { srvList } = this.props.global;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
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
          offset: 6,
        },
      },
    };

    return (
      <Spin spinning={this.state.loading} tip="加载中..." delay={100}>
        <Modal
          width={750}
          onCancel={() => this.setState({ showTplListModal: false })}
          footer={null}
          destroyOnClose
          visible={this.state.showTplListModal}
        >
          <List
            loading={this.state.loadingTplList}
            itemLayout="horizontal"
            dataSource={this.state.tpls}
            renderItem={item => (
              <List.Item key={item.id}>
                <div><Button onClick={() => this.deleteAnnTpl(item.id)} type="danger" style={{ marginRight: 10 }}>删除</Button>{item.content}</div>
              </List.Item>
            )}
          />
        </Modal>
        <Card title={`发布广播`}>
          <Form {...formItemLayout} style={{ marginTop: 50, marginBottom: 50 }} onSubmit={this.handleSubmit}>
            <Form.Item label="使用词条">
              <Select allowClear onSelect={(value, option) => this.onAnntplSelect(value)} placeholder="下拉使用词条">
                {this.state.tpls.map((data) => (
                  <Select.Option key={data.id} value={data.content}>{data.content}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="广播内容"
            >
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '广播内容不能为空' }],
              })(
                <Input.TextArea placeholder="输入广播内容" rows={6} />
              )}
            </Form.Item>


            <Form.Item
              label="持续时间（秒）"
            >
              {getFieldDecorator('duration', {
                rules: [{ required: true, message: '持续时间不能为空' }],
              })(
                <Input type="number" />
              )}
            </Form.Item>
            <Form.Item
              label="频率（秒）"
            >
              {getFieldDecorator('frequency', {
                rules: [{ required: true, message: '频率不能为空' }],
              })(
                <Input type="number" />
              )}
            </Form.Item>
            <Form.Item
              label="服务器"
            >
              {getFieldDecorator('part_id', {
                rules: [{
                  required: true, message: '至少需要选择一个服务器',
                }],
              })(
                <Select placeholder="请选择服务器">
                  <Select.Option value={-1}>全服</Select.Option>
                  {srvList.map(srv => (
                    <Select.Option key={`${srv.part_id}`} value={srv.part_id}>{srv.part_name}</Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>


            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">提交</Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title="添加/删除词条" style={{ marginTop: 50 }}>
          <Form {...formItemLayout} onSubmit={this.handleAnntplSubmit}>
            <Form.Item
              label="词条内容"
            >
              {getFieldDecorator('anntpl', {
                rules: [{ required: true, message: '词条内容不能为空' }],
              })(
                <Input.TextArea placeholder="输入词条内容" rows={5} />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">提交</Button>
              <Button style={{ marginLeft: 10 }} type="danger" onClick={this.showTplList}>词条删除</Button>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    );
  }
}

export default Form.create()(Broadcast);
