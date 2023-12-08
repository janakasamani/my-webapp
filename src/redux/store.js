import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice.js'; 

const store = configureStore({
  reducer: {
    login: loginReducer,
    // Other reducers if any
  },
});

export default store;
