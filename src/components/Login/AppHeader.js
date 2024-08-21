import React from 'react';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types'; // 添加這行

const { Header } = Layout;

const AppHeader = ({ setFormType }) => {
  const items = [
    {
      label: 'Login',
      key: '1',
      onClick: () => setFormType('login'),
    },
    {
      label: 'Forget',
      key: '2',
      onClick: () => setFormType('forget'),
    },
  ];

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ color: 'white', fontSize: '20px' }}>
        NCCST - DDoS攻撃平台
      </div>
      <Menu items={items} theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }} />
      

    </Header>
  );
};

AppHeader.propTypes = {
  setFormType:PropTypes.func.isRequired,
};

export default AppHeader;
