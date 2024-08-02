import React ,{useState,useEffect}from 'react';
import { Form, Input, Button, Checkbox,Modal  } from 'antd';
import PropTypes from 'prop-types'; // 添加這行
import { validateCredentials,validateName } from '../../utils/auth';

const LoginForm = ({ formType, onLoginSuccess  }) => {
  const [form] = Form.useForm(); // 使用useForm鉤子-flag
  const [username, setUsername] = useState('');
  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制Modal顯示狀態

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
    if (formType === 'login') {
      if (validateCredentials(values.username, values.password)) {
        console.log('Login successful!');
        onLoginSuccess(); // 登入成功時調用
        if (values.remember) {
        // 保存email到Cookie，有效期1年
          document.cookie = `email=${values.username}; max-age=31536000; path=/`;
          document.cookie = `remember=true; max-age=31536000; path=/`;
        }
      } else {
        console.log('Invalid credentials');
        document.cookie = 'remember=; max-age=0; path=/'; // 刪除remember Cookie
      }
    }else {
      const { name, username_forget } = values;
      // 拆分username_forget，只取@前面的部分
      const usernamePart = username_forget.split('@')[0];

      // 比較name和usernamePart
      if (name === usernamePart) {
        // console.log('Name matches username part.');
  
        // 調用validateName函數進行驗證
        if (validateName(username_forget)) {
          console.log('Validation successful, username is valid.');
          // 可以進行後續操作，例如允許修改密碼
          setIsModalVisible(true);
        } else {
          console.log('Invalid username');
        }
      } else {
        // alert("'Name does not match Identity(E-mail) part"); // 會有阻塞性的問題
        setErrorMessage('Name does not match Identity(E-mail) part');
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handlePsw = () => {
    // 處理確定修改密碼邏輯
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    // 處理取消邏輯
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setErrorMessage('');
  };

  return (
    <>
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
              name="username_forget"
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
            htmlType={formType === 'login' ? 'submit' : 'button'}
            onClick={() => {
              if (formType === 'login') {
              // 特定於 "Login" 的邏輯
                console.log('login：',formType);
              } else {
                // 特定於 "Send" 的邏輯
                form.submit()
                console.log('forget：',formType);
              }
            }}
          >
            {formType === 'login' ? 'Login' : 'Send'}
          </Button>
        </Form.Item>
      </Form>
      
      {errorMessage && (
        <Modal
          title="Error"
          visible={!!errorMessage}
          onOk={handleOk}
          onCancel={handleOk}
        >
          <p>{errorMessage}</p>
        </Modal>
      )}
      {/* Modal for changing password */}
      <Modal
        title="Change Password"
        visible={isModalVisible}
        onOk={handlePsw}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: 'Please input your new password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your new password!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>

    </>
  );
};

// 添加 PropTypes 檢查
LoginForm.propTypes = {
  formType: PropTypes.string.isRequired, // `formType` 是 string 且必填
  onLoginSuccess: PropTypes.func.isRequired, // `onLoginSuccess` 是函數且必填
};

export default LoginForm;

