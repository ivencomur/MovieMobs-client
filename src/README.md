# MovieMobs Client (React Frontend)

This is the React frontend for the MovieMobs application, allowing users to register, log in, and browse movies from a live API.

---
## 🚀 Current Features

* **User Authentication**:
    * User registration (`SignupView`) and login (`LoginView`) functionality.
    * User session persistence using `localStorage` for token and user data.
    * Logout functionality.
* **Movie Browse**:
    * Authenticated API requests to `https://iecm-movies-app-6966360ed90e.herokuapp.com` to fetch a list of movies.
    * Displays movies in a responsive grid layout using **React Bootstrap Cards**.
    * Clicking a movie card opens a detailed `MovieView` showing Title, Description, Image, Genre, Director, Cast, and Featured Status.
    * Navigation back from the detail view to the main movie list.
* **UI & Styling**:
    * Built with **React** and styled using **SCSS**.
    * Integrates **React Bootstrap** for UI components and responsive layout.
    * Custom theming of React Bootstrap using SCSS overrides and global variables defined in `src/variables.scss`.
* **User Experience**:
    * Loading states (spinners) during asynchronous operations.
    * Error handling and display of user-friendly error messages (Alerts).
    * Conditional rendering of views based on authentication status and user interaction.
* Implements `MainView` using default export/import.

---
## 🛠️ Setup & Running

1.  **Clone the Repository**:
    If you haven't already, clone the repository to your local machine.
    ```bash
    git clone <your-repository-url>
    cd MovieMobs-client
    ```

2.  **Install Dependencies**:
    Navigate to the `MovieMobs-client` directory in your terminal and run:
    ```bash
    npm install
    ```
    (or `yarn install` if you prefer Yarn)

3.  **Run Development Server**:
    This project uses **Parcel v2** as its build tool. To start the development server:
    ```bash
    npm start
    ```
    (This requires adding `"start": "parcel src/index.html"` to the `scripts` section in your `package.json`) or run `parcel src/index.html` directly.

4.  **View in Browser**:
    Open your browser and navigate to `http://localhost:1234` (or the port specified by Parcel in your terminal). You should see a "Loading..." message briefly if fetching data, or the login/signup view.

---
## 📝 Notes

* **Data Source**: The application now fetches data from and authenticates against the live backend API at `https://iecm-movies-app-6966360ed90e.herokuapp.com`. The previous use of simulated mock data has been replaced.
* **Styling**: Styling is implemented using SCSS (`src/index.scss`, component-specific `.scss` files) and leverages a customized React Bootstrap theme. Global style variables are centralized in `src/variables.scss`.
* **Build Tool**: This project uses Parcel v2.

---
## 🌱 Next Steps

* **User Profile**: Implement a user profile view where users can see and update their information.
* **Favorite Movies**: Allow users to add movies to a "Favorites" list and manage this list.
* **Advanced Routing**: Implement a routing library (like React Router) for distinct URLs for different views (e.g., `/movies/:movieId`, `/profile`) to improve navigation and shareability.
* **Search & Filtering**: Add functionality to search for movies by title, genre, etc., and apply filters.
* **Testing**: Introduce comprehensive testing (unit tests with Jest/React Testing Library, integration tests, and potentially E2E tests).
* **UI/UX Refinements**: Further polish the user interface, improve accessibility, and enhance the overall user experience based on specific design requirements.
* **Code Splitting**: For larger applications, implement code splitting to improve initial load times.
* **Environment Configuration**: Manage API base URLs and other configurations more robustly (e.g., using `.env` files).