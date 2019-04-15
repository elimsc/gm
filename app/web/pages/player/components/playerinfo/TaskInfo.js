import React from 'react';

import TableInfoList from '../../../../components/TableInfoList';

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
      <TableInfoList data={data} />
    );
  }
}

export default TaskInfo;
