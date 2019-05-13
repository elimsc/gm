import React from 'react';
import TableInfo from '@/components/TableInfo';


// 玩家基本信息
class BasicInfo extends React.PureComponent {

  render() {
    return <TableInfo style={{ marginLeft: 20 }} data={this.props.data} />
  }
}

export default BasicInfo;
