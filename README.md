# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Movie Explorer

A modern web application for movie enthusiasts to discover, search, and save their favorite films using The Movie Database (TMDb) API.

## Features

- **User Authentication**: Login functionality with user credentials
- **Movie Discovery**: Browse trending movies with a beautiful interface
- **Search Functionality**: Find movies by title with infinite scrolling results
- **Detailed Movie Information**: View comprehensive details including cast, trailers, and similar movies
- **Favorites System**: Save your favorite movies to a personal collection
- **Filter Movies**: Filter by genre, year, and rating
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Light/Dark Mode**: Toggle between light and dark themes for better viewing experience

## Technologies Used

- **React**: Frontend library for building the user interface
- **Redux Toolkit**: State management with Redux Toolkit for predictable state updates
- **React Router**: Navigation and routing
- **Material UI**: Component library for modern, responsive design
- **Axios**: HTTP client for API requests
- **TMDb API**: The Movie Database API for movie data
- **Redux Persist**: Persistence for Redux state (favorites, theme preference)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- NPM or Yarn
- TMDb API Key (get one at https://developers.themoviedb.org/3)

### Installation

1. Clone the repository:
   ```bash
   git clone https://gitlab.com/your-username/movie-explorer.git
   cd movie-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your TMDb API key:
   ```
   REACT_APP_TMDB_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open http://localhost:3000 to view the app in your browser.

### Demo Credentials

For testing purposes, you can use the following credentials to log in:
- Username: `demo`
- Password: `password`

## Folder Structure

```
movie-explorer/
├── public/               # Public assets
├── src/                  # Source files
│   ├── api/              # API configuration and services
│   ├── assets/           # Static assets (images, etc.)
│   ├── components/       # Reusable components
│   │   ├── auth/         # Authentication components
│   │   ├── common/       # Common UI components
│   │   ├── layout/       # Layout components
│   │   └── movie/        # Movie-related components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── redux/            # Redux store configuration
│   │   └── slices/       # Redux slices
│   ├── theme/            # Theme configuration
│   ├── utils/            # Utility functions
│   ├── App.js            # Main App component
│   ├── index.js          # Entry point
│   └── routes.js         # Route configuration
└── package.json          # Dependencies and scripts
```

## Deployment

The application is deployed and can be accessed at [https://movie-explorer.vercel.app](https://movie-explorer.vercel.app)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the API
- [Material-UI](https://mui.com/) for the excellent component library
- [Create React App](https://create-react-app.dev/) for bootstrapping the project