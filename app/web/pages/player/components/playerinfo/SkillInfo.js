import React from 'react';

import TableInfoList from '../../../../components/TableInfoList';


class SkillInfo extends React.PureComponent {
  render() {
    return (
      <TableInfoList data={this.props.data} />
    );
  }
}

export default SkillInfo;
