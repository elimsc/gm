import React from 'react';
import { Tabs } from 'antd';
import Level from './playertab/Level';
import Touxiang from './playertab/Touxiang';
import Touxiangkunag from './playertab/Touxiangkunag';
import Mingpian from './playertab/Mingpian';


class Player extends React.PureComponent {
  render() {
    const { guid, part_id } = this.props;
    const types = [
      { type: 1, name: '等级' },
      { type: 2, name: '头像' },
      { type: 3, name: '头像框' },
      { type: 4, name: '名片' },
    ];
    const selectType = (type) => {
      switch (type.type) {
        case 1: return <Level guid={guid} part_id={part_id} />;
        case 2: return <Touxiang guid={guid} part_id={part_id} />;
        case 3: return <Touxiangkunag guid={guid} part_id={part_id} />;
        case 4: return <Mingpian guid={guid} part_id={part_id} />;
        default: return null;
      }
    }
    return (
      <Tabs type="card">
        {types.map(type => (
          <Tabs.TabPane key={`${type.type}`} tab={`${type.name}`}>
            {selectType(type)}
          </Tabs.TabPane>
        ))}
      </Tabs>
    );
  }
}

export default Player;
