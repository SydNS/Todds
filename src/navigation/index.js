import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuth } from '../context/AuthContext';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ChallengeDetailScreen from '../screens/challenges/ChallengeDetailScreen';
import ChallengesScreen from '../screens/challenges/ChallengesScreen';
import LearnPhonicsScreen from '../screens/learnphonics/LearnPhonicsScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import PuzzlesGamesScreen from '../screens/puzzlesgames/PuzzlesGamesScreen';
import ReadStoryScreen from '../screens/readstory/ReadStoryScreen';
import SingWithUsScreen from '../screens/singwithus/SingWithUsScreen';
import TodaysChallengeScreen from '../screens/todayschallenge/TodaysChallengeScreen';
import WeeklyFavoritesScreen from '../screens/weeklyfavorites/WeeklyFavoritesScreen';

// Import game screens
import {
  AlphabetSafariGame,
  AnimalSoundsGame,
  CardFlipGame,
  CountingFunGame,
  LetterMatchingGame,
  RememberSequenceGame
} from '../games';
import { GamesIndexScreen } from '../screens/games';

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
        <Stack.Group>
          <Stack.Screen name="HomeStack" component={HomeStack} />
          <Stack.Screen name="TodaysChallenge" component={TodaysChallengeScreen} />
          <Stack.Screen name="ReadStory" component={ReadStoryScreen} />
          <Stack.Screen name="LearnPhonics" component={LearnPhonicsScreen} />
          <Stack.Screen name="SingWithUs" component={SingWithUsScreen} />
          <Stack.Screen name="PuzzlesGames" component={PuzzlesGamesScreen} />
          <Stack.Screen name="WeeklyFavorites" component={WeeklyFavoritesScreen} />
          <Stack.Screen name="Challenges" component={ChallengesScreen} />
          <Stack.Screen name="ChallengeDetail" component={ChallengeDetailScreen} />
          
          {/* Game screens */}
          <Stack.Screen name="LetterMatchingGame" component={LetterMatchingGame} />
          <Stack.Screen name="AlphabetSafariGame" component={AlphabetSafariGame} />
          <Stack.Screen name="AnimalSoundsGame" component={AnimalSoundsGame} />
          <Stack.Screen name="CardFlipGame" component={CardFlipGame} />
          <Stack.Screen name="CountingFunGame" component={CountingFunGame} />
          <Stack.Screen name="RememberSequenceGame" component={RememberSequenceGame} />
          <Stack.Screen name="GamesIndex" component={GamesIndexScreen} />
        </Stack.Group>
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