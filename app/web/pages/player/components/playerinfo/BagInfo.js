import React from 'react';
import { Input, Divider, Tabs } from 'antd';
import TableInfoList from '@/components/TableInfoList';


class BagInfo extends React.PureComponent {

 constructor(props) {
  super(props)
  this.state = {
    data: this.props.data,
    idInput: '',
    nameInput: '',
  }
 }

 componentDidUpdate(prevProps, prevState) {
  if (this.state.idInput !== prevState.idInput
    || this.state.nameInput !== prevState.nameInput || this.props.data.length !== prevProps.data.length) {
      this.setState({data: {
        total: this.filter(this.props.data.total, {
          id: this.state.idInput,
          name: this.state.nameInput
        }),
        itemlist: this.filter(this.props.data.itemlist, {
          id: this.state.idInput,
          name: this.state.nameInput
        }),
        equiplist: this.filter(this.props.data.equiplist, {
          id: this.state.idInput,
          name: this.state.nameInput
        }),
        herofraglist: this.filter(this.props.data.herofraglist, {
          id: this.state.idInput,
          name: this.state.nameInput
        }),
        cangpinlist: this.filter(this.props.data.cangpinlist, {
          id: this.state.idInput,
          name: this.state.nameInput
        }),
      }})
  }
  
 }

 filter = (data, filterData) => {
  let key = {
    id: !!filterData.id,
    name: !!filterData.name,
  };
  if (!key.id && !key.name) return data; // 没有进行查询操作

  const result = [];
  const expect = key.id + key.name; // true + true = 2, true + false = 1
  for (const item of data) {
    let current = 0; // when current == expect, all filter conditions has been satisfied.
    for (const prop of item) {
      if (key.id && prop.key === 'id' && prop.value == filterData.id) {
        current += 1;
      }
      if (key.name && prop.key === 'name' && prop.value == filterData.name) {
        current += 1;
      }
      if (current === expect) { // got it!
        result.push(item);
        break;
      }
    }
  }
  return result;
}


  render() {
    console.log(this.props.data, this.state.data);
    return (
      <div>
        <Input.Search
          placeholder="按ID查询"
          onSearch={(id) => this.setState({ idInput: id.trim() })}
          style={{ width: '35%', marginLeft: '8%' }}
        />
        <Input.Search
          placeholder="按名字查询"
          onSearch={(name) => this.setState({ nameInput: name.trim() })}
          style={{ width: '35%', marginLeft: '8%' }}
        />
        <Divider />
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab="全部" key='1'>
          <TableInfoList data={this.state.data.total} defaultPageSize={20} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="物品" key='2'>
          <TableInfoList data={this.state.data.itemlist} defaultPageSize={20} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="装备" key='3'>
          <TableInfoList data={this.state.data.equiplist} defaultPageSize={20} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="觉醒者" key='4'>
          <TableInfoList data={this.state.data.herofraglist} defaultPageSize={20} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="藏品" key='5'>
          <TableInfoList data={this.state.data.cangpinlist} defaultPageSize={20} />
        </Tabs.TabPane>
      </Tabs>
     </div>
    );
  }
}

export default BagInfo;
