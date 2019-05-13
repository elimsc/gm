import React from 'react';

import TableInfoList from '../../../../components/TableInfoList';

class MarriageInfo extends React.PureComponent {
  render() {
    return (
      <TableInfoList data={this.props.data} />
    );
  }
}

export default MarriageInfo;
