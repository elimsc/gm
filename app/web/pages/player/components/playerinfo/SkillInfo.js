import React from 'react';


import TableInfoList from '../../../../components/TableInfoList';

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
      <TableInfoList data={data} />
    );
  }
}

export default SkillInfo;
