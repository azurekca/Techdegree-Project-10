import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound(props) {
  let message = 'The requested page was not found.'
  if (props.location.state?.error) {
    message = props.location.state.error
  }
  return (
    <>
      <h1>Not Found</h1>
      <p>{message}</p>
      <button>
        <Link to='/'>Go Back</Link>
      </button>
    </>
  );
}