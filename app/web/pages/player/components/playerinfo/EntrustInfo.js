import React from 'react';
import { Input, Divider, Tabs, Table, Button, Modal, message, Card } from 'antd';
import TableInfoList from '@/components/TableInfoList';
import {entrustOffline} from '../../../../service/playerinfo';


class EntrustInfo extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
    }
   }

   componentDidUpdate(prevProps, prevState) {
    if (this.props.data.length !== prevProps.data.length) {
      this.setState({data: this.props.data})
    }
   }


  handleEntrustOffline(v) {
    const { guid, part_id } = this.props;

    var entrustTypeCn = '购买'
    if (v.type==2) {
      entrustTypeCn = '出售';
    }
    Modal.confirm({
      title: '确认操作',
      content: `是否确认下架${entrustTypeCn}单价为${v.price}的商品${v.name}？`,
      onOk: () => {
        entrustOffline({ entrust_id: v.entrust_id, guid, part_id }).then(data => {
          if (data.code === 0) {
            message.success('操作成功');
            this.setState({data: data.payload});
          } else {
            message.error('操作失败');
          }
          
        });
      }
    })
  }

  handleAllEntrustOffline() {
    const { guid, part_id } = this.props;
    Modal.confirm({
      title: '确认操作',
      content: `是否确认下架 全部 商品？`,
      onOk: () => {
        entrustOffline({ entrust_id: "0", guid, part_id }).then(data => {
          if (data.code === 0) {
            message.success('操作成功');
          } else {
            message.error('操作失败');
          }
        });
      }
    })
  }



  render() {
    const columns = [
        {
          title: '委托id',
          dataIndex: 'entrust_id',
          key: 'entrust_id',
        },
        {
          title: '物品id',
          dataIndex: 'item_id',
          key: 'item_id',
        },
        {
          title: '名字',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: '数量',
            dataIndex: 'cnt',
            key: 'cnt',
        },
        {
            title: '交易方式',
            dataIndex: 'type',
            key: 'type',
            render: v => {
                if (v == 1) {
                    return '购买'
                }
                if (v == 2) {
                    return '出售'
                }
                return v;
            }
        },
        {
            title: '单价',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '上架时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '操作',
            render: v => {
                return <Button onClick={() => this.handleEntrustOffline(v)} type='primary'>下架</Button>
            }
        }
      ];

    return (
    <>
      <Button type='danger' style={{margin: 10}} onClick={() => this.handleAllEntrustOffline()}>全部下架</Button>
      <Table dataSource={this.state.data} columns={columns} key='entrust_id' />
    </>
    );
  }
}

export default EntrustInfo;
