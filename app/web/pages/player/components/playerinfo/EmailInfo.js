import React from 'react';

import TableInfoListWithSub from '../../../../components/TableInfoListWithSub';

class EmailInfo extends React.PureComponent {
  render() {
    return (
      <TableInfoListWithSub data={this.props.data} />
    );
  }
}

export default EmailInfo;
