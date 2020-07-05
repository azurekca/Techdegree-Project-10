import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorsDisplay from './helpers/ErrorsDisplay';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  // refs to mark locations on page to scroll to
  validationRef = React.createRef();
  firstNameRef = React.createRef();
  lastNameRef = React.createRef();
  emailAddressRef = React.createRef();
  passwordRef = React.createRef();

  componentDidMount() {
    document.title = 'Courses | Sign Up';
    // scroll to validation errors
  }

  componentDidUpdate() {
    if (this.validationRef.current) {
      console.log(this.validationRef)
      this.validationRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="center-content">
        <div className="container-form-user">
          <h1>Sign Up</h1>
          <ErrorsDisplay 
            errors={errors}
            validationRef={this.validationRef}
            firstNameRef={this.firstNameRef}
            lastNameRef={this.lastNameRef}
            emailAddressRef={this.emailAddressRef}
            passwordRef={this.passwordRef}
          />
          <form onSubmit={this.submit}>
            <label htmlFor="firstName">First Name</label>
            <input 
              id="firstName" 
              name="firstName" 
              type="text"
              value={firstName}
              ref={this.firstNameRef}
              aria-required="true"
              onChange={this.change} 
              placeholder="First name"
              autoComplete="given-name"
              autoFocus />
            <label htmlFor="lastName">Last Name</label>
            <input 
              id="lastName" 
              name="lastName" 
              type="text"
              value={lastName}
              ref={this.lastNameRef}
              aria-required="true"
              onChange={this.change} 
              placeholder="Last name"
              autoComplete="family-name" />
            <label htmlFor="emailAddress">Email Address</label>
            <input 
              id="emailAddress" 
              name="emailAddress" 
              type="emailAddress"
              value={emailAddress}
              ref={this.emailAddressRef}
              aria-required="true"
              onChange={this.change} 
              placeholder="Email"
              autoComplete="username" />
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password"
              type="password"
              value={password}
              ref={this.passwordRef}
              aria-required="true"
              onChange={this.change} 
              placeholder="Password"
              autoComplete="new-password" />
            <div className="container-buttons">
              <button type="submit">Sign Up</button>
              <button className="button-nav" onClick={this.cancel}>Cancel</button>
          </div>
        </form>
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
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
    // this gives us access to the Data methods for talking to the api
    const { context } = this.props;

    // this is the info for the new user
    const {
      firstName,
      lastName,
      emailAddress,
      password
    } = this.state;

    // create a new user object based on the properties we got from state
    const user = { firstName, lastName, emailAddress, password };

    context.data.createUser(user)
      .then(data => {
        if (data.errors) {
          // validation errors
          const valErrors = context.actions.parseValidationErrors(data.errors);
          this.setState({ errors: valErrors });
        } else {
          context.actions.signIn(emailAddress, password)
            .then(() => this.props.history.push('/'));
        }
      })
      // handle errors and rejected promise: issue with endpoint, api down, network connectivity error
      .catch( error => {
        console.log(error);
        // pushing to history stack will redirect to error page
        this.props.history.push('/error'); 
      });

  }

  cancel = (event) => {
    event.preventDefault();
    this.props.history.push('/');
  }
}
