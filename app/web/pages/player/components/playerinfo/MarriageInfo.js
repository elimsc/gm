import React from 'react';

import TableInfoList from '../../../../components/TableInfoList';

class MarriageInfo extends React.Component {
  render() {
    return (
      <TableInfoList data={this.props.data} />
    );
  }
}

export default MarriageInfo;
