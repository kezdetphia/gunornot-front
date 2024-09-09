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

## Getting Firebase Config Properties

The app uses Firebase for storage. You need to set up Firebase configuration in the `src/firebase/firebaseConfig.js` file.

// https://firebase.google.com/docs/web/setup#available-libraries

To get the Firebase configuration properties for your project, follow these steps:

1. **Go to the Firebase Console**:

   - Open your web browser and navigate to the [Firebase Console](https://console.firebase.google.com).

2. **Sign In**:

   - Sign in with your Google account. If you don't have an account, you can create one.

3. **Select Your Project**:

   - If you already have a Firebase project, select it from the list. If not, you can create a new project by clicking on the "Add project" button and following the setup instructions.

4. **Navigate to Project Settings**:

   - Once your project is selected, click on the gear icon (⚙️) next to "Project Overview" in the left sidebar.
   - Select "Project settings" from the dropdown menu.

5. **Get the Firebase Config Object**:

   - In the "General" tab of the Project settings, scroll down to the "Your apps" section.
   - If you haven't added an app yet, click on the "Add app" button and follow the instructions to register your app (e.g., Web, iOS, Android).
   - After adding your app, you will see a section titled "Firebase SDK snippet". Click on the "Config" radio button to view the configuration object.

6. **Copy the Config Object**:

   - The configuration object will look something like this:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
     };
     ```
   - Copy this configuration object.

7. **Use the Config Object in Your Project**:
   - Paste the copied configuration object into your project's Firebase initialization file (e.g., `firebaseConfig.js`).
