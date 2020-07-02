import React from 'react';
import { Link } from 'react-router-dom';

export default function Forbidden(props) {
  let message = 'You are not authorized to access the requested page.'
  if (props.location.state?.error) {
    message = props.location.state.error
  }
  return (
    <>
      <h1>Forbidden</h1>
      <p>{message}</p>
      <button>
        <Link to='/'>Go Back</Link>
      </button>
    </>
  );
}