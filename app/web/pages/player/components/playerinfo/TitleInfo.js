import React from 'react';
import TableInfoList from '@/components/TableInfoList';



class TitleInfo extends React.PureComponent {
  render() {
    return (
      <TableInfoList data={this.props.data} />
    );
  }
}

export default TitleInfo;
