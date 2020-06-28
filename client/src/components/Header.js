import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">I 
        <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red">
          <title>love</title>
          <path d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
        </svg> School</Link>
      </nav>
    </header>
  );
}

export default Header;