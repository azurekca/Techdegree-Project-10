import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Forbidden(props) {
  let message = 'You are not authorized to access the requested page.'
  if (props.location.state?.error) {
    message = props.location.state.error
  }

  useEffect(() => {document.title = 'Courses | Forbidden'} );
    
  return (
    <div className="container-error">
      <h1>Forbidden</h1>
      <h2>{message}</h2>
      <button>
        <Link to='/'>Home</Link>
      </button>
    </div>
  );
}