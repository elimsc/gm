import React from 'react';
import { Tabs } from 'antd';

import { fetchInfo } from '../../../../service/playerinfo';
import Level from './pettab/Level';
import PracLevel from './pettab/PracLevel';
import LfLevel from './pettab/LfLevel';

/**
 * 修改宠物数据
 */
class Pet extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      pets: [],
    }
  }

  componentDidMount() {
    const { guid, part_id, uid } = this.props;
    fetchInfo('pet-info', { guid, part_id, uid }).then(data => {
      const pets = data.payload.map(pet => {
        let pet_guid = '';
        let pet_name = '';
        pet.forEach(item => {
          if (item.key === 'guid') {
            pet_guid = item.value;
          }
          if (item.key === 'name') {
            pet_name = item.value;
          }
        });
        if (pet_guid && pet_name) {
          return { guid: pet_guid, name: pet_name };
        }
      });
      this.setState({ pets });
    });
  }

  selectType = (type) => {
    const { guid, part_id } = this.props;
    const { pets } = this.state;
    switch (type.type) {
      case 3: return <Level pets={pets} guid={guid} part_id={part_id} />;
      case 4: return <PracLevel pets={pets} guid={guid} part_id={part_id} />;
      case 5: return <LfLevel pets={pets} guid={guid} part_id={part_id} />;
      default: return null;
    }
  }

  render() {
    const types = [
      { type: 3, name: '等级' },
      { type: 4, name: '修炼等级' },
      { type: 5, name: '炼符等级' },
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
