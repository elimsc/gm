import React from 'react';
import { Card, Form, Input, Button, message, Select } from 'antd';

import { menuTree, updateRole, oneRole } from '../../service/authority';
import { Tree } from 'antd';

const { TreeNode } = Tree;

class UpdateRole extends React.Component {
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    treeData: [],
  };

  roleData = {};

  componentDidMount() {
    const { id } = this.props.location.query;
    menuTree().then(data => {
      this.setState({ treeData: data.payload });
      oneRole({ id }).then(data => {
        const roleData = data.payload;
        let menu_ids = []
        if (roleData.menu_ids) {
          menu_ids = roleData.menu_ids.split(',').map(v => parseInt(v));
        }
        this.roleData = data.payload;
        this.setState({ checkedKeys: menu_ids });
      })
    });

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values['menu_ids'] = this.state.checkedKeys.join(',');
        updateRole(values).then(data => {
          if (data.code === 0) {
            message.success('更新成功');
          } else {
            message.error('更新失败，请重试');
          }
        })
      }
    });
  }

  onExpand = expandedKeys => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
  };



  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Card>
        <Form {...formItemLayout} style={{ marginTop: 50 }} >
          {getFieldDecorator('id', {
            initialValue: this.roleData.id,
            rules: [{
              required: true, message: '不能为空',
            }],
          })(
            <Input type="hidden" />
          )}
          <Form.Item label="角色名" >
            {getFieldDecorator('role_name', {
              initialValue: this.roleData.role_name,
              rules: [{
                required: true, message: '角色名不能为空',
              }],
            })(
              <Input placeholder="角色名" />
            )}
          </Form.Item>
          <Form.Item label="渠道">
            {getFieldDecorator('channel_id', {
              initialValue: this.roleData.channel_id ? this.roleData.channel_id : -1,
              rules: [{
                required: true, message: '渠道id不能为空',
              }],
            })(
              <Select>
                <Select.Option value={-1}>所有渠道</Select.Option>
                <Select.Option value={3}>天佑</Select.Option>
              </Select>
            )}
          </Form.Item>


        </Form>
        <Form.Item {...tailFormItemLayout}>
          <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
          >
            {this.renderTreeNodes(this.state.treeData)}
          </Tree>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>提交</Button>
        </Form.Item>
      </Card>
    );
  }
}

export default Form.create()(UpdateRole);
