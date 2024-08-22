import React , { useState ,useEffect} from 'react';
import { Card, Row, Col,Button } from 'antd';
import { SettingOutlined, UserOutlined, ToolOutlined, DatabaseOutlined,HomeOutlined } from '@ant-design/icons';
import { System } from '../Settings/System';

const Setting = () => {
  const [selectedComponent, setSelectedComponent] = useState(null); // 用來管理當前顯示的組件
  const [showSelf, setShowSelf] = useState(true); // 初始狀態為顯示自己

  const settings = [
    {
      title: 'System',
      description: 'System Updation',
      icon: <SettingOutlined />,
      component:<System />,
    },
    {
      title: 'VPS Account',
      description: 'Account Management',
      icon: <UserOutlined />,
      component: <div>VPS Account Content</div>, // 其他組件或內容
    },
    {
      title: 'Attack Method',
      description: 'Method Management',
      icon: <ToolOutlined />,
      component: <div>Attack Method Content</div>, // 其他組件或內容
    },
    {
      title: 'Intermediary Server',
      description: 'Server Setting',
      icon: <DatabaseOutlined />,
      component: <div>Intermediary Server Content</div>, // 其他組件或內容
    },
  ];
  
  const handleCardClick = (component) => {
    setSelectedComponent(component); // 點擊時設置選中的組件
  };

  useEffect(() => {
    if (!showSelf) {

      setTimeout(() => {
        setShowSelf(true); // 重新設置為 true，達到重新渲染的效果
        console.log("hi")
      }, 0);
    }
  }, [showSelf]);

  const home = () => {
    setShowSelf(false); // 先隱藏自己
  };

  return (
    <div style={{ padding: '20px' }}>
      {showSelf &&(
        <>
          <Button 
            type="button" 
            icon={<HomeOutlined />} 
            onClick={home}
          />
          <h2>Setting</h2>
          {selectedComponent?(
            <div>{selectedComponent}</div> // 顯示選中的組件
          ):(
            <Row gutter={[16, 16]}>
              {settings.map((setting, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <Card
                    hoverable
                    style={{ textAlign: 'center' }}
                    cover={<div style={{ fontSize: '48px', marginTop: '20px' }}>{setting.icon}</div>}
                    onClick={() => handleCardClick(setting.component)} // 點擊時切換顯示的組件
                  >
                    <Card.Meta title={setting.title} description={setting.description} />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </div>
  );
};

export default Setting;
