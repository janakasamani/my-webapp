import React from 'react';
import jwt from 'jsonwebtoken';
const YourComponent = () => {
  // Your secret key (keep this secret and secure on the server)  
  const secretKey = 'your_secret_key';

  // User information to include in the token  
  const userInfo = {
    userId: '123',
    username: 'john_doe',
    role: 'user',
  };
  // Generate a token  
  const token = jwt.sign(userInfo, secretKey);

  return (
    <div>
      <p>Generated Token: {token}</p>
    </div>
  );
};

export default YourComponent;
 