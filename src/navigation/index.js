import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuth } from '../context/AuthContext';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';

// Import navigation stacks
import HomeStack from './HomeStack';

// Import animations
import '../utils/animations';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { isLoading, userToken, hasCompletedOnboarding } = useAuth();

  if (isLoading) {
    // Show splash screen while loading
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {!hasCompletedOnboarding ? (
        // Show onboarding if not completed
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : userToken ? (
        // User is logged in, show main app
        <Stack.Screen name="HomeStack" component={HomeStack} />
      ) : (
        // User is not logged in, show auth screens
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default Navigation; 