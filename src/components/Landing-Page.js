import React from 'react';
import { connect, } from 'react-redux';
import { Link, Redirect, } from 'react-router-dom';

import LoginForm from './login-form';
import './landing-page.css';

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <section id="about" className="container">
        <div className="about content">
          <header>
            <h2>
              Working remote shouldn't FEEL remote.
            </h2>
          </header>
          <p>
            HEY THIS IS WHY OUR APP IS THE BEST.LOREM IPSUM.LOREM IPSUM. LOREM IPSUM.LOREM IPSUM. LOREM IPSUM.LOREM IPSUM.LOREM IPSUM.LOREM
            IPSUM.LOREM IPSUM.LOREM IPSUM.LOREM IPSUM.
          </p>
          <footer>
            {/* Add image inside link to click to the next page  */}
          </footer>
        </div>
      </section>
      <section id="about" className="container">
        <div className="about content">
          <header>
            <h2>
              CODE EXAMPLE THING GOES HERE
            </h2>
          </header>
          <p>
            HEY THIS IS WHY OUR APP IS THE BEST.LOREM IPSUM.LOREM IPSUM. LOREM IPSUM.LOREM IPSUM. LOREM IPSUM.LOREM IPSUM.LOREM IPSUM.LOREM
            IPSUM.LOREM IPSUM.LOREM IPSUM.LOREM IPSUM.
          </p>
          <footer>
            {/* Add image inside link to click to the next page  */}
          </footer>
        </div>
      </section>
      <section id="about" className="container">
        <div className="about content">
          <header>
            <h2>
              CODE EXAMPLE THING GOES HERE
            </h2>
          </header>
          <p>
            HEY THIS IS WHY OUR APP IS THE BEST.LOREM IPSUM.LOREM IPSUM. LOREM IPSUM.LOREM IPSUM. LOREM IPSUM.LOREM IPSUM.LOREM IPSUM.LOREM
            IPSUM.LOREM IPSUM.LOREM IPSUM.LOREM IPSUM.
          </p>
          <footer>
            {/* Add image inside link to click to the next page  */}
          </footer>
        </div>
      </section>
    </div>
  );
  // Return (
  //   <div className="home">
  //     <h2>Welcome to Foo App</h2>
  //     <LoginForm />
  //     <Link to="/register">Register</Link>
  //   </div>
  // );
}

const mapStateToProps = state => ({ loggedIn: state.auth.currentUser !== null, });

export default connect(mapStateToProps)(LandingPage);
