# MovieMobs React Client - Achievement 3

A responsive single-page application (SPA) built with React for browsing and managing movie collections, interfacing with the MovieMobs API backend.

## Links

- **Repository**: https://github.com/ivencomur/MovieMobs-client
- **Specific Commit**: https://github.com/ivencomur/MovieMobs-client/commit/f1212285a6729b54dfdf1fb4365af4883157df4f

## Overview

This React-based client application provides an intuitive, modern interface for the MovieMobs movie database. Built as a single-page application using React functional components and hooks, it demonstrates proficiency in modern React development patterns, state management, component architecture, and RESTful API integration.

## Features

- **Single-Page Application**: Seamless navigation without page refreshes
- **Component-Based Architecture**: Modular, reusable React components
- **State Management**: Efficient state handling using React hooks
- **RESTful API Integration**: Communication with MovieMobs backend
- **User Authentication**: Secure login/registration with JWT tokens
- **Movie Browsing**: Interactive movie discovery and detailed information
- **Search & Filter**: Find movies by title, genre, or director
- **User Profiles**: Personal profile management and account settings
- **Favorites Management**: Add/remove movies from personal favorites list
- **Responsive Design**: Mobile-first responsive layout
- **Client-Side Routing**: React Router for smooth navigation

## Technologies Used

- **React 17/18** - Frontend JavaScript library
- **React Router** - Client-side routing and navigation
- **React Bootstrap** - UI components and responsive design
- **Axios** - HTTP client for API communication
- **PropTypes** - Runtime type checking for components
- **React Hooks** - Modern state management (useState, useEffect)
- **JavaScript ES6+** - Modern JavaScript features
- **CSS3/SCSS** - Styling and responsive design
- **Parcel** - Build tool and development server

## Prerequisites

- Node.js (v14 or higher)
- npm package manager
- MovieMobs API running on backend (Achievement 2)

## Installation

```bash
# Clone the repository
git clone https://github.com/ivencomur/MovieMobs-client.git
cd MovieMobs-client

# Install dependencies
npm install

# Configure API endpoint
# Update API base URL in components to match your backend
const API_URL = 'http://localhost:8080'; // or your deployed API

# Start development server
npm start
```

The application will be available at `http://localhost:1234`

## Project Structure

```
src/
├── components/
│   ├── main-view/              # Main application container
│   │   └── main-view.jsx
│   ├── movie-card/             # Movie display card
│   │   └── movie-card.jsx
│   ├── movie-view/             # Detailed movie view
│   │   └── movie-view.jsx
│   ├── login-view/             # User login form
│   │   └── login-view.jsx
│   ├── registration-view/      # User registration form
│   │   └── registration-view.jsx
│   ├── profile-view/           # User profile management
│   │   └── profile-view.jsx
│   ├── genre-view/             # Genre information display
│   │   └── genre-view.jsx
│   └── director-view/          # Director information display
│       └── director-view.jsx
├── index.html                  # Main HTML template
├── index.js                    # Application entry point
└── index.scss                  # Global styles
```

## Key Components

### MainView
- Central application component managing global state
- Handles routing between different views
- Manages user authentication state
- Coordinates API calls and data flow

### MovieCard
- Reusable component for displaying movie information
- Handles favorite toggle functionality
- Responsive card layout with movie poster and details

### MovieView
- Detailed single movie display component
- Shows comprehensive movie information
- Links to director and genre detail views
- Favorite add/remove functionality

### LoginView & RegistrationView
- User authentication components
- Form validation and error handling
- JWT token management
- Redirect to main view on successful auth

### ProfileView
- User profile information display and editing
- Favorite movies management
- Account settings and preferences
- Profile update functionality

## API Integration

The application communicates with the MovieMobs API for:

- **Authentication**: User login and registration
- **Movies**: Retrieve all movies with detailed information
- **User Data**: Profile information and favorite movies
- **Favorites**: Add/remove movies from user favorites
- **Directors**: Director biographical information
- **Genres**: Genre descriptions and movie associations

### API Endpoints Used
```javascript
// Authentication
POST /users - User registration
POST /login - User authentication

// Movies
GET /movies - Retrieve all movies
GET /movies/:title - Get specific movie

// User Management
GET /users/:username - Get user profile
PUT /users/:username - Update user profile
POST /users/:username/favorites/:movieId - Add favorite
DELETE /users/:username/favorites/:movieId - Remove favorite

// Data
GET /genres/:name - Genre information
GET /directors/:name - Director information
```

## State Management

The application uses modern React patterns for state management:

- **React Hooks**: useState and useEffect for component state
- **Props Drilling**: Component-to-component communication
- **Lifting State Up**: Shared state management in parent components
- **Event Handling**: User interaction and form submissions

## Responsive Design

Mobile-first responsive design with breakpoints for:
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px and above

## Authentication Flow

1. User navigates to application
2. If not authenticated, login/registration view is displayed
3. User provides credentials or registers new account
4. JWT token received and stored in component state
5. Main movie view displayed with full functionality
6. Token included in subsequent API requests

## Build & Deployment

```bash
# Build for production
npm run build

# Deploy to hosting service
npm run deploy
```

Build artifacts are generated in the `dist/` directory for deployment.

## AI Assistance Declaration

This project required significant AI assistance to overcome challenges in React development:

**Technical Challenges Addressed:**
- React component architecture and modern hooks implementation
- State management patterns across multiple components
- React Router setup and navigation between views
- API integration with proper error handling and loading states
- Form validation and user input handling
- Bootstrap integration with React components
- Build tool configuration and deployment optimization

**Development Context:**
React development complexity, particularly around state management and component communication patterns, required additional support when course materials referenced older class-based component patterns. AI assistance was essential for implementing modern React hooks and functional component patterns.

**Human Oversight:**
All AI-generated solutions were thoroughly tested across different browsers and devices. Component architecture decisions and user experience design remained under full developer control.

## Testing

The application has been tested for:
- **Functionality**: All features working as expected
- **Responsiveness**: Proper display across device sizes
- **Browser Compatibility**: Cross-browser functionality
- **API Integration**: Proper communication with backend
- **User Experience**: Intuitive navigation and interactions

## Performance Optimizations

- **Component Memoization**: Preventing unnecessary re-renders
- **Lazy Loading**: On-demand component loading
- **API Optimization**: Efficient data fetching strategies
- **Bundle Optimization**: Code splitting and compression

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Advanced search functionality with filters
- Movie recommendations based on favorites
- Social features (reviews, ratings)
- Enhanced accessibility features
- Progressive Web App capabilities
- Offline functionality with service workers

## Learning Outcomes

- Modern React development with hooks and functional components
- Single-page application architecture and routing
- RESTful API integration and state synchronization
- Responsive web design implementation
- User authentication and session management
- Component-based development methodology

## License

This project is licensed under the MIT License.