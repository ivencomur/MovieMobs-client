import React from "react";
import PropTypes from "prop-types";
// Import React Bootstrap components for the navigation bar.
import { Navbar, Container, Nav } from "react-bootstrap";
// Import Link from React Router for client-side navigation.
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    // Main Navbar component from React Bootstrap.
    // bg="primary" sets the background color (uses themed $primary).
    // variant="dark" makes the text light for contrast with a dark background.
    // expand="lg" makes the navbar collapsible on screens smaller than 'lg'.
    // mb-4 adds margin below the navbar.
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 sticky-top">
      <Container fluid="lg">
        {" "}
        {/* Matches the fluid setting of the main app container */}
        {/* Navbar.Brand typically shows the app name/logo and links to home. */}
        {/* `as={Link}` tells React Bootstrap to render this as a React Router <Link>. */}
        <Navbar.Brand as={Link} to="/">
          MovieMobs
        </Navbar.Brand>
        {/* Navbar.Toggle is the hamburger button for mobile view. */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Navbar.Collapse contains the collapsible navigation links. */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Nav component from React Bootstrap for the links. */}
          {/* `ms-auto` aligns these links to the right. */}
          <Nav className="ms-auto">
            {/* Conditional rendering: Show different links based on user login status. */}
            {user && (
              // Links to show when a user is logged in.
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                {/* Logout link calls the onLoggedOut function passed as a prop. */}
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                {/* Placeholder for a future Profile link */}
                {/* <Nav.Link as={Link} to="/profile">Profile</Nav.Link> */}
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
  user: PropTypes.object, // The user object (null if not logged in)
  onLoggedOut: PropTypes.func.isRequired, // Function to call when logout is clicked
};

/*
This NavigationBar component provides the main navigation for the application.
It uses React Bootstrap's Navbar components for styling and responsiveness.
Key features:
- Displays the application name ("MovieMobs") as a brand, linking to the homepage.
- Shows different navigation links based on whether a user is logged in (`user` prop):
    - If logged in: "Home" and "Logout" links.
    - If not logged in: "Login" and "Sign Up" links.
- Uses the `Link` component from `react-router-dom` for all internal navigation links,
  ensuring client-side routing is used. The `as={Link}` prop integrates React Router's
  Link behavior with React Bootstrap's Nav.Link styling.
- The "Logout" link calls the `onLoggedOut` function passed via props.
- The Navbar is sticky at the top (`sticky-top`) and uses the themed primary background color.
*/
