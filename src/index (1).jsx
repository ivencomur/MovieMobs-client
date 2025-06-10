import { createRoot } from 'react-dom/client';
import MainView from './components/main-view/main-view';
import "./index.scss";

const MovieMobsApplication = () => {
  return (
    <div className="movie-mobs-app">
       <MainView />
    </div>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MovieMobsApplication />);