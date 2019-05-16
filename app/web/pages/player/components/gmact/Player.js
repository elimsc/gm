import React from 'react';
import { Tabs } from 'antd';
import Level from './playertab/Level';
import TitleM from './playertab/TitleM';


class Player extends React.PureComponent {
  render() {
    const { guid, part_id } = this.props;
    const types = [
      { type: 1, name: '等级' },
      { type: 2, name: '称号' },
    ];
    const selectType = (type) => {
      switch (type.type) {
        case 1: return <Level guid={guid} part_id={part_id} />;
        case 2: return <TitleM guid={guid} part_id={part_id} />;
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
