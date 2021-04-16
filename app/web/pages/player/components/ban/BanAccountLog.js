import React from 'react';
import TableInfo from '../../../../components/TableInfo';

class BanAccountLog extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <TableInfo data={data} />
    );
  }
}

export default BanAccountLog;
