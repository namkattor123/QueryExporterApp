import React, { Component } from 'react'
import HomeService from '../services/HomeService';
import { useAuth } from './AuthContext';

class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // step 2
            username:'',
            password:'',
        }
        this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
    }
    changeUserNameHandler= (event) => {
              this.setState({username: event.target.value});
              console.log("username");
    }
    changePasswordHandler= (event) => {
              this.setState({password: event.target.value});
              console.log("password");
    }
    handelSubmit = (e) => {
        const { login } = useAuth();
        console.log("handle");
        e.preventDefault();
        let logInForm = {username: this.state.username, password: this.state.password};
        console.log('Login Form => ' + JSON.stringify(logInForm));

        // step 5
        if(this.state.username !== null){
            HomeService.login(logInForm).then(res =>{
                login('jwtToken', res.data.json().token);
                this.props.history.push('/home');
        });

        }else{

        }
    }

render(){
  return (
            <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-header"><h1>Login</h1></div>
                        <div className="card-body">
                          <form >
                            <div className="mb-3">
                              <label htmlFor="username" className="form-label">
                                Username:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={this.username}
                                onChange={this.changeUserNameHandler}
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
                                value={this.password}
                                onChange={this.changePasswordHandler}
                                required
                              />
                            </div>
                            <button  className="btn btn-primary" onClick={this.handelSubmit}>
                              Login
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        );
    }
}

export default LoginPage;
