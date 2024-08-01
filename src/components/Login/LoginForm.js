import React ,{useState,useEffect}from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import PropTypes from 'prop-types'; // 添加這行
// import { useNavigate } from 'react-router-dom';
import { validateCredentials } from '../../utils/auth';

const LoginForm = ({ formType, onLoginSuccess  }) => {
  const [form] = Form.useForm(); // 使用useForm鉤子-flag
  const [username, setUsername] = useState('');
  const [remember, setRemember] = useState(false);
  //const navigate = useNavigate(); // 使用useNavigate來跳轉

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
    }}, [form]);
  const onFinish = (values) => {
    console.log('Success:', values);
    console.log('Email:', values.username);
    console.log('Password:', values.password);
  
    if (validateCredentials(values.username, values.password)) {
      console.log('Login successful!');
      onLoginSuccess(); // 登入成功時調用
      if (values.remember) {
      // 保存email到Cookie，有效期1年
        document.cookie = `email=${values.username}; max-age=31536000; path=/`;
        document.cookie = `remember=true; max-age=31536000; path=/`;
      }
    //   navigate('/hello-world'); // 成功登錄後跳轉到Hello World頁面
    } else {
      console.log('Invalid credentials');
      document.cookie = 'remember=; max-age=0; path=/'; // 刪除remember Cookie
    }
  };
      
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
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
            <Checkbox 
              checked={remember} onChange={(e) => {
                setRemember(e.target.checked);
                console.log("clicked",e.target.checked); // 打印 "clicked"
                console.log(remember)
              }}
            >Remember me</Checkbox>
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
        <Button 
          type="primary" 
          htmlType="submit"
          onClick={() => {
            if (formType === 'login') {
            // 特定於 "Login" 的邏輯
              console.log('Login clicked');
            } else {
              // 特定於 "Send" 的邏輯
              console.log('Send clicked');
            }
          }}
        >
          {formType === 'login' ? 'Login' : 'Send'}
        </Button>
      </Form.Item>
    </Form>
  );
};

// 添加 PropTypes 檢查
LoginForm.propTypes = {
  formType: PropTypes.string.isRequired, // `formType` 是 string 且必填
  onLoginSuccess: PropTypes.func.isRequired, // `onLoginSuccess` 是函數且必填
};

export default LoginForm;

