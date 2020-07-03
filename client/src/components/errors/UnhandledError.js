import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function UnhandledError() {

  useEffect(() => {
    // set page title
    document.title = 'Courses | Error';
  });

  return (
    <>
      <h1>An Unexpected Error Occurred</h1>
      <button>
        <Link to='/'>Home</Link>
      </button>
    </>
  );
}