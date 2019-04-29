import React from 'react';

import TableInfoList from '@/components/TableInfoList';


class BagInfo extends React.PureComponent {
  render() {
    return (
      <TableInfoList data={this.props.data} />
    );
  }
}

export default BagInfo;
