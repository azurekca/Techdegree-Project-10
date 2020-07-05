import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserSignIn extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
  }

  componentDidMount() {
    document.title = 'Courses | Sign In';
  }

  render() {
    const {
      email,
      password,
      errors,
    } = this.state;

    let validation = null;
    if (errors.length > 0) {
      validation = (
        <div className="container-error" role="alert">
          <h2>Validation errors</h2>
          <p>{errors}</p>
        </div>
      );
    }

    return (
      <div className="center-content">
        <div className="container-form-user">
          <h1>Sign In</h1>
          {validation}
          <form onSubmit={this.submit}>
            <label htmlFor="email">Email / Username</label>
            <input 
              id="email" 
              name="email" 
              type="text"
              value={email}
              aria-required="true"
              onChange={this.change} 
              placeholder="Email / Username"
              autoComplete="username"
              autoFocus />
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password"
              type="password"
              value={password}
              aria-required="true"
              onChange={this.change} 
              placeholder="Password"
              autoComplete="current-password" />                
            <div className="container-buttons">
              <button type="submit">Sign In</button>
              <button className="button-nav" onClick={this.cancel}>Cancel</button>
            </div>
          </form>
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

  submit = (event) => {
    event.preventDefault();
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
      .catch( error => {
        console.log(error);
        this.props.history.push('/error'); // push to history stack will redirect to error page
      });
  }
  

  cancel = (event) => {
    event.preventDefault();
    this.props.history.push('/')
  }
}
