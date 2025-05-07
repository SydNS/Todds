import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { ChallengeProvider } from './src/context/ChallengeContext';
import Navigation from './src/navigation';

export default function App() {
  return (
    <AuthProvider>
      <ChallengeProvider>
        <StatusBar style="auto" />
        <Navigation />
      </ChallengeProvider>
    </AuthProvider>
  );
} 