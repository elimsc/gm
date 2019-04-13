import React from 'react';
import Form from 'antd/lib/form';
import { Card, Row, Col, Input, Button, Table, Menu, Empty } from 'antd';
import BasicInfo from './components/playerinfo/BasicInfo';
import BagInfo from './components/playerinfo/BagInfo';
import WarehouseInfo from './components/playerinfo/WarehouseInfo';
import EquipInfo from './components/playerinfo/EquipInfo';
import SkillInfo from './components/playerinfo/SkillInfo';
import TitleInfo from './components/playerinfo/TitleInfo';
import PetInfo from './components/playerinfo/PetInfo';
import TaskInfo from './components/playerinfo/TaskInfo';
import HomeInfo from './components/playerinfo/HomeInfo';
import EmailInfo from './components/playerinfo/EmailInfo';
import MarriageInfo from './components/playerinfo/MarriageInfo';
import Money from './components/gmact/Money';
import Exp from './components/gmact/Exp';
import ChangePass from './components/gmact/ChangePass';
import Forcedown from './components/gmact/Forcedown';
import PetsymbolLevel from './components/gmact/PetsymbolLevel';
import PracLevel from './components/gmact/PracLevel';
import Prop from './components/gmact/Prop';
import SecureCode from './components/gmact/SecureCode';
import UntiePhone from './components/gmact/UntiePhone';
import TitleM from './components/gmact/TitleM';
import ClearSecureCode from './components/clear/ClearSecureCode';
import UnusualGang from './components/clear/UnusualGang';
import UnusualTask from './components/clear/UnusualTask';
import BanTalk from './components/ban/BanTalk';
import BanLog from './components/ban/BanLog';
import BanAccount from './components/ban/BanAccount';

// temp data
const data = [
  {
    name: '小小号1',
    sex: '男',
    menpai: '正剑门',
    level: '50',
    guid: '123131231423434535',
  },
  {
    name: '小小号2',
    sex: '男',
    menpai: '正剑门',
    level: '50',
    guid: '123131231423434535',
  },
  {
    name: '小小号3',
    sex: '男',
    menpai: '正剑门',
    level: '50',
    guid: '123131231423434535',
  },
];




class PlayerMan extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      player: null,
      menu: 'basic-info', // 当前选中menu
    }
  }

  handleSearch(e) {
    e.preventDefault();
    console.log(e);
  }

  select(menu) {
    this.setState({ menu });
  }

  render() {

    // 玩家查询结果列表用
    const columns = [
      {
        title: '角色名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
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
        title: 'guid',
        dataIndex: 'guid',
        key: 'guid',
      },
      {
        title: '操作',
        key: 'action',
        render: () => (
          <Button type="primary">选中</Button>
        )
      }
    ];



    return (
      <div>
        <Card>
          <Form layout="inline" onSubmit={(e) => this.handleSearch(e)}>
            <Row>
              <Col span={6}>
                <Form.Item label="查询内容">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="查询">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="服务器">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Button htmlType="submit" type="primary">查询</Button>
              </Col>
            </Row>
          </Form>
          <Table rowKey={record => record.name} style={{marginTop: 20}} columns={columns} dataSource={data} />
        </Card>
        <Card style={{marginTop: 30, minHeight: 800}} title="当前选中玩家：小小玩家1">
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
                </Menu.SubMenu>
                <Menu.SubMenu key="clear" title="清除数据">
                  <Menu.Item onClick={() => this.select('clear-secure-code')} key="clear-secure-code">清除安全码</Menu.Item>
                  <Menu.Item onClick={() => this.select('unusual-gang')} key="unusual-gang">清除非正常帮会数据</Menu.Item>
                  <Menu.Item onClick={() => this.select('unusual-task')} key="unusual-task">清除非正常任务</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="ban" title="封号/禁言">
                  <Menu.Item onClick={() => this.select('ban-account')} key="ban-account">封号</Menu.Item>
                  <Menu.Item onClick={() => this.select('ban-talk')} key="ban-talk">禁言</Menu.Item>
                  <Menu.Item onClick={() => this.select('ban-log')} key="ban-log">禁言记录</Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </Col>
            <Col span={20}>
              {show(this.state.menu)}
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

// 根据当前选中菜单显示信息
function show(key) {
  switch (key) {
    case 'basic-info':
      return <BasicInfo />;
    case 'bag-info':
      return <BagInfo />;
    case 'warehouse-info':
      return <WarehouseInfo />;
    case 'equip-info':
      return <EquipInfo />;
    case 'skill-info':
      return <SkillInfo />;
    case 'title-info':
      return <TitleInfo />;
    case 'pet-info':
      return <PetInfo />;
    case 'task-info':
      return <TaskInfo />;
    case 'home-info':
      return <HomeInfo />;
    case 'email-info':
      return <EmailInfo />;
    case 'marriage-info':
      return <MarriageInfo />;

    case 'money':
      return <Money />;
    case 'exp':
      return <Exp />;
    case 'change-pass':
      return <ChangePass />;
    case 'forcedown':
      return <Forcedown />
    case 'petsymbol-level':
      return <PetsymbolLevel />;
    case 'prac-level':
      return <PracLevel />;
    case 'prop':
      return <Prop />;
    case 'secure-code':
      return <SecureCode />;
    case 'title':
      return <TitleM /> ;
    case 'untie-phone':
      return <UntiePhone />;

    case 'clear-secure-code':
      return <ClearSecureCode />;
    case 'unusual-gang':
      return <UnusualGang />;
    case 'unusual-task':
      return <UnusualTask />;

    case 'ban-talk':
      return <BanTalk />;
    case 'ban-log':
      return <BanLog />;
    case 'ban-account':
      return <BanAccount />;

    default:
      break;
  }
}

export default PlayerMan;
