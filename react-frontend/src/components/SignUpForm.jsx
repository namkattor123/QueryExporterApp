import React, { Component } from 'react'
import HomeService from '../services/HomeService';

class SignupForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // step 2
            id: this.props.match.params.id,
            username:'',
            password:'',
            role:''
        }
        this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeRoleHandler = this.changeRoleHandler.bind(this);
    }
    changeUserNameHandler= (event) => {
              this.setState({username: event.target.value});
    }
    changePasswordHandler= (event) => {
              this.setState({password: event.target.value});
    }
    changeRoleHandler= (event) => {
              this.setState({role: event.target.value});
    }
    handelSubmit = (e) => {
        e.preventDefault();
        let signUp = {username: this.state.username, password: this.state.password};
        console.log('signUp Form => ' + JSON.stringify(signUp));

        // step 5
        if(this.state.username !== null){
            HomeService.signup(signUp).then(res =>{
                this.props.history.push('/home');
        });

        }else{

        }
    }

render(){
  return (
    <form onSubmit={this.handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.changeUserNameHandler}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.changePasswordHandler}
          />
        </label>
      </div>
      {/* Add other input fields for additional user details */}
      <button type="submit">Signup</button>
    </form>
  );
  }
}

export default SignupForm;
