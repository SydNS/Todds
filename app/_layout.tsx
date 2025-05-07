import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import React from 'react';
import { AuthProvider } from '../src/context/AuthContext';
import Navigation from '../src/navigation';

// We're using Expo Router's structure but with our custom AuthProvider and Navigation
function RootLayout() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

export default RootLayout;
