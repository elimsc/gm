import React from 'react';
import { Input, Divider } from 'antd';

import TableInfoList from '@/components/TableInfoList';


class WarehouseInfo extends React.PureComponent {
  // render() {
  //   return (
  //     <TableInfoList data={this.props.data} defaultPageSize={20} />
  //   );
  // }
  state = {
    data: [],
    idInput: '',
    nameInput: '',
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.idInput !== prevState.idInput
      || this.state.nameInput !== prevState.nameInput
      || this.props.data.length !== prevProps.data.length) {
      this.setState({
        data: this.filter(this.props.data, {
          id: this.state.idInput,
          name: this.state.nameInput
        })
      });
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
    return (
      <div>
        <Input.Search
          allowClear
          placeholder="按ID查询"
          onSearch={(id) => this.setState({ idInput: id.trim() })}
          style={{ width: '35%', marginLeft: '8%' }}
        />
        <Input.Search
          allowClear
          placeholder="按名字查询"
          onSearch={(name) => this.setState({ nameInput: name.trim() })}
          style={{ width: '35%', marginLeft: '8%' }}
        />
        <Divider />
        <TableInfoList data={this.state.data} defaultPageSize={20} />
      </div>
    );
  }
}

export default WarehouseInfo;
