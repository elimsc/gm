import React from 'react';

import TableInfoList from '../../../../components/TableInfoList';

class EmailInfo extends React.PureComponent {
  render() {
    return (
      <TableInfoList data={this.props.data} />
    );
  }
}

export default EmailInfo;
