import React from 'react';
import { Card, Form, Input, Button, message, Select, Upload, Icon, Modal, Alert, Divider } from 'antd';
import XLSX from 'xlsx';
import { connect } from 'dva'

import { batchAward, batchBanAccount, batchBanTalk, batchEntrustOffline } from '../../service/batchact';

@connect(({ global }) => ({ global }))
class BatchAct extends React.Component {

  constructor(props) {
    super(props);
    this.fileContent = {};
    this.state = {
      loading: false,
      errs: [],
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 合并发放道具的内容
        let awards;
        try {
          awards = Object.values(this.fileContent)
            .map(v => Object.values(v)).flat() // 返回一个array，每个sheet对应array的一个元素
            .map(sheet => {
              return sheet.map(award => award.map(item => item.trim()));
            });
        } catch (e) {
          this.setState({
            errs: [`excel格式错误，请保证excel的所有内容均为文本格式`]
          });
          return;
        }

        const type = values['type'];
        Modal.confirm({
          title: '确认操作',
          content: '确认进行该操作吗？',
          onOk: () => {
            if (type === 1) {
              this.setState({ loading: true });
              batchAward({ ...values, awards, part_id: this.props.global.part_id }).then(data => {
                if (Array.isArray(data.message)) { // 表面操作结果有错误
                  const err_msgs = data.message.map(m => {
                    return `对GUID值为 [${m}] 的角色操作失败！`
                  })
                  this.setState({ errs: err_msgs });
                } else {
                  message.success('操作成功');
                }
                this.setState({ loading: false });
                this.props.form.resetFields(['reason', 'file'])
              });
            } else if (type == 2 || type == 3) {
              const items = [];
              for (let award of awards) {
                for (let item of award) {
                  if (Number.isInteger(parseInt((`${item[0]}`).substr(0, 1)))) {
                    const time = (new Date(item[1])).getTime();
                    if (isNaN(time)) {
                      this.setState({
                        errs: [`上传文件格式错误`]
                      });
                      return;
                    }
                    items.push([item[0], time]);
                  }
                }
              }

              if (type == 2) { // 批量封号
                this.setState({ loading: true });
                batchBanAccount({ items, reason: values['reason'], part_id: this.props.global.part_id }).then(data => {
                  if (Array.isArray(data.message)) { // 表面操作结果有错误
                    const err_msgs = data.message.map(m => {
                      return `对UID值为 [${m}] 的账户操作失败！`
                    })
                    this.setState({ errs: err_msgs });
                  } else {
                    message.success('操作成功');
                  }
                  this.setState({ loading: false });
                  this.props.form.resetFields(['reason', 'file'])
                });
              }

              if (type == 3) { // 批量禁言
                this.setState({ loading: true });
                batchBanTalk({ items, reason: values['reason'], part_id: this.props.global.part_id }).then(data => {
                  if (Array.isArray(data.message)) { // 表面操作结果有错误
                    const err_msgs = data.message.map(m => {
                      return `对GUID值为 [${m}] 的角色操作失败！`
                    })
                    this.setState({ errs: err_msgs });
                  } else {
                    message.success('操作成功');
                  }
                  this.setState({ loading: false });
                  this.props.form.resetFields(['reason', 'file'])
                });
              }
            } else if (type == 4) { // 批量交易下架
              const items = [];
              for (let award of awards) {
                for (let item of award) {
                  if (Number.isInteger(parseInt((`${item[0]}`).substr(0, 1)))) {
                    items.push(item[0])
                  }
                }
              }
              this.setState({ loading: true });
              batchEntrustOffline({ items, reason: values['reason'], part_id: this.props.global.part_id }).then(data => {
                if (Array.isArray(data.message)) { // 表面操作结果有错误
                  const err_msgs = data.message.map(m => {
                    return `对GUID值为 [${m}] 的角色操作失败！`
                  })
                  this.setState({ errs: err_msgs });
                } else {
                  message.success('操作成功');
                }
                this.setState({ loading: false });
                this.props.form.resetFields(['reason', 'file'])
              });
            }
          }

        })
      }
    });
  }

  beforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const result = {};
      workbook.SheetNames.forEach(sheetName => {
        let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 })
        if (roa.length) result[sheetName] = roa;
      });
      this.fileContent[file.uid] = result;
    }
    reader.readAsArrayBuffer(file);
    return false;
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { errs } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 8,
          offset: 8,
        },
      },
    };

    return (
      <div>
        <Card>
          <Form {...formItemLayout} style={{ marginTop: 50 }} onSubmit={this.handleSubmit}>
            <Form.Item {...tailFormItemLayout}>
              {errs.length === 0 ? null : (
                <Alert
                  closable
                  afterClose={() => {
                    this.setState({ errs: [] })
                  }}
                  type="error"
                  description={(
                    <ul>
                      {errs.map(err => {
                        return <li key={`${err}`}>{err}</li>
                      })}
                    </ul>
                  )}
                />
              )}
            </Form.Item>
            <Form.Item
              label="操作类型"
            >
              {getFieldDecorator('type', {
                rules: [{
                  required: true, message: '操作类型不能为空',
                }],
              })(
                <Select placeholder="请选择操作类型">
                  <Select.Option value={1}>批量发放道具</Select.Option>
                  <Select.Option value={2}>批量封号</Select.Option>
                  <Select.Option value={3}>批量禁言</Select.Option>
                  <Select.Option value={4}>批量交易下架</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="批量操作文件(txt)"
            >
              {getFieldDecorator('file', {
                getValueFromEvent: this.normFile,
                rules: [{
                  required: true, message: '文件不能为空',
                }],
              })(
                <Upload
                  beforeUpload={this.beforeUpload}
                  onRemove={(file) => {
                    delete (this.fileContent[file.uid]);
                    return true;
                  }
                  }>
                  <Button><Icon type="upload" /> 选中文件</Button>
                </Upload>
              )}
            </Form.Item>
            <Form.Item
              label="原因"
            >
              {getFieldDecorator('reason', {
                rules: [{ required: true, message: '原因不能为空' }],
              })(
                <Input.TextArea placeholder="说明原因" rows={6} />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button loading={this.state.loading} type="primary" htmlType="submit">提交</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(BatchAct);
