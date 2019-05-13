import React from 'react';

import TableInfoList from '@/components/TableInfoList';


class WarehouseInfo extends React.PureComponent {
  render() {
    return (
      <TableInfoList data={this.props.data} />
    );
  }
}

export default WarehouseInfo;
