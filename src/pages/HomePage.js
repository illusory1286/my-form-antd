// pages/HomePage.js
import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/Platform/Sidebar';
// import SidebarAntd from '../components/Platform/SidebarAntd';
// import './HomePage.css';

const { Header, Content } = Layout;
const HomePage = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <h2 style={{ color: 'white' }}>DDOS Platform</h2>
      </Header>
      <Layout>
        <Sidebar />
        
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {/* <Todo /> */}
          </Content>
        </Layout>
      </Layout>
     
      {/* <Footer style={{ textAlign: 'center' }}>
        Onward Security ©2024
      </Footer> */}
    </Layout>
  );
};
// return (
//   <>
//     <AppHeader />
//     <Sidebar />
//     <Todo />
//   </>
// )

export default HomePage;