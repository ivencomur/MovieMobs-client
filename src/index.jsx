import { createRoot } from 'react-dom/client';


import "./index.scss"; 


const MovieMobsApplication = () => { 
  return (
    
    <div className="movie-mobs-app">
      <div>Welcome to MovieMobs!</div> {/* Updated text */}
    </div>
  );
};


const container = document.querySelector("#root");
const root = createRoot(container);


root.render(<MovieMobsApplication />);