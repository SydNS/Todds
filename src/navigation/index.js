import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useAuth } from '../context/AuthContext';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import AlphabetAdventureScreen from '../screens/alphabetadventure/AlphabetAdventureScreen';
import AnimalSoundsScreen from '../screens/animalsounds/AnimalSoundsScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import { BookReaderScreen, BooksScreen } from '../screens/books';
import ChallengeDetailScreen from '../screens/challenges/ChallengeDetailScreen';
import ChallengesScreen from '../screens/challenges/ChallengesScreen';
import ColorQuestScreen from '../screens/colorquest/ColorQuestScreen';
import DrawAndTellScreen from '../screens/drawandtell/DrawAndTellScreen';
import LearnPhonicsScreen from '../screens/learnphonics/LearnPhonicsScreen';
import MemoryMixScreen from '../screens/memorymix/MemoryMixScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import PuzzlesGamesScreen from '../screens/puzzlesgames/PuzzlesGamesScreen';
import AllStoriesScreen from '../screens/readstory/AllStoriesScreen';
import ReadStoryScreen from '../screens/readstory/ReadStoryScreen';
import StoryDetailsScreen from '../screens/readstory/StoryDetailsScreen';
import SingWithUsScreen from '../screens/singwithus/SingWithUsScreen';
import SoundItOutScreen from '../screens/sounditout/SoundItOutScreen';
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

const Navigation = ({ onReady }) => {
  const { isLoading, userToken, hasCompletedOnboarding } = useAuth();

  useEffect(() => {
    // Call onReady when the navigation is ready
    if (onReady && typeof onReady === 'function') {
      onReady();
    }
  }, [onReady]);

  if (isLoading) {
    // Show splash screen while loading
    return <SplashScreen />;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onReady}>
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
            <Stack.Screen name="Books" component={BooksScreen} />
            <Stack.Screen name="BookReader" component={BookReaderScreen} />
            <Stack.Screen name="LearnPhonics" component={LearnPhonicsScreen} />
            <Stack.Screen name="SingWithUs" component={SingWithUsScreen} />
            <Stack.Screen name="PuzzlesGames" component={PuzzlesGamesScreen} />
            <Stack.Screen name="WeeklyFavorites" component={WeeklyFavoritesScreen} />
            <Stack.Screen name="Challenges" component={ChallengesScreen} />
            <Stack.Screen name="ChallengeDetail" component={ChallengeDetailScreen} />
            
            {/* Activity screens */}
            <Stack.Screen name="AlphabetAdventure" component={AlphabetAdventureScreen} />
            <Stack.Screen name="AnimalSounds" component={AnimalSoundsScreen} />
            <Stack.Screen name="ColorQuest" component={ColorQuestScreen} />
            <Stack.Screen name="SoundItOut" component={SoundItOutScreen} />
            <Stack.Screen name="MemoryMix" component={MemoryMixScreen} />
            <Stack.Screen name="DrawAndTell" component={DrawAndTellScreen} />
            
            {/* Game screens */}
            <Stack.Screen name="LetterMatchingGame" component={LetterMatchingGame} />
            <Stack.Screen name="AlphabetSafariGame" component={AlphabetSafariGame} />
            <Stack.Screen name="AnimalSoundsGame" component={AnimalSoundsGame} />
            <Stack.Screen name="CardFlipGame" component={CardFlipGame} />
            <Stack.Screen name="CountingFunGame" component={CountingFunGame} />
            <Stack.Screen name="RememberSequenceGame" component={RememberSequenceGame} />
            <Stack.Screen name="GamesIndex" component={GamesIndexScreen} />
            <Stack.Screen name="AllStories" component={AllStoriesScreen} />
            <Stack.Screen name="StoryDetails" component={StoryDetailsScreen} />
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
    </View>
  );
};

export default Navigation; 