import React from 'react';
import { Tabs } from 'antd';
import Exp from './awardtab/Exp';
import Money from './awardtab/Money';
import Prop from './awardtab/Prop';
import PetExp from './awardtab/PetExp';


class Award extends React.PureComponent {
  render() {
    const { guid, part_id } = this.props;
    const types = [
      // { type: 0, name: '经验' },
      { type: 1, name: '货币' },
      { type: 2, name: '道具' },
      // { type: 3, name: '宠物经验' },
      // { type: 4, name: '帮会资金' },
      // { type: 5, name: '帮会资历' },
    ];
    const selectType = (type) => {
      switch (type.type) {
        case 0: return <Exp guid={guid} part_id={part_id} />;
        case 1: return <Money guid={guid} part_id={part_id} />;
        case 2: return <Prop guid={guid} part_id={part_id} />;
        case 3: return <PetExp guid={guid} part_id={part_id} />;
        case 4: return null;
        case 5: return null;
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

export default Award;
