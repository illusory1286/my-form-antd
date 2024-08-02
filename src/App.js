import React,{useState} from 'react';
import AppHeader from './components/Login/AppHeader';
import LoginForm from './components/Login/LoginForm';
import Todo from './components/Login/Todo';

const App = () => {
  const [formType, setFormType] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 新增狀態來追蹤是否登入

  // 當用戶成功登入時調用此函數
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    console.log("Good")
  };

  return (
    <>
      {!isLoggedIn && <AppHeader setFormType={setFormType} />}
      {!isLoggedIn ? (
        <LoginForm formType={formType} onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Todo /> // 登入後顯示Hi組件
      )}
    </>
  );
};

export default App;