// utils/auth.js
export const validateCredentials = (username, password) => {
  const hardcodedUsername = "admin@example.com";
  const hardcodedPassword = "password123";
  
  return username === hardcodedUsername && password === hardcodedPassword;
};
  