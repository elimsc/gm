import React from 'react';

import TableInfo from '../../../../components/TableInfo';

class MarriageInfo extends React.PureComponent {
  render() {
    return (
      <TableInfo data={this.props.data} />
    );
  }
}

export default MarriageInfo;
