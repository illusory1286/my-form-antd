import React from 'react'
import { Layout , theme ,Card } from 'antd';
const { Content } = Layout;

export const System = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout>
        <Content
          style={{
            padding: '0 48px',
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Setting</Breadcrumb.Item>
            <Breadcrumb.Item>System</Breadcrumb.Item>
          </Breadcrumb> */}
            
          <h1>System</h1>
          <div
            style={{
              minHeight: 380,
              borderRadius: borderRadiusLG,
            }}
          >
            <Card bordered={false} style={{ width: 850 } }>
              <p>Name：DDos</p>
              <p>System Version：1.x.x</p> {/* /之後改為變數去抓/ */}
              <p>Release Version：1.x.x</p>
              <p>Release Date：xxxx-xx-xx</p>
            </Card>
          </div>
        </Content>
      </Layout>
    </>
  )
}
