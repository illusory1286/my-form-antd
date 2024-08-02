// utils/auth.js
let userCredentials = {
  username: "admin@example.com",
  password: "password123"
};

// 初始加載時，檢查sessionStorage是否有用戶數據
// const savedCredentials = sessionStorage.getItem('userCredentials');
// if (savedCredentials) {
//   userCredentials = JSON.parse(savedCredentials);
// }

// 驗證登入
export const validateCredentials = (username, password) => {
  return username === userCredentials.username && password === userCredentials.password;
};

// 驗證forget
export const validateName = (username) => {
  return username === userCredentials.username;
};

// 驗證修改的密碼
export const updatePassword = (username, newPassword) => {
  if (username === userCredentials.username) {
    userCredentials.password = newPassword;
    console.log(`Password for ${username} has been updated to ${newPassword}`);   
    // 更新sessionStorage中的數據
    // sessionStorage.setItem('userCredentials', JSON.stringify(userCredentials));
    return true; // 更新成功
  }
  return false; // 更新失敗
};
