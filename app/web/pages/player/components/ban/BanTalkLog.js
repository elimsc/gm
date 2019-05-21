import React from 'react';
import TableInfo from '../../../../components/TableInfo';

class BanTalkLog extends React.Component {
  render() {
    const data = this.props.data;
    console.log(data);
    return (
      <TableInfo data={data} />
    );
  }
}

export default BanTalkLog;
