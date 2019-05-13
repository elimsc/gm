import React from 'react';

import TableInfoList from '../../../../components/TableInfoList';



class TaskInfo extends React.PureComponent {
  render() {
    return (
      <TableInfoList data={this.props.data} />
    );
  }
}

export default TaskInfo;
