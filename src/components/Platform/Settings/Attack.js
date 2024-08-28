// import React from 'react';
// import {  Layout ,Card,theme,Flex, Segmented,Button} from 'antd';
// const { Content } = Layout;


// const T1=()=>{
//   return(
//     <h1>123</h1>
//   );
// }
// const T2=()=>{
//   return(
//     <h1>456</h1>
//   );
// }

// const boxStyle = {
//   width: '100%',
//   height: 120,
//   borderRadius: 6,
//   border: '1px solid #40a9ff',
// };
// const justifyOptions = [
//   'flex-start',
//   'center',
//   'flex-end',
//   'space-between',
//   'space-around',
//   'space-evenly',
// ];
// const alignOptions = ['flex-start', 'center', 'flex-end'];
// const App = () => {
//   const [justify, setJustify] = React.useState(justifyOptions[0]);
//   const [alignItems, setAlignItems] = React.useState(alignOptions[0]);
//   return (
//     <Flex gap="middle" align="start" vertical>
//       <p>Select justify :</p>
//       <Segmented options={justifyOptions} onChange={setJustify} />
//       <p>Select align :</p>
//       <Segmented options={alignOptions} onChange={setAlignItems} />
//       <Flex style={boxStyle} justify={justify} align={alignItems}>
//         <Button type="primary">Primary</Button>
//         <Button type="primary">Primary</Button>
//         <Button type="primary">Primary</Button>
//         <Button type="primary">Primary</Button>
//       </Flex>
//     </Flex>
//   );
// };
// export const Attack = () => {
//   const {
//     token: { borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <Layout>
      
//       <Content
//         style={{
//           padding: '0 48px',
//         }}
//       >
//         <h1>Attack Method</h1>
//         <Card bordered={false} style={{ width: 900 }}>
//           <T1 />
//           <T2 />
//           <App />
//         </Card>
//         <div
//           style={{
//             minHeight: 380,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//         </div>
//       </Content>
//     </Layout>
//   );
// };

import React from 'react';
import { Tabs, Table, Input, Button, Pagination, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const dataSource = [
  {
    key: '1',
    id: 'OS-ATT-04-006',
    name: 'UDP 洪水攻擊(快速消耗目標頻寬之攻擊)',
    status: 'enabled',
  },
  // Add more data as needed
];

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      status === 'enabled' ? 
        <span style={{ color: 'green' }}>●</span> : 
        <span style={{ color: 'gray' }}>●</span>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <Dropdown overlay={menu}>
        <Button 
          icon={<EllipsisOutlined />} 

        />
      </Dropdown>
    ),
  },
];

const menu = (
  <Menu>
    <Menu.Item key="1">Enable</Menu.Item>
    <Menu.Item key="2">Disable</Menu.Item>
    <Menu.Item key="3">Go to</Menu.Item>
  </Menu>
);

// const menu ={[
//   {
//     key="1",
//     label:'Enable'
//   },
//   {
//     key="2",
//     label:'Disable'
//   },
//   {
//     key="3",
//     label:'Go to'
//   }

// ]};
//  (
//   <Menu>
//     <Menu.Item key="1">Enable</Menu.Item>
//     <Menu.Item key="2">Disable</Menu.Item>
//     <Menu.Item key="3">Go to</Menu.Item>
//   </Menu>
// );

export const Attack = () => {
//   const items = [
//     { label: 'Transport Layer', key: 'Transport',  }, 
//     { label: 'Application Layer', key: 'Application', },
// ];
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <h2>Attack Method</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Transport Layer" key="1">
          <div style={{ marginBottom: 16 }}>
            <Input.Search
              placeholder="Search keyword"
              onSearch={(value) => console.log(value)}
              style={{ width: 200, marginRight: 8 }}
            />
            <Button type="primary">Search</Button>
          </div>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          />
          <Pagination
            total={85}
            showSizeChanger
            showQuickJumper
            style={{ marginTop: 16, textAlign: 'right' }}
          />
        </TabPane>
        <TabPane tab="Application Layer" key="2">
          {/* Add content for Application Layer */}
        </TabPane>
      </Tabs>

    </div>
  );
};



