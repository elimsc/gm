import React from 'react';
import { Input, Divider, Tabs } from 'antd';
import TableInfoList from '@/components/TableInfoList';
import TableInfo from '@/components/TableInfo';


class HeroInfo extends React.PureComponent {


  render() {
    console.log(this.props.data);
    return (
        <Tabs>
            {this.props.data.map((hero, i) => (
               <Tabs.TabPane tab={hero.name} key={i}>
                 <Tabs>
                    <Tabs.TabPane tab="基础信息" key='1'>
                        <TableInfo data={hero.basic} /> 
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="装备信息" key='2'>
                        <TableInfoList data={hero.equips} /> 
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="藏品信息" key='3'>
                        <TableInfoList data={hero.cangpins} /> 
                    </Tabs.TabPane>
                </Tabs>
               </Tabs.TabPane>
                
            ))}
        </Tabs>
    );
  }
}

export default HeroInfo;
