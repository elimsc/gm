import React from 'react';

import TableInfo from '@/components/TablelInfo';
import { Divider } from 'antd';

const data = [
  [
    {title: '技能名称', value: '技能1'},
    {title: '技能等级', value: 2},
  ],
  [
    {title: '技能名称', value: '技能2'},
    {title: '技能等级', value: 2},
  ],
  [
    {title: '技能名称', value: '技能3'},
    {title: '技能等级', value: 2},
  ],
  [
    {title: '技能名称', value: '技能4'},
    {title: '技能等级', value: 2},
  ],
  [
    {title: '技能名称', value: '技能5'},
    {title: '技能等级', value: 2},
  ],
  [
    {title: '技能名称', value: '技能6'},
    {title: '技能等级', value: 2},
  ],
  [
    {title: '技能名称', value: '技能7'},
    {title: '技能等级', value: 2},
  ],

];

class SkillInfo extends React.Component {
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

export default SkillInfo;
