import { List, Tabs, Empty } from "antd";
import TableInfo from "./TablelInfo";

const TableInfoListWithSub = props => {
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
      renderItem={(item, index) => {
        item = Array.isArray(item) ? item : [];
        return (
          <List.Item key={index} style={{ marginBottom: 30 }}>
            <TableInfo data={item.filter(v => !Array.isArray(v.value))} />
            <Tabs tabPosition="top" type="card">
              {
                item.filter(v => Array.isArray(v.value)).map(v => {
                  return (
                    <Tabs.TabPane
                      key={`subitem-${index}-${v.title}`}
                      tab={<span>{v.title}</span>}>
                      {
                        v.value.length > 0
                          ? v.value.map((item, i) => (
                            <TableInfo key={`subitem-${index}-${v.title}-${i}`} data={item} />
                          ))
                          : <Empty />
                      }
                    </Tabs.TabPane>
                  );
                })
              }
            </Tabs>
          </List.Item>
        );
      }}
    />
  );
}

export default TableInfoListWithSub;
