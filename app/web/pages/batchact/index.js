import React from 'react';
import { Card, Form, Input, Button, message, Select, Upload, Icon, Modal, Alert } from 'antd';
import XLSX from 'xlsx';
import { connect } from 'dva'

import { batchAward } from '../../service/batchact';

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
        const awards = Object.values(this.fileContent).map(v => Object.values(v)).flat(); // 合并发放道具的内容
        const type = values['type'];
        Modal.confirm({
          title: '确认操作',
          content: '确认进行该操作吗？',
          onOk: () => {
            if (type === 1) {
              this.setState({ loading: true });
              batchAward({ ...values, awards, part_id: this.props.global.part_id }).then(data => {
                console.log(data);
                if (Array.isArray(data.message)) { // 表面操作结果有错误
                  this.setState({ errs: data.message });
                } else {
                  message.success('操作成功');
                }
                this.setState({ loading: false });
                this.props.form.resetFields(['reason', 'file'])
              });
            } else {
              message.info('该功能尚未实现');
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
                      return <li key={`${err}`}>{`对GUID值为 [${err}] 的角色操作失败！`}</li>
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
    );
  }
}

export default Form.create()(BatchAct);
