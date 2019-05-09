import React from 'react';
import { Card, Row, Col, Input, Button, Table, Menu, Form, Select, Spin } from 'antd';
import { connect } from 'dva';

import Switch from './components/Switch';
import { list, fetchInfo } from '../../service/playerinfo';


@connect(({ global }) => ({ global }))
class PlayerMan extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      menu: 'basic-info', // 当前选中menu
      playerList: [],
      playerListLoading: false,
      selectedPlayer: null, // 当前选中玩家
      data: [],
      dataLoading: false,
    }
  }

  componentDidUpdate(prevProps) {
    // 清空搜索结果, 清空选中玩家
    if (prevProps.global.part_id !== this.props.global.part_id) {
      this.setState({ playerList: [], data: [], selectedPlayer: null })
    }
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (values.name === "") { // 输入框内容为空时，清除玩家列表数据
          this.setState({ playerList: [] });
        } else {
          this.setState({ playerListLoading: true });
          list({ ...values, ...this.props.global }).then((data) => {
            this.setState({ playerList: data.payload });
            this.setState({ playerListLoading: false });
          })
        }

      }
    });
  }

  select(menu) {
    this.fetchData({ menu });
  }

  // 根据选中玩家和选中菜单获取数据并更新状态
  fetchData(v) {
    const player = v.selectedPlayer || this.state.selectedPlayer || null;
    const menu = v.menu || this.state.menu;
    this.setState({ ...v });
    if (!player || !menu.endsWith('info')) return; // 没有当前选中用户时，不请求服务端
    this.setState({ dataLoading: true });
    fetchInfo(menu, { ...player, ...this.props.global }).then(data => {
      this.setState({ data: data.payload, dataLoading: false });
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { playerList, playerListLoading, selectedPlayer, menu, data, dataLoading } = this.state;

    // 玩家查询结果列表用
    const columns = [
      {
        title: '角色名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: '门派',
        dataIndex: 'menpai',
        key: 'menpai',
      },
      {
        title: '等级',
        dataIndex: 'level',
        key: 'level',
      },
      {
        title: 'GUID',
        dataIndex: 'guid',
        key: 'guid',
      },
      {
        title: '操作',
        key: 'action',
        render: (data) => (
          <Button onClick={() => {
            this.fetchData({ selectedPlayer: data });
          }} type="primary">选中</Button>
        )
      }
    ];



    return (
      <div>
        <Card>
          <Form layout="inline" onSubmit={(e) => this.handleSearch(e)}>
            <Row>
              <Form.Item style={{ marginRight: 40 }} label="选中输入类型" >
                {getFieldDecorator('type', {
                  initialValue: '0',
                })(
                  <Select style={{ width: 100 }}>
                    <Select.Option value="0">角色名</Select.Option>
                    <Select.Option value="1">guid</Select.Option>
                    <Select.Option value="2">uid</Select.Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item style={{ marginRight: 40 }} label="角色名或GUID">
                {getFieldDecorator('name', {
                  initialValue: '',
                })(
                  <Input />
                )}
              </Form.Item>

              <Button style={{ marginTop: 5 }} htmlType="submit" type="primary">查询</Button>
            </Row>
          </Form>
          <Table
            loading={playerListLoading}
            rowKey={record => record.guid}
            style={{ marginTop: 20 }}
            pagination={{ pageSize: 5 }}
            columns={columns}
            dataSource={playerList} />
        </Card>
        <Card style={{ marginTop: 30, minHeight: 1000, marginBottom: 40 }} title={selectedPlayer && selectedPlayer.name ? "当前选中玩家：" + selectedPlayer.name : '无选中玩家'}>
          <Row>
            <Col span={4}>
              <Menu mode="inline" selectedKeys={[this.state.menu]} defaultOpenKeys={['playerinfo']}>
                <Menu.SubMenu key="playerinfo" title="玩家信息">
                  <Menu.Item onClick={() => this.select('basic-info')} key="basic-info">玩家基本信息</Menu.Item>
                  <Menu.Item onClick={() => this.select('bag-info')} key="bag-info">背包信息</Menu.Item>
                  <Menu.Item onClick={() => this.select('warehouse-info')} key="warehouse-info">仓库信息</Menu.Item>
                  <Menu.Item onClick={() => this.select('equip-info')} key="equip-info">装备信息</Menu.Item>
                  <Menu.Item onClick={() => this.select('skill-info')} key="skill-info">技能信息</Menu.Item>
                  <Menu.Item onClick={() => this.select('title-info')} key="title-info">称号信息</Menu.Item>
                  <Menu.Item onClick={() => this.select('pet-info')} key="pet-info">宠物信息</Menu.Item>
                  <Menu.Item onClick={() => this.select('task-info')} key="task-info">任务</Menu.Item>
                  <Menu.Item onClick={() => this.select('home-info')} key="home-info">家园</Menu.Item>
                  <Menu.Item onClick={() => this.select('email-info')} key="email-info">邮件</Menu.Item>
                  <Menu.Item onClick={() => this.select('marriage-info')} key="marriage-info">婚姻</Menu.Item>
                </Menu.SubMenu>
                {this.props.global.user_role > 1 ?
                  <Menu.SubMenu key="gmact" title="GM操作">
                    <Menu.Item onClick={() => this.select('money')} key="money">发放货币</Menu.Item>
                    <Menu.Item onClick={() => this.select('prop')} key="prop">发放道具</Menu.Item>
                    <Menu.Item onClick={() => this.select('exp')} key="exp">添加/扣除经验</Menu.Item>
                    <Menu.Item onClick={() => this.select('title')} key="title">添加/删除称号</Menu.Item>
                    <Menu.Item onClick={() => this.select('prac-level')} key="prac-level">修改修炼等级</Menu.Item>
                    <Menu.Item onClick={() => this.select('petsymbol-level')} key="petsymbol-level">修改宠物符等级</Menu.Item>
                    <Menu.Item onClick={() => this.select('forcedown')} key="forcedown">踢玩家下线</Menu.Item>
                    <Menu.Item onClick={() => this.select('secure-code')} key="secure-code">安全码修改</Menu.Item>
                    <Menu.Item onClick={() => this.select('change-pass')} key="change-pass">修改密码</Menu.Item>
                    <Menu.Item onClick={() => this.select('untie-phone')} key="untie-phone">解除绑定手机</Menu.Item>
                  </Menu.SubMenu> : null
                }
                {this.props.global.user_role > 1 ?
                  <Menu.SubMenu key="clear" title="清除数据">
                    <Menu.Item onClick={() => this.select('clear-secure-code')} key="clear-secure-code">清除安全码</Menu.Item>
                    <Menu.Item onClick={() => this.select('unusual-gang')} key="unusual-gang">清除非正常帮会数据</Menu.Item>
                    <Menu.Item onClick={() => this.select('unusual-task')} key="unusual-task">清除非正常任务</Menu.Item>
                  </Menu.SubMenu> : null
                }
                {this.props.global.user_role > 1 ?
                  <Menu.SubMenu key="ban" title="封号/禁言">
                    <Menu.Item onClick={() => this.select('ban-account')} key="ban-account">封号</Menu.Item>
                    <Menu.Item onClick={() => this.select('ban-talk')} key="ban-talk">禁言</Menu.Item>
                    <Menu.Item onClick={() => this.select('ban-log')} key="ban-log">禁言记录</Menu.Item>
                  </Menu.SubMenu> : null
                }

              </Menu>
            </Col>
            <Col span={20}>
              <Spin tip="加载中..." spinning={dataLoading}>
                <Switch
                  menu={menu}
                  data={data}
                  guid={selectedPlayer && selectedPlayer.guid ? selectedPlayer.guid : true}
                  part_id={this.props.global.part_id}
                />
              </Spin>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}



export default Form.create()(PlayerMan);
