import React from 'react';
import { Link } from 'react-router-dom';

function Header({context}) {
  const authUser = context.authenticatedUser;

  return (
    <header>
      <nav>
        <Link to="/">I 
          <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red">
            <title>love</title>
            <path d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
          </svg> School
        </Link>
        {authUser ?
          <>
            <span>Welcome, {authUser.firstName} {authUser.lastName}</span>
            <Link to="/signout">Sign Out</Link>
          </> :
          <>
            <Link className="signup" to="/signup">Sign Up</Link>
            <Link className="signin" to="/signin">Sign In</Link>
          </>
        }
      </nav>
    </header>
  );
}

export default Header;