import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
} from '@ant-design/icons';
import { Todo } from './Todo';
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
          <div>123</div>
        </>
      )
    case '3':
      return (
        <>
          <h1>NodeTeamC</h1>
        </>
      )
    case '4':
      return(
        <>
          <h1>SettingContent</h1>
          <Todo />
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
            console.log(selectedKey)
          }
          }
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="Scene">
            <Menu.Item key="1">
                Script
            </Menu.Item>
            <Menu.Item key="2">
                Action
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="sub2" icon={<LaptopOutlined />} title="Parameter">
            <Menu.Item key="3">
                target
            </Menu.Item>
			 <Menu.Item key="4">
                Node Team
            </Menu.Item>
            <Menu.Item key="5">
                Policy
            </Menu.Item>
          </Menu.SubMenu>
          
          <Menu.Item key="4" icon={<LaptopOutlined />}>
            Setting
          </Menu.Item>
        </Menu>
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
