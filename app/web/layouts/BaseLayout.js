import React from "react";
import { Layout, Menu, Icon, Select, Dropdown, Spin, Button } from "antd";
import router from "umi/router";
import { connect } from "dva";
import withRouter from "umi/withRouter";

import { check, logout } from "../service/login";
import styles from "./BaseLayout.css";

const { Header, Content, Footer, Sider } = Layout;
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
      role: 1
    };
  }

  async componentDidMount() {
    const data = await check();
    if (data.code === -10) {
      // 未登陆
      router.replace("/login");
    } else {
      this.fetchSrvList();
      this.fetchMenuSids();
      this.setState({
        loading: false,
        username: data.payload.username,
        role: parseInt(data.payload.role)
      });
      await this.props.dispatch({
        type: "global/save",
        payload: { user_role: parseInt(data.payload.role) }
      });
    }
  }

  // 获取服务器列表
  fetchSrvList = () => {
    this.props.dispatch({
      // 获取服务器列表
      type: "global/fetchSrvList",
      payload: {}
    });
  };

  // 获取菜单列表
  fetchMenuSids = () => {
    this.props.dispatch({
      // 获取服务器列表
      type: "global/fetchMenuSids",
      payload: {}
    });
  };

  // 登出
  logout() {
    logout().then(data => {
      router.replace("/login");
    });
  }

  // 路由跳转
  go_route(route) {
    router.push(route);
  }

  // 侧边栏开关
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  async handleEnvSelect(req_url) {
    this.setState({ loading: true });
    // 获取服务器列表
    localStorage.setItem("req_url", req_url);
    this.fetchSrvList();
    this.props.dispatch({
      type: "global/save",
      payload: { req_url }
    });
    this.setState({ loading: false });
  }

  handleSrvSelect = part_id => {
    this.props.dispatch({
      type: "global/save",
      payload: { part_id }
    });
  };

  showMenu = (sid, component) => {
    const { menu_sids } = this.props.global;
    for (let i = 0; i < menu_sids.length; i++) {
      if (menu_sids[i].startsWith(sid)) {
        return component
      }
    }
    return null;
  }

  render() {

    const userDropDown = (
      <Menu>
        <Menu.Item onClick={() => this.go_route("/user/actlog")} key="actlog">
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
        <Layout
          style={{
            height: "100vh",
          }}
        >
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
              defaultOpenKeys={[
                this.props.children.props.location.pathname.split("/")[1]
              ]}
              theme="dark"
              selectedKeys={[this.props.children.props.location.pathname]}
              mode="inline"
            >
              {this.showMenu('1', (
                <Menu.Item onClick={() => this.go_route("/player")} key="/player">
                  <Icon type="team" />
                  <span>玩家操作</span>
                </Menu.Item>))}
              {this.showMenu('2', (
                <Menu.Item onClick={() => this.go_route("/gang")} key="/gang">
                  <Icon type="appstore" />
                  <span>帮会操作</span>
                </Menu.Item>
              ))}
              {this.showMenu('9', (
                <Menu.Item onClick={() => this.go_route("/jubao")} key="/jubao">
                  <Icon type="exception" />
                  <span>举报信息查询</span>
                </Menu.Item>
              ))}
              {this.showMenu('3', (
                <SubMenu
                  key="moneyreport"
                  title={
                    <span>
                      <Icon type="fund" />
                      <span>充值上报控制</span>
                    </span>
                  }>
                  {this.showMenu('3-1', (
                    <Menu.Item
                      key="/moneyreport/moneyreport"
                      onClick={() => this.go_route("/moneyreport/moneyreport")}
                    >
                      <span>金额上报控制</span>
                    </Menu.Item>
                  ))}
                  {this.showMenu('3-2', (
                    <Menu.Item
                      key="/moneyreport/uidreport"
                      onClick={() => this.go_route("/moneyreport/uidreport")}
                    >
                      <span>uid上报控制</span>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ))}


              {this.showMenu('4', (
                <SubMenu
                  key="batchact"
                  title={
                    <span>
                      <Icon type="form" />
                      <span>批量操作</span>
                    </span>
                  }>
                  {this.showMenu('4-1', (
                    <Menu.Item
                      key="/batchact"
                      onClick={() => this.go_route("/batchact")}
                    >
                      <span>批量操作</span>
                    </Menu.Item>
                  ))}
                  {this.showMenu('4-2', (
                    <Menu.Item
                      key="/batchact/chatlog"
                      onClick={() => this.go_route("/batchact/chatlog")}
                    >
                      <span>导出聊天记录</span>
                    </Menu.Item>
                  ))}
                  {this.showMenu('4-3', (
                    <Menu.Item
                      key="/batchact/blacklist"
                      onClick={() => this.go_route("/batchact/blacklist")}
                    >
                      <span>导出黑名单</span>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ))}
              {this.showMenu('5', (
                <Menu.Item
                  key="/broadcast"
                  onClick={() => this.go_route("/broadcast")}
                >
                  <Icon type="sound" />
                  <span>服务器广播</span>
                </Menu.Item>
              ))}
              {this.showMenu('6', (
                <SubMenu
                  key="sysact"
                  title={
                    <span>
                      <Icon type="hdd" />
                      <span>系统操作</span>
                    </span>
                  }
                >
                  {this.showMenu('6-1', (
                    <Menu.Item
                      key="/sysact/activity"
                      onClick={() => this.go_route("/sysact/activity")}
                    >
                      <span>活动与功能管理</span>
                    </Menu.Item>
                  ))}
                  {this.showMenu('6-2', (
                    <Menu.Item
                      key="/sysact/gmins"
                      onClick={() => this.go_route("/sysact/gmins")}
                    >
                      <span>GM指令（通用）</span>
                    </Menu.Item>
                  ))}
                  {this.showMenu('6-3', (
                    <Menu.Item key="/sysact/payblacklist" onClick={() => this.go_route('/sysact/payblacklist')}>
                      <span>现在支付黑白名单</span>
                    </Menu.Item>
                  ))}
                  {this.showMenu('6-4', (
                    <Menu.Item key="/sysact/snapshotimport" onClick={() => this.go_route('/sysact/snapshotimport')}>
                      <span>角色快照导入</span>
                    </Menu.Item>
                  ))}
                  {this.showMenu('6-5', (
                    <Menu.Item key="/sysact/ipblacklist" onClick={() => this.go_route('/sysact/ipblacklist')}>
                      <span>ip黑名单</span>
                    </Menu.Item>
                  ))}
                </SubMenu>
                
              ))}
              {this.showMenu('10', (
                <SubMenu
                  key="projecta"
                  title={
                    <span>
                      <Icon type="solution" />
                      <span>ProjectA公告管理</span>
                    </span>
                  }
                >
                  {this.showMenu('10-1', (
                    <Menu.Item
                      key="/projecta/AnnType"
                      onClick={() => this.go_route("/projecta/AnnType")}
                    >
                      <span>公告类型</span>
                    </Menu.Item>
                  ))}
                  {this.showMenu('10-2', (
                    <Menu.Item
                      key="/projecta/AnnList"
                      onClick={() => this.go_route("/projecta/AnnList")}
                    >
                      <span>公告列表</span>
                    </Menu.Item>
                  ))}
                  {this.showMenu('10-3', (
                    <Menu.Item
                      key="/projecta/AddAnn"
                      onClick={() => this.go_route("/projecta/AddAnn")}
                    >
                      <span>添加公告</span>
                    </Menu.Item>
                  ))}
                  {this.showMenu('10-4', (
                    <Menu.Item
                      key="/projecta/SubcontentList"
                      onClick={() => this.go_route("/projecta/SubcontentList")}
                    >
                      <span>公告子标题列表</span>
                    </Menu.Item>
                  ))}
                  {this.showMenu('10-5', (
                    <Menu.Item
                      key="/projecta/AddSubcontent"
                      onClick={() => this.go_route("/projecta/AddSubcontent")}
                    >
                      <span>添加公告子标题</span>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ))}
              {this.showMenu('7', (
                <SubMenu
                  key="gmman"
                  title={
                    <span>
                      <Icon type="solution" />
                      <span>GM管理</span>
                    </span>
                  }
                >
                  {this.showMenu('7-1', (
                    <Menu.Item
                      key="/gmman"
                      onClick={() => this.go_route("/gmman")}
                    >
                      <span>GM列表</span>
                    </Menu.Item>
                  ))}
                  {this.showMenu('7-2', (
                    <Menu.Item
                      key="/gmman/add"
                      onClick={() => this.go_route("/gmman/add")}
                    >
                      <span>添加GM</span>
                    </Menu.Item>
                  ))}
                  {this.showMenu('7-3', (
                    <Menu.Item
                      key="/gmman/actlogs"
                      onClick={() => this.go_route("/gmman/actlogs")}
                    >
                      <span>操作日志</span>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ))}
              {this.showMenu('8', (
                <SubMenu
                  key="authority"
                  title={
                    <span>
                      <Icon type="lock" />
                      <span>权限管理</span>
                    </span>
                  }
                >
                  {this.showMenu('8-1', (
                    <Menu.Item
                      key="/authority/rolelist"
                      onClick={() => this.go_route("/authority/rolelist")}
                    >
                      <span>角色列表</span>
                    </Menu.Item>
                  ))}
                  {this.showMenu('8-2', (
                    <Menu.Item
                      key="/authority/createrole"
                      onClick={() => this.go_route("/authority/createrole")}
                    >
                      <span>新增角色</span>
                    </Menu.Item>
                  ))}
                  {this.showMenu('8-3', (
                    <Menu.Item
                      key="/authority/menulist"
                      onClick={() => this.go_route("/authority/menulist")}
                    >
                      <span>菜单列表</span>
                    </Menu.Item>
                  ))}
                  {this.showMenu('8-4', (
                    <Menu.Item
                      key="/authority/createmenu"
                      onClick={() => this.go_route("/authority/createmenu")}
                    >
                      <span>新增菜单</span>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ))}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <div className={styles.headerItem}>
                <Icon
                  className={styles.trigger}
                  type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                  onClick={this.toggle}
                />
              </div>
              <div className={styles.headerItem}>
                <Select
                  defaultValue={
                    localStorage.getItem("req_url")
                      ? localStorage.getItem("req_url")
                      : ""
                  }
                  onChange={req_url => this.handleEnvSelect(req_url)}
                  className={styles.select}
                  placeholder="选择环境"
                >
                  <Option value="">空</Option>
                  <Option value="http://172.21.16.8:20143/">外网正式环境</Option>
                  <Option value="http://192.168.1.205:20843/">
                    本地测试环境
                  </Option>
                  <Option value="http://192.168.1.205:20143/">
                    内网测试环境
                  </Option>
                  <Option value="http://ifgame.f3322.net:20143/">
                    内网测试环境（外用）
                  </Option>
                </Select>

                <Select
                  onChange={this.handleSrvSelect}
                  className={styles.select}
                  defaultActiveFirstOption
                  placeholder="选择区服"
                >
                  <Option value={-1}>全服</Option>
                  {srvList.map(v => (
                    <Option key={v.part_id} value={v.part_id}>
                      {v.part_name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div
                className={styles.headerItem}
                style={{ float: "right", marginRight: 60 }}
              >
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
            <Content style={{ margin: 16 }}>{this.props.children}</Content>
            <Footer
              style={{
                textAlign: "center"
              }}
            >
              {/* Ant Design ©2018 */}
            </Footer>
          </Layout>
        </Layout>
      </Spin>
    );
  }
}

export default withRouter(BaseLayout);
