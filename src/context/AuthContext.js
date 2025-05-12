import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getLevelById } from '../constants/learningLevels';

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Load stored data
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const [token, data, onboarding] = await Promise.all([
        AsyncStorage.getItem('userToken'),
        AsyncStorage.getItem('userData'),
        AsyncStorage.getItem('hasCompletedOnboarding'),
      ]);

      if (token) setUserToken(token);
      if (data) setUserData(JSON.parse(data));
      if (onboarding) setHasCompletedOnboarding(onboarding === 'true');
    } catch (error) {
      console.error('Error loading stored data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Complete onboarding
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      // TODO: Implement actual login API call
      const mockToken = 'mock-token-' + Date.now();
      const mockUserData = {
        email,
        name: 'Test User',
        level: 'LEVEL_1',
      };

      await Promise.all([
        AsyncStorage.setItem('userToken', mockToken),
        AsyncStorage.setItem('userData', JSON.stringify(mockUserData)),
      ]);

      setUserToken(mockToken);
      setUserData(mockUserData);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Register
  const register = async (name, email, password, childData) => {
    try {
      // TODO: Implement actual registration API call
      const mockToken = 'mock-token-' + Date.now();
      const mockUserData = {
        email,
        name,
        childName: childData.childName,
        age: childData.age,
        level: childData.level.id,
      };

      await Promise.all([
        AsyncStorage.setItem('userToken', mockToken),
        AsyncStorage.setItem('userData', JSON.stringify(mockUserData)),
      ]);

      setUserToken(mockToken);
      setUserData(mockUserData);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('userToken'),
        AsyncStorage.removeItem('userData'),
      ]);
      setUserToken(null);
      setUserData(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getUserLevel = () => {
    if (!userData || !userData.level) return getLevelById('LEVEL_1');
    return getLevelById(userData.level);
  };

  const value = {
    isLoading,
    userToken,
    userData,
    hasCompletedOnboarding,
    login,
    register,
    logout,
    completeOnboarding,
    getUserLevel,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 