# MovieMobs Client (React Frontend)

This is the React frontend for the MovieMobs application, allowing users to browse movies.

## Current Features (Based on Mock Data)

* Displays a list of movies.
* Allows clicking on a movie to view details (Title, Description, Image, Genre, Director, Cast, Featured Status).
* Allows navigating back from the detail view to the list view.

## Setup

1.  Clone the repository (if you haven't already).
2.  Ensure Node.js and npm (or yarn) are installed.
3.  Navigate into the project folder: `cd MovieMobs-client`
4.  Install dependencies: `npm install` (or `yarn install`)
5.  Start the development server: `npm start` (this assumes you add a "start": "parcel src/index.html" script to your package.json) or run `parcel src/index.html` directly.
6.  Open `http://localhost:1234` (or the port Parcel assigns) in your browser.

## Build Tool

This project uses Parcel v2.

## Next Steps

* Integrate with the MovieMobs API to fetch real movie data.
* Implement user registration and login views.
* Add styling to match wireframes/design requirements.
* Allow users to update their profile and manage favorite movies.