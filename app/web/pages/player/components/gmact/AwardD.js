import React from "react";
import { Tabs } from "antd";
import Exp from "./awarddtab/Exp";
import Money from "./awarddtab/Money";
import PropAdd from "./awarddtab/PropAdd";
import PropDelete from "./awarddtab/PropDelete";
import GodExp from "./awarddtab/GodExp";

class AwardD extends React.PureComponent {
  render() {
    const { guid, part_id } = this.props;
    const types = [
      { type: 0, name: "经验" },
      { type: 1, name: "货币" },
      { type: 2, name: "道具增加" },
      { type: 3, name: "道具删除" },
      { type: 4, name: "仙气值" }
    ];
    const selectType = type => {
      switch (type.type) {
        case 0:
          return <Exp guid={guid} part_id={part_id} />;
        case 1:
          return <Money guid={guid} part_id={part_id} />;
        case 2:
          return <PropAdd guid={guid} part_id={part_id} />;
        case 3:
          return <PropDelete guid={guid} part_id={part_id} />;
        case 4:
          return <GodExp guid={guid} part_id={part_id} />
        default:
          return null;
      }
    };
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
