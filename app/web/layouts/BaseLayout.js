import React from 'react';
import {
  Layout, Menu, Icon, Select, Dropdown, Spin, Button
} from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';

import { check, logout } from '../service/login';
import styles from './BaseLayout.css';

const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;
const Option = Select.Option;



@connect(({ global }) => ({
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
      this.fetchSrvList();
      this.setState({ loading: false, username: data.payload.username, role: parseInt(data.payload.role) });
      await this.props.dispatch({ type: 'global/save', payload: { user_role: parseInt(data.payload.role) } });
    }
  }

  // 获取服务器列表
  fetchSrvList = () => {
    this.props.dispatch({ // 获取服务器列表
      type: 'global/fetchSrvList',
      payload: {},
    });
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

  async handleEnvSelect(req_url) {
    this.setState({ loading: true });
    // 获取服务器列表
    localStorage.setItem('req_url', req_url);
    this.fetchSrvList();
    this.props.dispatch({
      type: 'global/save',
      payload: { req_url }
    });
    this.setState({ loading: false });
  }

  handleSrvSelect = (part_id) => {
    this.props.dispatch({
      type: 'global/save',
      payload: { part_id }
    });
  }

  render() {

    const userDropDown = (
      <Menu>
        <Menu.Item onClick={() => this.go_route('/user/actlog')} key="actlog">
          <Icon type="user" />
          <span>个人中心</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={() => this.logout()} key="logout">
          <Icon type="logout" />
          <span>退出登陆</span>
        </Menu.Item>
      </Menu>
    );

    const { srvList } = this.props.global;

    if (this.state.loading) return null;

    return (
      <Spin tip="加载中..." spinning={this.state.loading} delay={100}>
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
            <div className={styles.logo}>
              <span>御天剑道GM平台</span>
            </div>
            <Menu
              defaultOpenKeys={[this.props.children.props.location.pathname.split('/')[1]]}
              theme="dark"
              selectedKeys={[this.props.children.props.location.pathname]}
              mode="inline">
              <Menu.Item onClick={() => this.go_route('/player')} key="/player">
                <Icon type="team" />
                <span>玩家操作</span>
              </Menu.Item>
              {this.state.role >= 2 ?
                <Menu.Item key="/batchact" onClick={() => this.go_route('/batchact')}>
                  <Icon type="form" />
                  <span>批量操作</span>
                </Menu.Item>
                : null}
              {this.state.role >= 2 ?
                <Menu.Item key="/broadcast" onClick={() => this.go_route('/broadcast')}>
                  <Icon type="sound" />
                  <span>服务器广播</span>
                </Menu.Item>
                : null}
              {this.state.role >= 3 ?
                <SubMenu key="sysact" title={<span><Icon type="hdd" /><span>系统操作</span></span>}>
                  <Menu.Item key="/sysact/activity" onClick={() => this.go_route('/sysact/activity')}>
                    <span>活动与功能管理</span>
                  </Menu.Item>
                  <Menu.Item key="/sysact/gmins" onClick={() => this.go_route('/sysact/gmins')}>
                    <span>GM指令（通用）</span>
                  </Menu.Item>
                  {/* <Menu.Item key="/sysact/srvforcedown" onClick={() => this.go_route('/sysact/srvforcedown')}>
                    <span>服务器强制下线</span>
                  </Menu.Item> */}
                </SubMenu>
                : null}
              {this.state.role >= 3 ?
                <SubMenu key="gmman" title={<span><Icon type="solution" /><span>GM管理</span></span>}>
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
                <Select defaultValue={localStorage.getItem('req_url') ? localStorage.getItem('req_url') : ''} onChange={(req_url) => this.handleEnvSelect(req_url)} className={styles.select} placeholder="选择环境">
                  <Option value="">空</Option>
                  <Option value="http://192.168.1.205:20843/">本地测试环境</Option>
                  <Option value="http://192.168.1.205:20143/">内网测试环境</Option>
                </Select>

                <Select onChange={this.handleSrvSelect} className={styles.select} defaultActiveFirstOption placeholder="选择区服">
                  <Option value={-1}>全服</Option>
                  {srvList.map(v => (
                    <Option key={v.part_id} value={v.part_id}>{v.part_name}</Option>
                  ))}
                </Select>


              </div>
              <div className={styles.headerItem} style={{ float: 'right', marginRight: 60 }}>
                <Dropdown overlay={userDropDown} placement="bottomRight">
                  <Button type="dashed" style={{ fontSize: 16 }}>
                    {/* <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle', marginRight: 2 }} shape="square" size="small">
                      {this.state.username[0].toUpperCase()}
                    </Avatar> */}
                    {this.state.username}
                  </Button>
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

export default withRouter(BaseLayout);
