import { List, Collapse } from "antd";
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
        return (
          <List.Item key={index}>
            <TableInfo data={item.filter(v => !Array.isArray(v.value))} />
            <Collapse>
              {
                item.filter(v => Array.isArray(v.value)).map(v => {
                  return (
                    <Collapse.Panel accordion key={`subitem-${index}-${v.title}`} header={v.title}>
                      {v.value.map((item, i) => (
                        <TableInfo key={`subitem-${index}-${v.title}-${i}`} data={item} />
                      ))}
                    </Collapse.Panel>
                  );
                })
              }
            </Collapse>
          </List.Item>
        );
      }}
    />
  );
}

export default TableInfoListWithSub;
