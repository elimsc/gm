import React from 'react';

import TableInfoListWithSub from '@/components/TableInfoListWithSub';

class EquipInfo extends React.PureComponent {
  render() {
    return (
      <TableInfoListWithSub data={this.props.data} defaultPageSize={3} />
    );
  }
}

export default EquipInfo;
