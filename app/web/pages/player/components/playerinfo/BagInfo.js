import React from 'react';

import TableInfo from '@/components/TablelInfo';
import { Divider } from 'antd';

const data = [
  [
    {title: '道具名称', value: '道具1'},
    {title: '数量', value: 2},
    {title: '绑定状态', value: '绑定'},
    {title: '使用时限', value: 0},
    {title: '创建时间', value: '2018.1.2'},
  ],
  [
    {title: '道具名称', value: '道具2'},
    {title: '数量', value: 2},
    {title: '绑定状态', value: '绑定'},
    {title: '使用时限', value: 0},
    {title: '创建时间', value: '2018.1.2'},
  ],
  [
    {title: '道具名称', value: '道具3'},
    {title: '数量', value: 2},
    {title: '绑定状态', value: '绑定'},
    {title: '使用时限', value: 0},
    {title: '创建时间', value: '2018.1.2'},
  ],
  [
    {title: '道具名称', value: '道具4'},
    {title: '数量', value: 2},
    {title: '绑定状态', value: '绑定'},
    {title: '使用时限', value: 0},
    {title: '创建时间', value: '2018.1.2'},
  ],
  [
    {title: '道具名称', value: '道具5'},
    {title: '数量', value: 2},
    {title: '绑定状态', value: '绑定'},
    {title: '使用时限', value: 0},
    {title: '创建时间', value: '2018.1.2'},
  ],
];

class BagInfo extends React.Component {
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

export default BagInfo;
