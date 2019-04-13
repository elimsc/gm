import React from 'react';
import TableInfo from '@/components/TablelInfo';
import { Divider } from 'antd';

const data = [
  [
    {title: '宠物名称', value: '宠物1'},
    {title: '等级', value: 10},
    {title: 'GUID', value: 1231312312312312},
    {title: '亲密度', value: 10},
    {title: '悟性', value: 100},
    {title: '经验', value: 1231233534534},
    {title: '当前HP', value: 10000},
    {title: '攻击', value: 40},
    {title: '封印', value: 10},
    {title: 'MP', value: 10},
    {title: '敏捷', value: 90},
    {title: '速度', value: 12313},
    {title: '等级', value: 10},
    {title: 'GUID', value: 1231312312312312},
    {title: '亲密度', value: 10},
    {title: '悟性', value: 100},
    {title: '经验', value: 1231233534534},
    {title: '当前HP', value: 10000},
    {title: '攻击', value: 40},
    {title: '封印', value: 10},
    {title: 'MP', value: 10},
    {title: '敏捷', value: 90},
    {title: '速度', value: 12313},
  ],
  [
    {title: '宠物名称', value: '宠物2'},
    {title: '等级', value: 10},
    {title: 'GUID', value: 1231312312312312},
    {title: '亲密度', value: 10},
    {title: '悟性', value: 100},
    {title: '经验', value: 1231233534534},
    {title: '当前HP', value: 10000},
    {title: '攻击', value: 40},
    {title: '封印', value: 10},
    {title: 'MP', value: 10},
    {title: '敏捷', value: 90},
    {title: '速度', value: 12313},
    {title: '等级', value: 10},
    {title: 'GUID', value: 1231312312312312},
    {title: '亲密度', value: 10},
    {title: '悟性', value: 100},
    {title: '经验', value: 1231233534534},
    {title: '当前HP', value: 10000},
    {title: '攻击', value: 40},
    {title: '封印', value: 10},
    {title: 'MP', value: 10},
    {title: '敏捷', value: 90},
    {title: '速度', value: 12313},
  ],
  [
    {title: '宠物名称', value: '宠物3'},
    {title: '等级', value: 10},
    {title: 'GUID', value: 1231312312312312},
    {title: '亲密度', value: 10},
    {title: '悟性', value: 100},
    {title: '经验', value: 1231233534534},
    {title: '当前HP', value: 10000},
    {title: '攻击', value: 40},
    {title: '封印', value: 10},
    {title: 'MP', value: 10},
    {title: '敏捷', value: 90},
    {title: '速度', value: 12313},
    {title: '等级', value: 10},
    {title: 'GUID', value: 1231312312312312},
    {title: '亲密度', value: 10},
    {title: '悟性', value: 100},
    {title: '经验', value: 1231233534534},
    {title: '当前HP', value: 10000},
    {title: '攻击', value: 40},
    {title: '封印', value: 10},
    {title: 'MP', value: 10},
    {title: '敏捷', value: 90},
    {title: '速度', value: 12313},
  ],

];

class PetInfo extends React.Component {
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

export default PetInfo;
