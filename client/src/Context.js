import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {

  constructor() {
    super();
    this.data = new Data();
  }

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        parseValidationErrors: this.parseValidationErrors
      }
    }

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  signIn = async (username, password) => {
    let user = await this.data.getUser(username, password);
    if (user) {
      user = {...user, password }
      this.setState({ authenticatedUser: user });
      console.log(`${user.firstName} is logged in!`)
      // set cookie
      Cookies.set('authenticatedUser', JSON.stringify(user));
    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }

  parseValidationErrors = (errors) => {
    // split error string
    const parsedErrors = errors.map(error => {
      const parts = error.split('_');
      return {
        field: parts[0],
        message: parts[1]
      }
    });
    // assign field name and error message
    // return parsed errors
    return parsedErrors;
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * * Why? - so that each component doesn't need to be wrapped in <Context.Consumer> to have access to context and history?
 * * Any component that wants to use context now uses withContext instead
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

