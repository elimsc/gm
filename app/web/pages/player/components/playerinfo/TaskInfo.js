import React from 'react';

import TableInfo from '@/components/TablelInfo';
import { Divider } from 'antd';

const data = [
  [
    {title: '任务id', value: '1233243450984305'},
    {title: '状态 ', value: '已接取'},
  ],
  [
    {title: '任务id', value: '1233243450984306'},
    {title: '状态 ', value: '未接取'},
  ],
  [
    {title: '任务id', value: '1233243450984305'},
    {title: '状态 ', value: '已接取'},
  ],
  [
    {title: '任务id', value: '1233243450984306'},
    {title: '状态 ', value: '未接取'},
  ],
  [
    {title: '任务id', value: '1233243450984305'},
    {title: '状态 ', value: '已接取'},
  ],
  [
    {title: '任务id', value: '1233243450984306'},
    {title: '状态 ', value: '未接取'},
  ],
  [
    {title: '任务id', value: '1233243450984305'},
    {title: '状态 ', value: '已接取'},
  ],
  [
    {title: '任务id', value: '1233243450984306'},
    {title: '状态 ', value: '未接取'},
  ],
  [
    {title: '任务id', value: '1233243450984305'},
    {title: '状态 ', value: '已接取'},
  ],
  [
    {title: '任务id', value: '1233243450984306'},
    {title: '状态 ', value: '未接取'},
  ],

];

class TaskInfo extends React.Component {
  render() {
    return (
      data.map((value, index) => (
        <div key={`${index}`}>
          <TableInfo style={{marginLeft: 20}} data={value} />
          <Divider />
        </div>
      ))
    );
  }
}

export default TaskInfo;
