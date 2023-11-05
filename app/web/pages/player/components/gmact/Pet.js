import React from 'react';
import { Tabs } from 'antd';

import { fetchInfo } from '../../../../service/playerinfo';
import BasicData from './herotab/BasicData';
import BasicEquip from './herotab/BasicEquip';
import UniqEquip from './herotab/UniqEquip';
import Cangpin from './herotab/Cangpin';

/**
 * 修改英雄数据
 */
class Pet extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      heros: [],
    }
  }

  componentDidMount() {
    const { guid, part_id, uid } = this.props;
    fetchInfo('hero-info', { guid, part_id, uid }).then(data => {
      const heros = data.payload.map(hero => {
        let hero_id = '';
        let hero_name = '';
        hero.basic.forEach(item => {
          if (item.key === 'id') {
            hero_id = item.value;
          }
          if (item.key === 'name') {
            hero_name = item.value;
          }
        });
        if (hero_id && hero_name) {
          return { id: hero_id, name: hero_name };
        }
      });
      this.setState({ heros });
    });
  }

  selectType = (type) => {
    const { guid, part_id } = this.props;
    const { heros } = this.state;
    switch (type.type) {
      case 1: return <BasicData heros={heros} guid={guid} part_id={part_id} />;
      case 2: return <BasicEquip heros={heros} guid={guid} part_id={part_id} />;
      case 3: return <UniqEquip heros={heros} guid={guid} part_id={part_id} />;
      case 4: return <Cangpin heros={heros} guid={guid} part_id={part_id} />;
      default: return null;
    }
  }

  render() {
    const types = [
      { type: 1, name: '基础数据' },
      { type: 2, name: '基础装备' },
      { type: 3, name: '专属装备' },
      { type: 4, name: '藏品' },
    ];
    return (
      <Tabs type="card">
        {types.map(type => (
          <Tabs.TabPane key={`${type.type}`} tab={`${type.name}`}>
            {this.selectType(type)}
          </Tabs.TabPane>
        ))}
      </Tabs>
    );
  }
}

export default Pet;
