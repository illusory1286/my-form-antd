import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
} from '@ant-design/icons';
// Main-UI畫面
import { Todo } from './Main/Todo';
import { Target } from './Main/Target/Target';
import { NodeTeam } from './Main/NodeForm/NodeTeam';
import { Policy } from './Main/Policy/Policy';
import { Attack } from './Settings/Attack';
// import Setting from './Main/Setting';
// Setting
import { System } from './Settings/System';
import {VPSAccount} from './Main/VPS/VPSAccount';
import IntermediaryServerForm from './Settings/IntermediaryServerForm';
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
          <Target />
        </>
      )
    case '4':
      return(
        <>
          <h1>NodeTeam</h1>
          <NodeTeam />
        </>
      )
    case '5':
      return(
        <>
          <h1>Policy</h1>
          <Policy />
        </>
      )
    case '6':
      return(
        <>
          <System />
        </>
      )
    case '7':
      return(
        <>
          <h1>VPS Account</h1>
          <VPSAccount />
        </>
      )
    case '8':
      return(
        <>
          <Attack />
          {/* <Policy /> */}
        </>
      )
    case '9':
      return(
        <>
          <IntermediaryServerForm />
          {/* <h1>Policy</h1> */}
        </>
      )
    // default:
    //   return (
    //     <>
    //       {/* <div></div> */}
    //       <Setting />
    //     </>
    //   )
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
              key: 'sub3',
              icon: <LaptopOutlined />,
              label: 'Setting',
              children: [
                { key: '6', label: 'System' },
                { key: '7', label: 'VPS Account' },
                { key: '8', label: 'Attack Method' },
                { key: '9', label: 'Intermediary Server' }
              ]
            }
            // {
            //   key: '6', 
            //   icon: <LaptopOutlined />,
            //   label: 'Setting' 
            // }
          ]}
        />
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 50,
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
