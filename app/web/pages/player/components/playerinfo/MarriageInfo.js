import React from 'react';

import TabTableInfoList from '../../../../components/TabTableInfoList';

class MarriageInfo extends React.PureComponent {
  render() {
    console.log(this.props.data);
    return (
      <TabTableInfoList data={this.props.data} />
    );
  }
}

export default MarriageInfo;
