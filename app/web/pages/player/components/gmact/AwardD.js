import React from 'react';
import { Tabs } from 'antd';
import Exp from './awarddtab/Exp';
import Money from './awarddtab/Money';
import Prop from './awarddtab/Prop';



class AwardD extends React.PureComponent {
  render() {
    const { guid, part_id } = this.props;
    const types = [
      { type: 0, name: '经验' },
      { type: 1, name: '货币' },
      { type: 2, name: '道具' },
    ];
    const selectType = (type) => {
      switch (type.type) {
        case 0: return <Exp guid={guid} part_id={part_id} />;
        case 1: return <Money guid={guid} part_id={part_id} />;
        case 2: return <Prop guid={guid} part_id={part_id} />;
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

export default AwardD;
