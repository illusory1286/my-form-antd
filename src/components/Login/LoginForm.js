import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const onFinish = (values) => {
  console.log('Success:', values);
  console.log('Email:', values.username);
  console.log('Password:', values.password);
  if (values.remember) {
    document.cookie = `email=${values.username}; max-age=31536000; path=/`; // 1年
  }
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const LoginForm = ({ formType }) => {
  return (
    <Form
      name="login"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{ maxWidth: 400 }}
    >
    {formType === 'login' ? (
    <>    
        <Form.Item
        label="Identity(E-mail)"
        name="username"
        rules={[
          { type: 'email', message: 'The input is not valid E-mail!' },
          { required: true, message: 'Please input your username!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
    </>
    ):(
        <>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Identity(E-mail)"
                name="username"
                rules={[
                { type: 'email', message: 'The input is not valid E-mail!' },
                { required: true, message: 'Please input your username!' },
                ]}
            >
                <Input />
            </Form.Item>
        </>
        )}        
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
            {formType === 'login' ? 'Login' : 'Send'}
            </Button>
        </Form.Item>
    </Form>
  );
};

export default LoginForm;

