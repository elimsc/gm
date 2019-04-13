import React, { ReactNode } from 'react';
import { Col, Form, Input, Row } from 'antd';
import TableInfo from '@/components/TablelInfo';

const data = [
  {title: 'HP', value: '123123123132'},
  {title: 'H1P', value: '123123123132'},
  {title: 'HP2', value: '123123123132'},
  {title: 'HP4', value: '123123123132'},
  {title: 'HP5', value: '123123123132'},
  {title: 'HP6', value: '123123123132'},
  {title: 'HP7', value: '123123123132'},
  {title: 'HP8', value: '123123123132'},
  {title: '攻击', value: '21'},
  {title: '物防', value: '0'},
  {title: 'H2P', value: '123123123132'},
  {title: 'H3P', value: '123123123132'},
  {title: 'H4P', value: '123123123132'},
];


// 玩家基本信息
const BasicInfo = props => {

  return (
     <TableInfo style={{marginLeft: 20}} data={data} />
  );
}

export default BasicInfo;
