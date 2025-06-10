# MovieMobs Client (React Frontend)

This is the React frontend for the MovieMobs application, allowing users to browse movies.

## Current Features

* Simulates fetching movie data asynchronously on load (using a mock dataset of 30 items).
* Displays a list of movies in a responsive grid layout.
* Applies basic styling using SCSS, inspired by project CSS and common UI patterns.
* Allows clicking on a movie card to view details (Title, Description, Image, Genre, Director, Cast, Featured Status).
* Allows navigating back from the detail view to the list view.
* Implements `MainView` using default export/import.

## Setup & Running

1.  **Clone:** Clone the repository if you haven't already.
2.  **Install Dependencies:**
    * Navigate to the `MovieMobs-client` directory in your terminal.
    * Run `npm install` (or `yarn install`).
3.  **Run Development Server:**
    * Run `npm start` (requires adding `"start": "parcel src/index.html"` to the `scripts` section in `package.json`) or run `parcel src/index.html` directly.
4.  **View:** Open your browser to `http://localhost:1234` (or the port specified by Parcel). You should see a "Loading..." message briefly before the movie cards appear.

## Build Tool

This project uses Parcel v2.

## Notes

* **Data Source:** Currently uses *simulated* mock data (30 movies) loaded via `useEffect` in `MainView`. The structure is designed to be replaced with a real API call to your MovieMobs backend that could return any number of movies (e.g., 75+).
* **Styling:** Styling is implemented using SCSS in `src/index.scss` and applied via `className` attributes.

## Next Steps

* Replace the simulated data fetch in `MainView` with actual API calls.
* Implement user registration and login components and functionality.
* Add routing to handle different views (Login, Signup, Profile, Movie).
* Refine styling further based on specific design requirements.
* Implement features for users to manage favorite movies.