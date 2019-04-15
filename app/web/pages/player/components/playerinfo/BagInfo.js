import React from 'react';

import TableInfoList from '@/components/TableInfoList';

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
  [
    {title: '道具名称', value: '道具6'},
    {title: '数量', value: 2},
    {title: '绑定状态', value: '绑定'},
    {title: '使用时限', value: 0},
    {title: '创建时间', value: '2018.1.2'},
  ],
  [
    {title: '道具名称', value: '道具6'},
    {title: '数量', value: 2},
    {title: '绑定状态', value: '绑定'},
    {title: '使用时限', value: 0},
    {title: '创建时间', value: '2018.1.2'},
  ],
];

class BagInfo extends React.Component {
  render() {
    return (
     <TableInfoList data={data} />
    );
  }
}

export default BagInfo;
