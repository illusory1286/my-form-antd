import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
} from '@ant-design/icons';
import { Todo } from './Todo';
import { Todo_Node } from './Todo_Node';
const { Sider, Content } = Layout;


const Sidebar = () => {
  const [selectedKey, setSelectedKey] = useState('1');

  const renderContent = () => {
    switch (selectedKey) {
    case '1':
      return(
        <>
          <h1>Script</h1>
          <Todo />
        </>
      ) 
    // <SceneContent />;
    case '2':
      return(
        <>
          <div>action</div>
        </>
      )
    case '3':
      return (
        <>
          <h1>target</h1>
        </>
      )
    case '4':
      return(
        <>
          <h1>NodeTeam</h1>
          <Todo_Node />
        </>
      )
    default:
      return (
        <>
          <div>Select an item</div>
        </>
      )
    }
  };

  return (
    <Layout>
      <Sider width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={(e) => {
            setSelectedKey(e.key)
            console.log(e.key)
          }
          }
          style={{ height: '100%', borderRight: 0 }}
        
          items={[
            {
              key: 'sub1',
              icon: <UserOutlined />,
              label: 'Scene',
              children: [
                { key: '1', label: 'Script' },
                { key: '2', label: 'Action' }
              ]
            },
            {
              key: 'sub2',
              icon: <LaptopOutlined />,
              label: 'Parameter',
              children: [
                { key: '3', label: 'target' },
                { key: '4', label: 'Node Team' },
                { key: '5', label: 'Policy' }
              ]
            },
            {
              key: '6', 
              icon: <LaptopOutlined />,
              label: 'Setting' 
            }
          ]}
        />
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: '#fff',
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
