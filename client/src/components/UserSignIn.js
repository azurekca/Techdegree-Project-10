import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';

export default class UserSignIn extends Component {
  state = {
    // email: '',
    // password: '',
    errors: [],
  }

  emailRef = React.createRef();
  passwordRef = React.createRef();

  componentDidMount() {
    document.title = 'Courses | Sign In';
  }

  render() {
    const {
      // email,
      // password,
      errors,
    } = this.state;

    return (
      <div className="center-content">
      <div className="container-form-user">
        <h1>Sign In</h1>
        <UserForm 
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Sign In"
          elements={() => (
            <>
              <label htmlFor="email">Email / Username</label>
              <input 
                id="email" 
                name="email" 
                type="text"
                ref={ref.email}
                aria-required="true"
                // onChange={this.change} 
                placeholder="Email"
                autoComplete="username"
                autoFocus />
              <label htmlFor="password">Password</label>
              <input 
                id="password" 
                name="password"
                type="password"
                ref={ref.password}
                aria-required="true"
                // onChange={this.change} 
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

  // change = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;

  //   this.setState(() => {
  //     return {
  //       [name]: value
  //     };
  //   });
  // }

  submit = () => {
    // this gives us access to the Data methods for talking to the api set up in Data.js and the actions defined in Context.js
    const { context } = this.props;
    // sets path where user will be directed after sign in: where they were going or home page
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    // credentials for user that is signing in
    // const { email, password } = this.state;
    const email = this.emailRef.current.value;
    const password = this.passwordRef.current.value;

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
  

  cancel = () => {
    this.props.history.push('/')
  }
}
