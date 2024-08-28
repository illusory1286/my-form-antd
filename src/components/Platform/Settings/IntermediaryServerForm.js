import React from 'react';
import { Form, Input, Button, Typography } from 'antd';

const { Title } = Typography;

const IntermediaryServerForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{maxWidth: '600px'}}>
      <Title level={2} className="title-left">
        Intermediary Server
      </Title>
      <Form
        name="intermediary_server"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Commander"
          name="commander"
          rules={[{ required: true, message: 'Please input Commander!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Timeout"
          name="timeout"
          rules={[{ required: true, message: 'Please input Timeout!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Check Frequency"
          name="check_frequency"
          rules={[{ required: true, message: 'Please input Check Frequency!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Refresh Frequency"
          name="refresh_frequency"
          rules={[{ required: true, message: 'Please input Refresh Frequency!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Map API Key"
          name="map_api_key"
          rules={[{ required: true, message: 'Please input Map API Key!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default IntermediaryServerForm;
