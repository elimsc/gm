import React from 'react';

import TableInfoList from '@/components/TableInfoList';

class EquipInfo extends React.Component {
  render() {
    return (
      <TableInfoList data={this.props.data} />
    );
  }
}

export default EquipInfo;
