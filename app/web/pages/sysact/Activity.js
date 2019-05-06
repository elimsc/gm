import React from 'react';

import { Transfer, Card, Button, message, Spin } from 'antd';
import {connect} from 'dva';

@connect(({ global }) => ({ global }))
class Activity extends React.Component {
  state = {
    mockData: [],
    targetKeys: [],
    loading: true,
  }

  componentDidMount() {
    this.getMock();
    this.setState({ loading: false });
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  }

  filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1

  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  }

  handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };

  handleSubmit = e => {
    console.log(this.state.targetKeys)
    message.info('功能未实现');
  }

  render() {
    const { part_id, srvList } = this.props.global;

    const cur_srv = srvList.filter(v => v.part_id === part_id)[0];
    let part_name = '无';
    if (cur_srv) {
      part_name = cur_srv.part_name;
    }
    return (
      <Spin tip="加载中..." spinning={this.state.loading}>
        <Card title={`当前选中区服: ${part_name}`} style={{ minHeight: 500 }}>
          <Button style={{ marginBottom: 20, width: 150 }} size="large" type="primary" onClick={this.handleSubmit}>提交修改</Button>

          <Transfer
            dataSource={this.state.mockData}
            showSearch
            listStyle={{ width: 400, height: 700 }}
            filterOption={this.filterOption}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            onSearch={this.handleSearch}
            render={item => item.title}
            titles={['未启用活动/服务', '已启用活动/服务']}
            locale={{ itemUnit: '项', itemsUnit: '项', notFoundContent: '内容为空', searchPlaceholder: '输入进行筛选' }}
          />

        </Card>
      </Spin>
    );
  }
}

export default Activity;
