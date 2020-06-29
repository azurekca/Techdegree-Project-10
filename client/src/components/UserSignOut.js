import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom';

export default ({context}) => {
  // prevents error where component attempts to set state in render
  useEffect(() =>  context.actions.signOut());
 
  return (
    <Redirect to="/" />
  );
}
