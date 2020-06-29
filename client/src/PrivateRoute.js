import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

// allows Component to render if context.authenticatedUser is true
// redirects to sign in page if false. 
// After sign in, user will be taken to page they were originally trying to access
export default ({ component: Component, ...rest }) => {
  return (
        <Consumer>
          {context => (
            <Route
              {...rest}
              render={props => context.authenticatedUser ? (
                  <Component {...props} />
                ) : (
                  <Redirect to={{
                    pathname: '/signin',
                    state: { from: props.location }
                  }} /> 
                  // Why two sets of curly braces? from React docs: The exterior set of curly braces are letting JSX know you want a JS expression. The interior set of curly braces represent a JavaScript object, meaning you’re passing in a object to the style attribute.
                )
              }
            />
          )}
        </Consumer>

  );
};