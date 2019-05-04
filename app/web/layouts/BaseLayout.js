import React from 'react';
import {
  Layout, Menu, Breadcrumb, Icon, Select, Dropdown, Avatar, Row, Col, Spin, Button
} from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import {connect} from 'dva';

import { check, logout } from '../service/login';
import styles from './BaseLayout.css';

const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;
const Option = Select.Option;

@connect(({global}) => ({
  global
}))
class BaseLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      username: "",
      loading: true,
      role: 1,
    }
  }

  async componentDidMount() {
    const data = await check();
    console.log("base layout did mount =================== ")
    console.log(data);
    if (data.code === -10) { // 未登陆 
      router.replace('/login');
    } else {
      await this.props.dispatch({ // 获取服务器列表
        type: 'global/fetchSrvList',
        payload: {},
      });
      this.setState({ loading: false, username: data.payload.username, role: parseInt(data.payload.role) });
    }
  }

  // 登出
  logout() {
    logout().then(data => {
      router.replace('/login');
    })
  }

  // 路由跳转
  go_route(route) {
    router.push(route);
  }

  // 侧边栏开关
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleSrvSelect = (part_id) => {
    this.props.dispatch({
      type: 'global/save',
      payload: {part_id}
    })
  }

  render() {

    const userDropDown = (
      <Menu>
        <Menu.Item onClick={() => this.logout()} key="logout">注销</Menu.Item>
        <Menu.Item onClick={() => this.go_route('/user/changepass')} key="changePass">修改密码</Menu.Item>
        <Menu.Item onClick={() => this.go_route('/user/actlog')} key="actlog">操作记录</Menu.Item>
      </Menu>
    );

    const {srvList} = this.props.global;


    return (
      <Spin tip="加载中..." spinning={this.state.loading} delay>
        <Layout style={{
          height: '100vh',
          minHeight: 800,
        }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            width={240}
          >
            <div className={styles.logo}>御天剑道GM平台</div>
            <Menu
              defaultOpenKeys={[this.props.children.props.location.pathname.split('/')[1]]}
              theme="dark"
              defaultSelectedKeys={[this.props.children.props.location.pathname]}
              mode="inline">
              <Menu.Item onClick={() => this.go_route('/player')} key="/player">
                <span>玩家操作</span>
              </Menu.Item>
              {this.state.role >= 2 ?
                <Menu.Item key="/batchact" onClick={() => this.go_route('/batchact')}>
                  <span>批量操作</span>
                </Menu.Item>
                : null}
              {this.state.role >= 2 ?
                <Menu.Item key="/broadcast" onClick={() => this.go_route('/broadcast')}>
                  <span>服务器广播</span>
                </Menu.Item>
                : null}
              {this.state.role >= 3 ?
                <SubMenu key="sysact" title="系统操作">
                  <Menu.Item key="/sysact/activity" onClick={() => this.go_route('/sysact/activity')}>
                    <span>服务与活动管理</span>
                  </Menu.Item>
                  <Menu.Item key="/sysact/gmins" onClick={() => this.go_route('/sysact/gmins')}>
                    <span>GM指令</span>
                  </Menu.Item>
                  <Menu.Item key="/sysact/srvforcedown" onClick={() => this.go_route('/sysact/srvforcedown')}>
                    <span>服务器强制下线</span>
                  </Menu.Item>
                </SubMenu>
                : null}
              {this.state.role >= 3 ?
                <SubMenu key="gmman" title={<span>GM管理</span>}>
                  <Menu.Item key="/gmman" onClick={() => this.go_route('/gmman')}>
                    <span>GM列表</span>
                  </Menu.Item>
                  <Menu.Item key="/gmman/add" onClick={() => this.go_route('/gmman/add')}>
                    <span>添加GM</span>
                  </Menu.Item>
                  {/* <Menu.Item key="/gmman/authority" onClick={() => this.go_route('/gmman/authority')}>
                    <span>权限分配</span>
                  </Menu.Item> */}
                  <Menu.Item key="/gmman/actlogs" onClick={() => this.go_route('/gmman/actlogs')}>
                    <span>操作日志</span>
                  </Menu.Item>
                </SubMenu>
                : null}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <div className={styles.headerItem}>
                <Icon
                  className={styles.trigger}
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </div>
              <div className={styles.headerItem}>
                <Select onChange={this.handleSrvSelect} className={styles.select} placeholder="选择区服" style={{ width: 120 }}>
                  {srvList.map(v => (
                    <Option key={v.part_id} value={v.part_id}>{v.name}</Option>
                  ))}
                </Select>
                
              </div>
              <div className={styles.headerItem} style={{ float: 'right', marginRight: 50 }}>
                <Dropdown overlay={userDropDown} trigger={['click']}>
                  <Button style={{ marginRight: 5 }}>{this.state.username}</Button>
                </Dropdown>
              </div>
            </Header>
            <Content style={{ margin: 16 }}>
              {this.props.children}
            </Content>
            <Footer style={{
              textAlign: 'center',
            }}>
              {/* Ant Design ©2018 */}
            </Footer>
          </Layout>
        </Layout>
      </Spin>
    );
  }
}

export default BaseLayout;
