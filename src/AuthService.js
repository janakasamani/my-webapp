import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const refreshToken = async () => {
  try {
    const storedRefreshToken = localStorage.getItem('refreshToken');
    console.log("expired44444");
    const response = await axios.post('http://localhost:3001/refresh', { refreshToken: storedRefreshToken });
    const newAccessToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;

    if (newAccessToken && newRefreshToken) {
      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      console.log("expired5555");
      return newAccessToken;
    }
  } catch (error) {
    throw new Error('Failed to refresh access token');
  }
};

const authService = {
  refreshAccessToken: async () => {
    const accessToken = localStorage.getItem('accessToken');
    console.log("expired222");
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      console.log(Date.now());
      console.log("current time");
      console.log(currentTime);
      if (decodedToken.exp - currentTime < 60) {
        console.log("expired44444");
        console.log("decoded token exp");
        console.log(decodedToken.exp)
        return refreshToken();
      }
    }

    return null;
  }
};

export default authService;
