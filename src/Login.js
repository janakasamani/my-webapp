  import React from 'react';
  import { useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { jwtDecode } from "jwt-decode";
  import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox,
  } from 'mdb-react-ui-kit';
  import './Login.css';
  import { useDispatch, useSelector } from 'react-redux';
  import {
    setEmail,
    setPassword,
    login,
    selectLogin,
    setError,
  } from './redux/loginSlice.js';
  import axios from 'axios'; // Import Axios for making HTTP requests


  function Login() {
    const navigate = useNavigate();      
    const dispatch = useDispatch();
    const { email, password, error, accessToken} = useSelector(selectLogin);
    const { isAuthenticated } = useSelector(selectLogin);

    const handleEmailChange = (inputEmail) => {
      dispatch(setEmail(inputEmail.target.value));
    };

    const handlePasswordChange = (inputPassword) => {
      dispatch(setPassword(inputPassword.target.value));
    };

    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:3001/', { email, password });
        const { accessToken, refreshToken } = response.data;
        
        if (accessToken && refreshToken) {
          dispatch(login());
          const decoded = jwtDecode(accessToken);
          console.log(decoded);
          // i can decode here
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          navigate('/Home');
        }
      } catch (error) {
        // Handle login errors
        dispatch(setError('Invalid email or password.'));
      }
    };

    // Call this function whenever the access token needs refreshing, e.g., before making a protected API call
    // const updatedAccessToken = await refreshAccessToken();
    // Then use the updatedAccessToken in your API calls   

    // useEffect(() => {
    //   if (isAuthenticated) {
    //     console.log('authenticated');
    //     // localStorage.setItem('accessToken', accessToken);
    //     // console.log(accessToken);
    //     navigate('/Home');
    //   }
    // });
    return (
      <MDBContainer fluid className="p-5 my-5">
        <MDBRow>
          <MDBCol col="6" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </MDBCol>

          <MDBCol col="4" md="4">
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
              type="email"
              size="lg"
              value={email}
              onChange={handleEmailChange}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
              value={password}
              onChange={handlePasswordChange}
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="">Forgot password?</a>
            </div>
            <MDBBtn className="mb-4 w-100" size="lg" onClick={handleLogin}>
              Login
            </MDBBtn>
            {error && <p className="text-danger">{error}</p>}
            <p className="text-center fw-bold mx-3 mb-0">OR</p>

            <div className="text-center mb-3">
              <p className="text-center fw-bold mx-3 mb-0">Sign in with:</p>

              <div className="d-flex justify-content-between mx-auto pt-3" style={{ width: '40%' }}>
                <MDBBtn tag="a" color="none" className="mb-4 w-100">
                  <MDBIcon className="icon" fab icon="facebook-f" size="sm" />
                </MDBBtn>

                <MDBBtn tag="a" color="none" className="mb-4 w-100">
                  <MDBIcon className="icon" fab icon="twitter" size="sm" />
                </MDBBtn>

                <MDBBtn tag="a" color="none" className="mb-4 w-100">
                  <MDBIcon className="icon" fab icon="google" size="sm" />
                </MDBBtn>

                <MDBBtn tag="a" color="none" className="mb-4 w-100">
                  <MDBIcon className="icon" fab icon="github" size="sm" />
                </MDBBtn>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }

  export default Login;
