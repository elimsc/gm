import React from 'react';

import TabTableInfoList from '../../../../components/TabTableInfoList';

class HomeInfo extends React.PureComponent {
  render() {
    return (
      <TabTableInfoList data={this.props.data} />
    );
  }
}

export default HomeInfo;
