import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Container from "react-bootstrap/Container";
import MainView from "./components/main-view/main-view";
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  return (
    // Use Bootstrap's Container for responsive padding and max-width.
    // fluid="lg" makes it full-width until 'lg' breakpoint, then constrained.
    // py-3 adds vertical padding.
    <Container fluid="lg" className="movie-mobs-app-container py-3">
      <MainView />
    </Container>
  );
};

export default App
