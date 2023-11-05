import React from "react";
import { Form, Input, Button, message, Modal, Select } from "antd";

import { awardD } from "../../../../../service/gmact";

/**
 * 道具增加
 */
class PropDelete extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleSubmit = e => {
    const { guid, part_id } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Modal.confirm({
          title: "确认操作",
          content: `确认进行该操作？`,
          onOk: () => {
            this.setState({ loading: true });
            awardD({
              guid,
              part_id,
              type: parseInt(values["type"]),
              id: parseInt(values["id"]),
              param: parseInt(values["param"]),
              cnt: -values["cnt"]
            }).then(data => {
              if (data.code === 0) {
                message.success("操作成功");
              } else {
                message.error("操作失败");
              }
              this.setState({ loading: false });
              this.props.form.resetFields();
            });
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 8,
          offset: 6
        }
      }
    };

    return (
      <div>
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          style={{ marginTop: 40 }}
        >
          <Form.Item label="道具位置">
            {getFieldDecorator("type", {
              rules: [
                {
                  required: true,
                  message: "不能为空"
                }
              ]
            })(
              <Select>
                <Select.Option value={2}>背包</Select.Option>
                {/* <Select.Option value={-1}>仓库</Select.Option> */}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="道具ID">
            {getFieldDecorator("id", {
              rules: [
                {
                  required: true,
                  message: "不能为空"
                }
              ]
            })(<Input type="number" />)}
          </Form.Item>
          <Form.Item label="数量">
            {getFieldDecorator("cnt", {
              rules: [
                {
                  required: true,
                  message: "不能为空"
                }
              ]
            })(<Input type="number" />)}
          </Form.Item>
          <Form.Item label="所在格子号">
            {getFieldDecorator("param", {
              rules: [
                {
                  required: true,
                  message: "不能为空"
                }
              ]
            })(<Input type="number" />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
            >
              发放
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(PropDelete);
