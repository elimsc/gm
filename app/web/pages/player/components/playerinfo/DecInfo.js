import React from 'react';

import TableInfoList from '@/components/TableInfoList';

class DecInfo extends React.PureComponent {
  render() {
    return (
      <TableInfoList data={this.props.data} defaultPageSize={3} />
    );
  }
}

export default DecInfo;
