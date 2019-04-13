import React from 'react';
import TableInfo from '@/components/TablelInfo';
import { Divider } from 'antd';

const data = [
  [
    {title: '称号名称', value: '称号11111111111'},
    {title: '称号时限', value: 0},
    {title: '称号创建时间', value: '2014.1.1'},
  ],
  [
    {title: '称号名称', value: '称号1111123111111'},
    {title: '称号时限', value: 0},
    {title: '称号创建时间', value: '2014.1.1'},
  ],
  [
    {title: '称号名称', value: '称号111241111111'},
    {title: '称号时限', value: 0},
    {title: '称号创建时间', value: '2014.1.1'},
  ],
  [
    {title: '称号名称', value: '称号111154235111111'},
    {title: '称号时限', value: 0},
    {title: '称号创建时间', value: '2014.1.1'},
  ],
  [
    {title: '称号名称', value: '称号111111123511'},
    {title: '称号时限', value: 0},
    {title: '称号创建时间', value: '2014.1.1'},
  ],
  [
    {title: '称号名称', value: '称号11154611111'},
    {title: '称号时限', value: 0},
    {title: '称号创建时间', value: '2014.1.1'},
  ],

];

class TitleInfo extends React.Component {
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

export default TitleInfo;
