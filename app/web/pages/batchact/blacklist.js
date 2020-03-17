import React from 'react';
import { Card, Button, Modal } from 'antd';
import { connect } from 'dva';
import XLSX from 'xlsx';


import { exportBlacklist } from '../../service/batchact';

@connect(({ global }) => ({ global }))
class BlackList extends React.Component {

  constructor(props) {
    super(props);
    this.fileContent = {};
    this.state = {
      loading: false,
    }
  }

  handleExport = (type) => {
    Modal.confirm({
      title: '确认操作',
      content: '确认进行该操作吗？',
      onOk: () => {
        this.setState({ loading: true });
        exportBlacklist({ part_id: this.props.global.part_id }).then(data => {
          const payload = data.payload;
          const exportData = payload.map(item => {
            return { '手机号': item };
          });
          const worksheet = XLSX.utils.json_to_sheet(exportData);
          const workbook = { SheetNames: ['sheet1'], Sheets: { 'sheet1': worksheet } };
          XLSX.writeFile(workbook, `黑名单导出.${type}`);
        })
      }
    });
  }

  render() {

    return (
      <div>
        <Card>
          <Button type="primary" onClick={() => this.handleExport('xlsx')}>导出黑名单(excel)</Button>
          <Button style={{ marginLeft: 8 }} type="primary" onClick={() => this.handleExport('txt')}>导出黑名单(txt)</Button>
        </Card>
      </div>
    );
  }
}

export default BlackList;
