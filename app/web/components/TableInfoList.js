import { List } from "antd";
import TableInfo from "./TablelInfo";

const TableInfoList = props => {
  const defaultPageSize = props.defaultPageSize ? props.defaultPageSize : 5;
  const data = props.data;
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: defaultPageSize,
      }}
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item key={index}>
          <TableInfo data={item}/>
        </List.Item>
      )}
    />
  );
}

export default TableInfoList;
