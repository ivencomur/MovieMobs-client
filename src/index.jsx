import { createRoot } from "react-dom/client";
// Import Bootstrap Container for layout.
import Container from "react-bootstrap/Container";
// Import the main application view.
import MainView from "./components/main-view/main-view";
// Import global styles, including Bootstrap theme overrides.
import "./index.scss";

// Define the root React component for the application.
const MovieMobsApplication = () => {
  return (
    // Use Bootstrap's Container for responsive padding and max-width.
    // fluid="lg" makes it full-width until 'lg' breakpoint, then constrained.
    // py-3 adds vertical padding.
    <Container fluid="lg" className="movie-mobs-app-container py-3">
      <MainView />
    </Container>
  );
};

// Get the root DOM element where the React app will be mounted.
const container = document.querySelector("#root");
// Create a React root for concurrent rendering.
const root = createRoot(container);

// Render the main application component into the root DOM element.
root.render(<MovieMobsApplication />);

/*
These comments intend to provide a self-learning feedback for me as a student
to be able to revisit, review, and comprehend their gist whenever these type
of scripts can be reused as a pattern again. I apologize for the inconveniences they might cause:

This is the main entry point for the React application.
It imports necessary libraries, the main MainView component, and global SCSS styles.
The MovieMobsApplication component sets up a Bootstrap Container to wrap the MainView,
providing a responsive layout with appropriate padding and width constraints.
Finally, it renders the entire application into the HTML element with the ID "root".
The import of "./index.scss" loads all themed Bootstrap styles and custom global styles.
*/
