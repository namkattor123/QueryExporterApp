import React, { useState }  from 'react';
import { useAuth } from '../AuthContext';
import { useHistory } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { login } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    const apiAuthenticateUrl = process.env.REACT_APP_API_AUTHENTICATE_BASE_URL;
    // Assume your login API returns a JWT token upon successful authentication

    const response = await fetch(apiAuthenticateUrl+ '/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'OPTIONS, DELETE, POST, GET, PATCH, PUT',
      },
      body: JSON.stringify({ username, password }),
    })
           if (response.ok) {
             const data = await response.json();
             console.log(data);
             const token = data.accessToken; // Assuming your API returns a 'token' property in the response
             login(token);
             history.push('/home');
           } else {
             // Handle authentication failure
             alert('Invalid credentials');
           }
  };

  const handelRegister = (e) =>{
     e.preventDefault();
     return ( <RegistrationForm/>
     )
  };

  return (
            <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-header"><h1>Login</h1></div>
                        <div className="card-body">
                          <form onSubmit={handleLogin}>
                            <div className="mb-3">
                              <label htmlFor="username" className="form-label">
                                Username:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="password" className="form-label">
                                Password:
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                            </div>
                            <button  className="btn btn-danger">
                              Login
                            </button>
                             <a href = "/register" >Register</a>

                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
    // Your login form JSX
  );
};

export default LoginPage;
