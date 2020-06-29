import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';

export default class UserSignIn extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      email,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <UserForm 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <>
                <input 
                  id="email" 
                  name="email" 
                  type="text"
                  value={email} 
                  onChange={this.change} 
                  placeholder="Email"
                  autoComplete="username" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password"
                  autoComplete="current-password" />                
              </>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    // this gives us access to the Data methods for talking to the api set up in Data.js and the actions defined in Context.js
    const { context } = this.props;
    // sets path where user will be directed after sign in: where they were going or home page
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    // credentials for user that is signing in
    const { email, password } = this.state;

    context.actions.signIn(email, password)
      .then(user => {
        if (user === null) {
          this.setState({ errors: ['Sign-in was unsuccessful'] });
        } else {
          this.props.history.push(from);
        }
      })
      // handle rejected promise: issue with endpoint, api down, network connectivity error
      .catch( err => {
        console.log(err);
        this.props.history.push('/error'); // push to history stack will redirect to error page
      });
  }
  

  cancel = () => {
    this.props.history.push('/')
  }
}
