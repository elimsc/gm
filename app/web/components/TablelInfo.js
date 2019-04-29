import React from 'react';
import { Form, Row, Col, Input } from 'antd';

/**
 * 负责数据的表格形式显示
 *
 * 接收数据格式
 * [
 * {title: '标题1', value: '值1'},
 * {title: '标题2', value: '值2'},
 * {title: '标题3', value: '值3'},
 * ]
 */

const TableInfo = (props) => {
  const { data } = props;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  if (!(data instanceof Array)) {
    return null;
  }
  return (
    <Form {...formItemLayout} style={props.style}>
      <Row gutter={24}>
        <Col span={8}>
          {data.map((data, index) => {
            if (index % 3 === 0) {
              return (
                <Form.Item key={`${index}`} label={data.title}>
                  <Input value={data.value} />
                </Form.Item>
              );
            }
          })}
        </Col>
        <Col span={8}>
          {data.map((data, index) => {
            if (index % 3 === 1) {
              return (
                <Form.Item key={`${index}`} label={data.title}>
                  <Input value={data.value} />
                </Form.Item>
              );
            }
          })}
        </Col>
        <Col span={8}>
          {data.map((data, index) => {
            if (index % 3 === 2) {
              return (
                <Form.Item key={`${index}`} label={data.title}>
                  <Input value={data.value} />
                </Form.Item>
              );
            }
          })}
        </Col>
      </Row>
    </Form>
  );
};


export default TableInfo;
