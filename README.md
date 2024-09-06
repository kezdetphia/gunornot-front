# GunOrNot Frontend

This is the frontend application for the GunOrNot project. It is built using React and Ionic.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Building the App](#building-the-app)
- [Project Structure](#project-structure)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: You need to have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: npm is the package manager for Node.js. It is installed automatically with Node.js.
- **Ionic CLI**: Install the Ionic CLI globally using npm:
  ```bash
  npm install -g @ionic/cli
  ```

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/kezdetphia/gunornot-front
   cd gunornot-front
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the App

To run the app in development mode, use the following command:

```bash
npm start
```

This will start a local development server and open the app in your default web browser. The app will automatically reload if you make changes to the code.

## Building the App

To build the app for production, use the following command:

```bash
ionic build
```

This will create a production-ready build of the app in the `www` directory.

## Project Structure

The project follows a standard Ionic project structure. Here is a brief overview of the main directories and files:

- `src`: Contains the main application code.
- `src/components`: Contains reusable UI components.
- `src/pages`: Contains the main pages of the app.
- `src/services`: Contains the services used by the app.
- `src/assets`: Contains the assets used by the app.

├── public/ # Public assets
├── src/ # Source code
│ ├── components/ # React components
│ ├── context/ # React context providers
│ ├── hooks/ # Custom hooks
│ ├── pages/ # Page components
│ ├── services/ # Service modules (e.g., API calls)
│ ├── App.css # Global CSS
│ ├── App.jsx # Main app component
│ ├── index.css # Global CSS
│ ├── index.jsx # Entry point
│ └── ... # Other files
├── .gitignore # Git ignore file
├── package.json # npm package configuration
├── README.md # Project documentation
└── ... # Other files

## Environment Variables

To run the app, you need to set up a `.env` file in the root directory of the project. This file should be placed in the root folder of your project, at the same level as the `src` directory and `package.json` file.

The `.env` file should contain the following environment variables:

To run the app, you need to set up a `.env` file in the root directory of the project. This file should contain the following environment variable:

```
REACT_APP_BASE_BACKEND_URL=<your-backend-url>
```

Replace `<your-backend-url>` with the URL of your backend server.
