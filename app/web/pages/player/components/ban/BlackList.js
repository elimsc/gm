import React from 'react';
import { Form, Input, Button, message, DatePicker, Divider, Modal, Select, Checkbox, Table, Card, TimePicker } from 'antd';

import { setBlackList } from '../../../../service/ban';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


class BlackList extends React.Component {
  constructor(props) {
    super(props);
    this.blackListTypes = {
        11: '市场黑名单',
        12: '市场禁止名单',
    }
    this.state = {
        curData: {},
        showModal: false,
        curAct: '',
    }
  }


  handleUpdate = (e) => {
    const { uid, part_id, guid } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(['uid', 'reason', 'type', 'time'], (err, values) => {
      if (!err) {
        setBlackList({...values, time: values['time'].unix()}).then(data => {
            if (data.code === 0) {
                message.success('操作成功');
                this.setState({showModal: false})
            } else {
                message.error('操作失败');
            }
        })

      }
    });
  }

  getTypeName = type => {
    if (this.blackListTypes[type]) {
        return this.blackListTypes[type]
    }
    return type;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {data, uid} = this.props;

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
      };
      const formTailLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18, offset: 4 },
      };

    const columns = [
        
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          render: v => {
            return this.getTypeName(v);
          }
        },

        {
            title: '区服',
            dataIndex: 'part_id',
            key: 'part_id',
        },
        {
          title: '结束时间',
          dataIndex: 'end_time',
          key: 'end_time',
          render: (v) => {
            if (v == 0) {
                return '非黑名单'
            }
            if (v == -1) {
                return '永久'
            }
            return moment.unix(v).format('YYYY-MM-DD HH:mm:ss')
          } 
        },
        {
            title: '操作时间',
            dataIndex: 'gm_time',
            key: 'gm_time',
            render: (v) => {
                return moment.unix(v).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        {
            title: "操作",
            render: v => {
                return <div>
                    <Button style={{margin: 3}} type='danger' onClick={() => {
                    this.setState({
                        showModal: true,
                        curAct: 'edit',
                        curData: {
                            uid: uid,
                            type: v.type,
                            time: v.end_time,
                            reason: '',
                        },
                    })
                }}>设置黑名单</Button>
                <Button style={{margin: 3}} type='danger' onClick={() => {
                    this.setState({
                        showModal: true,
                        curAct: '',
                        curData: {
                            uid: uid,
                            type: v.type,
                            time: -1,
                            reason: '',
                        },
                    })
                }}>设置黑名单(永久)</Button>
                 <Button style={{margin: 3}} type='primary' onClick={() => {
                    this.setState({
                        showModal: true,
                        curAct: '',
                        curData: {
                            uid: uid,
                            type: v.type,
                            time: 0,
                            reason: '',
                        },
                    })
                }}>解除黑名单</Button>
                </div>
            }
        }
      ];


    return (
      <div>
        <Modal
          onCancel={() => this.setState({ showModal: false })}
          footer={null}
          destroyOnClose
          visible={this.state.showModal}
        >
          <Form style={{ marginTop: 40 }} onSubmit={this.handleUpdate}>
            <Form.Item label='UID' {...formItemLayout}>
            {getFieldDecorator('uid', {
              initialValue: this.state.curData.uid,
            })(
              <Input type="number" disabled  />
            )}
            </Form.Item>
            <Form.Item label='类型' {...formItemLayout}>
            {getFieldDecorator('type', {
              initialValue: this.state.curData.type,
            })(
              <Input disabled placeholder='11:市场黑名单, 12:市场禁止名单'  />
            )}
            </Form.Item>
            <Form.Item label='结束时间' {...formItemLayout}>
            {getFieldDecorator('time', {
              initialValue: moment.unix(this.state.curData.time),
            })(
              <DatePicker showTime={true} allowClear disabled={this.state.curAct !== 'edit'}  />
            )}
            </Form.Item>
            <Form.Item label='原因' {...formItemLayout}>
            {getFieldDecorator('reason', {
              initialValue: this.state.curData.reason,
            })(
              <Input   />
            )}
            </Form.Item>

            <Form.Item {...formTailLayout}>
              <Button htmlType="submit" type="primary">提交</Button>
            </Form.Item>

          </Form>
        </Modal>

        <Table dataSource={data} columns={columns}></Table>
      </div>
    );
  }
}

export default Form.create()(BlackList);
