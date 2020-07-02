import React from 'react';
import { Link } from 'react-router-dom';

export default function UnhandledError() {
  return (
    <>
      <h1>An Unexpected Error Occurred</h1>
      <button>
        <Link to='/'>Go Back</Link>
      </button>
    </>
  );
}