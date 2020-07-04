import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';

export default function NotFound(props) {
  let message = 'The requested page was not found.'
  if (props.location.state?.error) {
    message = props.location.state.error
  }

  useEffect(() => {document.title = 'Courses | Not Found'} );

  return (
    <>
      <div className="container-error">
      <h1>Not Found</h1>
      <h2>{message}</h2>
      <button>
        <Link to='/'>Home</Link>
      </button>
    </div>
    </>
  );
}