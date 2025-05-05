import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const checkOnboardingStatus = async () => {
      try {
        const onboardingStatus = await AsyncStorage.getItem('onboardingCompleted');
        if (onboardingStatus) {
          setHasCompletedOnboarding(true);
        }
      } catch (error) {
        console.log('Error checking onboarding status:', error);
      }
    };

    // Check if user is logged in
    const bootstrapAsync = async () => {
      try {
        // Load token from storage
        const storedToken = await AsyncStorage.getItem('userToken');
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        
        if (storedToken && storedUserInfo) {
          setUserToken(storedToken);
          setUserInfo(JSON.parse(storedUserInfo));
        }
      } catch (error) {
        console.log('Error checking auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
    bootstrapAsync();
  }, []);

  // Complete onboarding
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.log('Error completing onboarding:', error);
    }
  };

  // Login
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // For MVP, we'll mock the API call
      // In a real app, you would make an API call to authenticate
      const mockUserInfo = {
        id: '1',
        name: 'Demo Parent',
        email: email,
        avatarUrl: 'https://via.placeholder.com/150',
      };
      
      const mockToken = 'sample-jwt-token-' + Math.random().toString(36).substring(2, 15);
      
      // Store auth data
      await AsyncStorage.setItem('userToken', mockToken);
      await AsyncStorage.setItem('userInfo', JSON.stringify(mockUserInfo));
      
      // Update state
      setUserInfo(mockUserInfo);
      setUserToken(mockToken);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to login. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  // Register
  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      // For MVP, we'll mock the API call
      const mockUserInfo = {
        id: '1',
        name: name,
        email: email,
        avatarUrl: 'https://via.placeholder.com/150',
      };
      
      const mockToken = 'sample-jwt-token-' + Math.random().toString(36).substring(2, 15);
      
      // Store auth data
      await AsyncStorage.setItem('userToken', mockToken);
      await AsyncStorage.setItem('userInfo', JSON.stringify(mockUserInfo));
      
      // Update state
      setUserInfo(mockUserInfo);
      setUserToken(mockToken);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to register. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setIsLoading(true);
    try {
      // Remove auth data
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
      
      // Update state
      setUserInfo(null);
      setUserToken(null);
    } catch (error) {
      console.log('Error logging out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password (mock implementation)
  const resetPassword = async (email) => {
    setIsLoading(true);
    try {
      // Mock API call
      // In a real app, this would send a reset email
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      return { success: true, message: 'Password reset email sent. Please check your inbox.' };
    } catch (error) {
      return { success: false, error: 'Failed to send reset email. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const authContext = {
    isLoading,
    userToken,
    userInfo,
    hasCompletedOnboarding,
    login,
    logout,
    register,
    resetPassword,
    completeOnboarding,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 