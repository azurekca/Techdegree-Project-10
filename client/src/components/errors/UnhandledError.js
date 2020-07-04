import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function UnhandledError() {

  useEffect(() => {
    // set page title
    document.title = 'Courses | Error';
  });

  return (
    <>
      <div className="container-error">
      <h1>An Unexpected Error Occurred</h1>
      <h2>Sometimes these things happen..</h2>
      <button>
        <Link to='/'>Home</Link>
      </button>
    </div>
    </>
  );
}