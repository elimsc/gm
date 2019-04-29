import React from 'react';
import TableInfoList from '@/components/TableInfoList';

class PetInfo extends React.Component {
  render() {
    return (
      <TableInfoList defaultPageSize={2} data={this.props.data} />
    );
  }
}

export default PetInfo;
