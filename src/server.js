const jwt = require('jsonwebtoken');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { readFile } = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build'))); // added middleware
app.use(bodyParser.json());
const secretKey = 'yourSecretKey';

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html')); //since I'm using routing
});

// Endpoint for user login
app.post('/', (req, res) => {
  const { email, password } = req.body;

  // Read user data from JSON file
  readFile('userCredentials.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading user data');
    }

    const users = JSON.parse(data);

    // check if the user exists
    const user = users.find((userData) => userData.email === email && userData.password === password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // generate a JWT token for the authenticated user
    const accessToken = jwt.sign({ email: user.email, role: user.role }, secretKey, { expiresIn: '1m' });
    const refreshToken = jwt.sign({ email: user.email, role: user.role }, secretKey, { expiresIn: '2m' });
    res.status(200).json({ accessToken, refreshToken}); // Send the token as a response
    
  });
});
app.post('/refresh', (req, res) => {   //verify refresh token and generate new accessToken and refreshToken
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(403).json({ error: 'Refresh token is missing' });
  }
  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, secretKey);

    // generate a new access token (similar to login)
    const newAccessToken = jwt.sign({ email: decoded.email, role: decoded.role }, secretKey, { expiresIn: '1m' });
    const newRefreshToken = jwt.sign({ email: decoded.email, role: decoded.role }, secretKey, { expiresIn: '5m' });
    // Send the new access token as a response
    res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    // Handle token verification errors
    return res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
