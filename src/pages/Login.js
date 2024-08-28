import React from 'react'
import { Row, Col } from 'antd';
import LoginForm from '../components/Login/LoginForm'
export const Login = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16} align="middle">
        <Col span={12}>
          <img 
            src="/images/Login.png" 
            alt="Login" 
            style={{ width: '100%', height: 'auto' }} // 可调整样式
          />
        </Col>
        <Col span={12}>
          <LoginForm />
        </Col>
      </Row>
    </div>
  )};
//   return (
//     <>
//       <img src="imges/Login.png" alt="Login" />
//       <div>Login</div>
//       <LoginForm />
//     </>
//   )
// }
