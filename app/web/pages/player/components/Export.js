import React from 'react';
import { Card, Form, Input, Button, message, Modal, Select } from 'antd';
import { batchList } from '../../../service/playerinfo';
import XLSX from 'xlsx';


/**
 * 批量导出
 */
class Export extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleSubmit = (e) => {
    const { part_id } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Modal.confirm({
          title: '确认操作',
          content: '确认进行该操作？',
          onOk: () => {
            this.setState({ loading: true });
            const type = values['type'];
            const names = values['names'].split("\n").map(item => item.trim());

            batchList({ type, names, part_id }).then(data => {
              const payload = data.payload;
              const exportData = [];
              for (let data of payload) {
                for (let item of data) {
                  exportData.push(item);
                }
              }
              const genderMap = {
                0: '男',
                1: '女',
              };
              const menpaiMap = {
                0: '正剑门',
                1: '百花',
                2: '昆仑',
                3: '天魔',
                4: '万妖',
                5: '森罗',
              }

              const prettyData = exportData.map(item => {
                return {
                  '角色名': item.name,
                  '性别': genderMap[item.gender],
                  '门派': menpaiMap[item.menpai],
                  '等级': item.level,
                  'GUID': item.guid,
                  'UID': item.uid,
                  '所在服务器': item.part_name,
                  '手机号': item.mobile,
                  '角色创建时间': item.create_time,
                }
              });

              var worksheet = XLSX.utils.json_to_sheet(prettyData);
              const workbook = { SheetNames: ['sheet1'], Sheets: { 'sheet1': worksheet } };
              XLSX.writeFile(workbook, "玩家信息导出.xlsx");

              this.setState({ loading: false });
              this.props.form.resetFields();
            });
          }
        });
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
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
          offset: 6,
        },
      },
    };

    return (
      <Form {...formItemLayout} style={{ marginTop: 50 }} onSubmit={this.handleSubmit}>
        <Form.Item
          label="数据类型"
        >
          {getFieldDecorator('type', {
            rules: [{
              required: true, message: '数据类型不能为空',
            }],
          })(
            <Select>
              <Select.Option value="0">角色名</Select.Option>
              <Select.Option value="1">guid</Select.Option>
              <Select.Option value="2">uid</Select.Option>
              <Select.Option value="3">手机号</Select.Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label="具体内容"
        >
          {getFieldDecorator('names', {
            rules: [{
              required: true, message: '不能为空',
            }],
          })(
            <Input.TextArea rows={15} />
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button loading={this.state.loading} type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(Export);
