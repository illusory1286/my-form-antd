// utils/auth.js
let userCredentials = {
  username: "admin@example.com",
  password: "password123"
};

export const validateCredentials = (username, password) => {
  return username === userCredentials.username && password === userCredentials.password;
};

export const validateName = (username) => {
  return username === userCredentials.username;
};

export const updatePassword = (username, newPassword) => {
  if (username === userCredentials.username) {
    userCredentials.password = newPassword;
    return true; // 更新成功
  }
  return false; // 更新失敗
};
