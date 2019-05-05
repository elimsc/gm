import { Card, Row, Col, Menu } from "antd";

import Link from 'umi/link';

export default (props) => (
  <Card style={{ minHeight: 800 }} title="个人中心">
    <Row>
      <Col span={3}>
        <Menu style={{ height: 400 }} mode="inline" selectedKeys={[`${props.location.pathname}`]}>
          <Menu.Item key="/user/actlog"><Link to="/user/actlog">操作日志</Link></Menu.Item>
          <Menu.Item key="/user/changepass"><Link to="/user/changepass">修改密码</Link></Menu.Item>
        </Menu>
      </Col>
      <Col span={20} style={{ marginLeft: 15 }}>
        {props.children}
      </Col>
    </Row>
  </Card>
);
