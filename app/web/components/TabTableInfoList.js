import { Tabs, Empty } from "antd";
import TableInfoList from './TableInfoList';

const TabTableInfoList = props => {
  const items = props.data;
  if (!Array.isArray(items) || items.length === 0) return <Empty />;
  return (
    <Tabs type="card">
      {items.map((item, index) => (
        <Tabs.TabPane key={`${index}`} tab={`${item.title}`}>
          {
            Array.isArray(item.value) && item.value.length > 0 ? <TableInfoList data={item.value} /> : <Empty />
          }
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
}

export default TabTableInfoList;
