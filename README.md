# GovRev

A mobile application for government services and civic engagement built with React Native and Expo.

## Project Structure

```
GovRev/
├── assets/
│   └── images/           # Background and other images
├── src/
│   ├── components/       # Reusable UI components
│   ├── constants/        # App constants and theme
│   ├── screens/          # Application screens
│   │   ├── dashboard/    # Dashboard screen
│   │   ├── home/         # Home screen
│   │   └── ...
│   └── utils/            # Utility functions
└── App.js                # Main application entry point
```

## Features

- Modern UI with transparent background implementation
- Dashboard with activity tracking
- Government services directory
- Legislative updates
- Citizen engagement tools

## Setup and Running

1. Install dependencies:
```
npm install
```

2. Start the application:
```
npm start
```

3. Use Expo Go app on your device or an emulator to open the application.

## Tech Stack

- React Native
- Expo
- React Native Animatable

## Development

This project follows a consistent component structure and uses the following UI patterns:
- Transparent overlays with the getTransparentOverlay() utility
- Random background images via useRandomBackground() hook
- Consistent color themes defined in theme.js