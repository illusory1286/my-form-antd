import React,{useState} from 'react';
import AppHeader from './components/Login/AppHeader.js';
import LoginForm from './components/Login/LoginForm';
// import { Login } from './pages/Login.js';
// import Todo from './components/Login/Todo';
import HomePage from './pages/HomePage.js'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  const [formType, setFormType] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 新增狀態來追蹤是否登入

  // 當用戶成功登入時調用此函數
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    console.log("Good")
  };

  return (
    <Router>
      {!isLoggedIn && <AppHeader setFormType={setFormType} />}
      <Routes>
        {/* <Route path="/" element={!isLoggedIn ? <LoginForm formType={formType} onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/todo" />} /> */}
        {/* <Route path="/todo" element={isLoggedIn ? <Todo /> : <Navigate to="/" />} /> */}

        <Route path="/" element={!isLoggedIn ? <LoginForm formType={formType} onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/HomePage" />} />
        {/* <Route path="/" element={!isLoggedIn ? <Login formType={formType} onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/HomePage" />} /> */}
        <Route path="/HomePage" element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

