import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [childInfo, setChildInfo] = useState(null);
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
        const storedChildInfo = await AsyncStorage.getItem('childInfo');
        
        if (storedToken && storedUserInfo) {
          setUserToken(storedToken);
          setUserInfo(JSON.parse(storedUserInfo));
          
          if (storedChildInfo) {
            setChildInfo(JSON.parse(storedChildInfo));
          }
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
      
      // Retrieve stored child info if any (in a real app this would come from the backend)
      const storedChildInfo = await AsyncStorage.getItem('childInfo');
      let childInfoData = null;
      
      if (storedChildInfo) {
        childInfoData = JSON.parse(storedChildInfo);
      } else {
        // Sample child data if none exists
        childInfoData = {
          name: 'Demo Child',
          age: '4 years',
          gender: 'Female',
          grade: 'Pre-K'
        };
        await AsyncStorage.setItem('childInfo', JSON.stringify(childInfoData));
      }
      
      // Store auth data
      await AsyncStorage.setItem('userToken', mockToken);
      await AsyncStorage.setItem('userInfo', JSON.stringify(mockUserInfo));
      
      // Update state
      setUserInfo(mockUserInfo);
      setChildInfo(childInfoData);
      setUserToken(mockToken);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to login. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  // Register
  const register = async (name, email, password, childDetails) => {
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
      
      // Format child information
      const childInfoData = {
        name: childDetails.childName,
        age: childDetails.childAge,
        gender: childDetails.childGender,
        grade: childDetails.childGrade
      };
      
      // Store auth data
      await AsyncStorage.setItem('userToken', mockToken);
      await AsyncStorage.setItem('userInfo', JSON.stringify(mockUserInfo));
      await AsyncStorage.setItem('childInfo', JSON.stringify(childInfoData));
      
      // Update state
      setUserInfo(mockUserInfo);
      setChildInfo(childInfoData);
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
      // In a real app, you might want to make an API call to invalidate the token
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
      // We're not removing child info to persist it between sessions
      
      setUserToken(null);
      setUserInfo(null);
    } catch (error) {
      console.log('Error logging out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update Child Info
  const updateChildInfo = async (updatedChildInfo) => {
    try {
      const newChildInfo = { ...childInfo, ...updatedChildInfo };
      await AsyncStorage.setItem('childInfo', JSON.stringify(newChildInfo));
      setChildInfo(newChildInfo);
      return { success: true };
    } catch (error) {
      console.log('Error updating child info:', error);
      return { success: false, error: 'Failed to update child information.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        childInfo,
        hasCompletedOnboarding,
        login,
        logout,
        register,
        completeOnboarding,
        updateChildInfo
      }}
    >
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