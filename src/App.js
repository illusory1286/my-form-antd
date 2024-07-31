import React,{useState} from 'react';
import AppHeader from './components/Login/AppHeader';
import LoginForm from './components/Login/LoginForm';

const App=()=> {
  const [formType, setFormType] = useState('login');
  return (
    <>
      <AppHeader setFormType={setFormType} />
      <LoginForm formType={formType} />

    </>
  );
}

export default App;
