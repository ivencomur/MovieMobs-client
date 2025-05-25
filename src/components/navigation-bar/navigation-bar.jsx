import React from "react";
import PropTypes from "prop-types";
// Import React Bootstrap components for the navigation bar.
import { Navbar, Container, Nav } from "react-bootstrap";
// Import Link from React Router for client-side navigation.
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    // Main Navbar component from React Bootstrap.
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 sticky-top">
      <Container fluid="lg">
        {/* Navbar.Brand links to home. */}
        <Navbar.Brand as={Link} to="/">
          MovieMobs
        </Navbar.Brand>
        {/* Navbar.Toggle is the hamburger button for mobile view. */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Navbar.Collapse contains the collapsible navigation links. */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Conditional rendering based on user login status. */}
            {user && (
              // Links to show when a user is logged in.
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                {/* Activate Profile link */}
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
            {!user && (
              // Links to show when no user is logged in.
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Define prop types for the NavigationBar component.
NavigationBar.propTypes = {
  user: PropTypes.object,
  onLoggedOut: PropTypes.func.isRequired,
};

/*
These comments intend to provide a self-learning feedback for me as a student
to be able to revisit, review, and comprehend their gist whenever these type
of scripts can be reused as a pattern again. I apologize for the inconveniences they might cause:

NavigationBar Component — Main site navigation.

Key Features:

1. Uses React Bootstrap Navbar, Container, and Nav for responsive layout.  
   → Lines 7–38

2. Displays brand link ("MovieMobs") to home page.  
   → Line 11

3. Hamburger menu toggle for mobile view.  
   → Line 13

4. Conditionally renders links based on `user` prop:  
   - When logged in: Home, Profile (new, active), Logout (calls onLoggedOut).  
   - When logged out: Login, Sign Up.  
   → Lines 17–34

5. Uses React Router `<Link>` for client-side navigation without page reloads.  
   → Throughout Nav.Link components

6. PropTypes validate `user` (optional object) and required `onLoggedOut` function.  
   → Lines 40–45

7. Styled with Bootstrap's "primary" dark Navbar, sticky on top, and margin bottom.  
   → Line 9

This structure ensures smooth, user-aware navigation with modern React and Bootstrap tools.
*/
