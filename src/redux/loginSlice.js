import { createSlice } from '@reduxjs/toolkit';
import usersData from '../userCredentials.json'; 
// import jwt from 'jsonwebtoken';
// const secretKey = 'your_secret_key';
// const token = jwt.sign(usersData, secretKey);
const initialState = {
  email: '',
  password: '',
  error: null,
  accessToken: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    login: (state) => {
      // Validation logic here
      const user = usersData.find(
        (userData) =>
          userData.email === state.email && userData.password === state.password
      );
      if (!user) {
        state.error = 'Invalid email or password.';
        state.isAuthenticated = false;
        return;
      }
      console.log('user sah');
      
      // state.accessToken = token;
      state.error = null; 
      state.isAuthenticated = true;
          
    },
  },
});

export const {
  setEmail,  
  setPassword,
  setError,
  clearError,
  login,
} = loginSlice.actions;

export const selectLogin = (state) => state.login;

export default loginSlice.reducer;
