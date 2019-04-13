import React from 'react';

import TableInfo from '@/components/TablelInfo';
import { Divider } from 'antd';

const data = [
  [
    {title: '装备名称', value: '装备1'},
    {title: '强化等级', value: 2},
    {title: '精炼等级', value: 4},
    {title: '宝石等级', value: 3},
    {title: '器灵等级', value: 5},
    {title: '铭文等级', value: 10},
  ],
  [
    {title: '装备名称', value: '装备2'},
    {title: '强化等级', value: 2},
    {title: '精炼等级', value: 4},
    {title: '宝石等级', value: 3},
    {title: '器灵等级', value: 5},
    {title: '铭文等级', value: 10},
  ],[
    {title: '装备名称', value: '装备3'},
    {title: '强化等级', value: 2},
    {title: '精炼等级', value: 4},
    {title: '宝石等级', value: 3},
    {title: '器灵等级', value: 5},
    {title: '铭文等级', value: 10},
  ],[
    {title: '装备名称', value: '装备4'},
    {title: '强化等级', value: 2},
    {title: '精炼等级', value: 4},
    {title: '宝石等级', value: 3},
    {title: '器灵等级', value: 5},
    {title: '铭文等级', value: 10},
  ],[
    {title: '装备名称', value: '装备5'},
    {title: '强化等级', value: 2},
    {title: '精炼等级', value: 4},
    {title: '宝石等级', value: 3},
    {title: '器灵等级', value: 5},
    {title: '铭文等级', value: 10},
  ],
];

class EquipInfo extends React.Component {
  render() {
    return (
      data.map((value, index) => (
        <div>
          <TableInfo style={{marginLeft: 20}} data={value} />
          <Divider />
        </div>
      ))
    );
  }
}

export default EquipInfo;
