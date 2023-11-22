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
      searchUid: "",
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
        this.setState({ data: [], selectedPlayer: null, searchUid: "" });
        if (values['type'] == 2) { // 如果是通过uid进行查询，设置searchUid的值
          this.setState({ searchUid: values['name'] })
        }
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
    const searchUid = this.state.searchUid;
    const player = v.selectedPlayer || this.state.selectedPlayer || null;
    const menu = v.menu || this.state.menu;
    this.setState({ ...v });
    if ((!player && !searchUid) || !menu.endsWith('info')) return; // 没有当前选中用户并且没有searchUid时时，不请求服务端
    if (!player && menu != 'uid-ban-account-info') return; // 如果有searchUid但请求目录不是uid-ban-account-info时，也直接返回

    if (player) {
      localStorage.setItem(player.guid, player.name);
    }
    this.setState({ dataLoading: true, data: [] });
    fetchInfo(menu, { uid: searchUid, ...player, ...this.props.global }).then(data => {
      this.setState({ data: data.payload, dataLoading: false });
    });
  }

  showMenu = (sid, component) => {
    return component;
    const { menu_sids } = this.props.global;
    for (let i = 0; i < menu_sids.length; i++) {
      if (menu_sids[i].startsWith(sid)) {
        return component
      }
    }
    return null;
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
        render: (text, record) => {
          switch (parseInt(text)) {
            case 0: return '男';
            case 1: return '女';
            default: return '';
          }
        }
      },
      {
        title: '门派',
        dataIndex: 'menpai',
        key: 'menpai',
        render: (text, record) => {
          switch (parseInt(text)) {
            case 0: return '正剑门';
            case 1: return '百花';
            case 2: return '昆仑';
            case 3: return '天魔';
            case 4: return '万妖';
            case 5: return '森罗';
            case -1: return '无门派';
            default: return '';
          }
        }
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
        title: 'UID',
        dataIndex: 'uid',
        key: 'uid',
      },
      {
        title: 'R2账号',
        dataIndex: 'r2id',
        key: 'r2id',
      },
      {
        title: '所在服务器',
        dataIndex: 'part_name',
        key: 'part_name',
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
      },
      {
        title: '身份证号',
        dataIndex: 'real_id',
        key: 'real_id',
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
                  initialValue: '1',
                })(
                  <Select style={{ width: 100 }}>
                    {/* <Select.Option value="0">角色名</Select.Option> */}
                    <Select.Option value="1">guid</Select.Option>
                    <Select.Option value="2">uid</Select.Option>
                    <Select.Option value="3">手机号</Select.Option>
                    {/* <Select.Option value="4">模糊角色名</Select.Option> */}
                    <Select.Option value="5">R2账号</Select.Option>
                    <Select.Option value="6">角色ID</Select.Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item style={{ marginRight: 40 }} label="查询内容">
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
        <Card style={{ marginTop: 30, minHeight: 1000, marginBottom: 40 }} title={<p>
          当前选中玩家：
          {selectedPlayer && selectedPlayer.name ? <span style={{ fontWeight: 'bold' }}>{`${selectedPlayer.name} (GUID=${selectedPlayer.guid})`}</span> : '无选中玩家'}
        </p>}>
          <Row>
            <Col span={4}>
              <Menu mode="inline" selectedKeys={[this.state.menu]} defaultOpenKeys={['playerinfo']}>
                {this.showMenu('1-1', (
                  <Menu.SubMenu key="playerinfo" title="玩家信息">
                    {this.showMenu('1-1-1', (
                      <Menu.Item onClick={() => this.select('basic-info')} key="basic-info">玩家基本信息</Menu.Item>
                    ))}
                    {this.showMenu('1-1-2', (
                      <Menu.Item onClick={() => this.select('bag-info')} key="bag-info">背包信息</Menu.Item>
                    ))}
                    {this.showMenu('1-1-3', (
                      <Menu.Item onClick={() => this.select('hero-info')} key="hero-info">英雄信息</Menu.Item>
                    ))}
                    {this.showMenu('1-1-4', (
                      <Menu.Item onClick={() => this.select('entrust-info')} key="entrust-info">交易信息</Menu.Item>
                    ))}
                    {this.showMenu('1-1-5', (
                      <Menu.Item onClick={() => this.select('dress-info')} key="dress-info">个性化装扮</Menu.Item>
                    ))}
                    {/* {this.showMenu('1-1-6', (
                      <Menu.Item onClick={() => this.select('skill-info')} key="skill-info">技能信息</Menu.Item>
                    ))}
                    {this.showMenu('1-1-7', (
                      <Menu.Item onClick={() => this.select('title-info')} key="title-info">称号信息</Menu.Item>
                    ))}
                    {this.showMenu('1-1-8', (
                      <Menu.Item onClick={() => this.select('pet-info')} key="pet-info">宠物信息</Menu.Item>
                    ))}
                    {this.showMenu('1-1-9', (
                      <Menu.Item onClick={() => this.select('task-info')} key="task-info">任务</Menu.Item>
                    ))}
                    {this.showMenu('1-1-10', (
                      <Menu.Item onClick={() => this.select('home-info')} key="home-info">家园</Menu.Item>
                    ))} */}
                    {this.showMenu('1-1-11', (
                      <Menu.Item onClick={() => this.select('email-info')} key="email-info">邮件</Menu.Item>
                    ))}
                    {/* {this.showMenu('1-1-12', (
                      <Menu.Item onClick={() => this.select('marriage-info')} key="marriage-info">社交</Menu.Item>
                    ))} */}
                  </Menu.SubMenu>
                ))}
                {this.showMenu('1-2', (
                  <Menu.SubMenu key="gmact" title="GM操作">
                    {this.showMenu('1-2-1', (
                      <Menu.Item onClick={() => this.select('award')} key="award">物品发放（邮件）</Menu.Item>
                    ))}
                    {this.showMenu('1-2-2', (
                      <Menu.Item onClick={() => this.select('award-d')} key="award-d">物品发放（直接修改）</Menu.Item>
                    ))}
                    {this.showMenu('1-2-3', (
                      <Menu.Item onClick={() => this.select('reissue')} key="reissue">充值补发</Menu.Item>
                    ))}
                    {this.showMenu('1-2-4', (
                      <Menu.Item onClick={() => this.select('pet')} key="pet">修改英雄数据</Menu.Item>
                    ))}
                    {this.showMenu('1-2-5', (
                      <Menu.Item onClick={() => this.select('player')} key="player">修改角色数据</Menu.Item>
                    ))}
                    {this.showMenu('1-2-6', (
                      <Menu.Item onClick={() => this.select('forcedown')} key="forcedown">踢玩家下线</Menu.Item>
                    ))}
                    {this.showMenu('1-2-7', (
                      <Menu.Item onClick={() => this.select('change-pass')} key="change-pass">修改密码</Menu.Item>
                    ))}
                    {this.showMenu('1-2-8', (
                      <Menu.Item onClick={() => this.select('untie-phone')} key="untie-phone">解除绑定手机</Menu.Item>
                    ))}
                    {this.showMenu('1-2-11', (
                      <Menu.Item onClick={() => this.select('untie-r2')} key="untie-r2">解除R2Game账号绑定</Menu.Item>
                    ))}
                    {this.showMenu('1-2-9', (
                      <Menu.Item onClick={() => this.select('del-mail')} key="del-mail">删除邮件</Menu.Item>
                    ))}
                    {this.showMenu('1-2-10', (
                      <Menu.Item onClick={() => this.select('gm-ins')} key="gm-ins">GM指令</Menu.Item>

                    ))}
                  </Menu.SubMenu>
                ))}
                {/* {this.showMenu('1-3', (
                  <Menu.SubMenu key="clear" title="清除数据">
                    {this.showMenu('1-3-1', (
                      <Menu.Item onClick={() => this.select('clear-secure-code')} key="clear-secure-code">清除安全码</Menu.Item>
                    ))}
                    {this.showMenu('1-3-2', (
                      <Menu.Item onClick={() => this.select('unusual-task')} key="unusual-task">清除非正常任务</Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ))} */}

                {this.showMenu('1-4', (
                  <Menu.SubMenu key="ban" title="封号/禁言">
                    {this.showMenu('1-4-1', (
                      <Menu.Item onClick={() => this.select('ban-account')} key="ban-account">封号/解封</Menu.Item>
                    ))}
                    {this.showMenu('1-4-2', (
                      <Menu.Item onClick={() => this.select('ban-account-info')} key="ban-account-info">封号状态</Menu.Item>
                    ))}
                    {this.showMenu('1-4-5', (
                      <Menu.Item onClick={() => this.select('uid-ban-account-info')} key="uid-ban-account-info">封号状态(UID级别)</Menu.Item>
                    ))}
                     {this.showMenu('1-4-6', (
                      <Menu.Item onClick={() => this.select('black-list-info')} key="black-list-info">黑名单</Menu.Item>
                    ))}
                    {this.showMenu('1-4-3', (
                      <Menu.Item onClick={() => this.select('ban-talk')} key="ban-talk">禁言/解禁</Menu.Item>
                    ))}
                    {this.showMenu('1-4-4', (
                      <Menu.Item onClick={() => this.select('ban-talk-info')} key="ban-talk-info">禁言状态</Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ))}

                {this.showMenu('1-5', (
                  <Menu.Item onClick={() => this.select('export')} key="export">批量导出</Menu.Item>
                ))}

              </Menu>
            </Col>
            <Col span={20}>
              <Spin tip="加载中..." spinning={dataLoading}>
                <Switch
                  menu={menu}
                  data={data}
                  global={this.props.global}
                  guid={selectedPlayer && selectedPlayer.guid ? selectedPlayer.guid : false}
                  part_id={this.props.global.part_id}
                  uid={selectedPlayer && selectedPlayer.uid ? selectedPlayer.uid : ''}
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
