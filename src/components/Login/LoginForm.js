import React ,{useState,useEffect}from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

import { validateCredentials } from '../../utils/auth';

const onFinish = (values) => {
  console.log('Success:', values);
  console.log('Email:', values.username);
  console.log('Password:', values.password);

  if (validateCredentials(values.username, values.password)) {
    console.log('Login successful!');
    if (values.remember) {
        // 保存email到Cookie，有效期1年
        document.cookie = `email=${values.username}; max-age=31536000; path=/`;
        document.cookie = `remember=true; max-age=31536000; path=/`;
      }
  } else {
    console.log('Invalid credentials');
    document.cookie = 'remember=; max-age=0; path=/'; // 刪除remember Cookie
  }
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const LoginForm = ({ formType }) => {
    const [form] = Form.useForm(); // 使用useForm鉤子-flag
    const [username, setUsername] = useState('');
    const [remember, setRemember] = useState(false);

    // V1版
    // useEffect(() => {
    //   const cookieValue = document.cookie
    //     .split('; ')
    //     .find(row => row.startsWith('email='))
    //     ?.split('=')[1];
    // //   if (cookieValue) setUsername(cookieValue);
    // if (cookieValue) {
    //     console.log("Cookie value found:", cookieValue);
    //     setUsername(cookieValue);
    //   } else {
    //     console.log("Cookie value not found or undefined");
    //   }
      
    // }, []);

    useEffect(() => {
        // 讀取Cookie中的email和remember狀態
        const cookieValue = document.cookie
          .split('; ')
          .find(row => row.startsWith('email='))
          ?.split('=')[1];
        const rememberValue = document.cookie
          .split('; ')
          .find(row => row.startsWith('remember='))
          ?.split('=')[1] === 'true';
    
        if (rememberValue && cookieValue) {
          setUsername(cookieValue);
          form.setFieldsValue({ username: cookieValue, remember: true }); // 手動設置表單的初始值
          setRemember(true);
        }
      }, [form]);

    return (
        <Form
        form={form} // 將useForm創建的表單實例傳遞給Form組件
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // initialValues={{ username}}
        initialValues={{ username, remember}} 
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
            // initialValues={{ username}}
            // initialvalues="test"
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
            {/* <Checkbox>Remember me</Checkbox> */}
            <Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)}>Remember me</Checkbox>
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

