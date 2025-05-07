import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create context
const ChallengeContext = createContext();

export const ChallengeProvider = ({ children }) => {
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Predefined list of all available challenges
  const allChallenges = [
    {
      id: '1',
      title: 'ABC Recognition',
      description: 'Identify and match uppercase and lowercase letters',
      category: 'Alphabet',
      difficulty: 'Easy',
      reward: 'Letter Master Badge',
      requiredToComplete: 10,
    },
    {
      id: '2',
      title: 'Number Counting',
      description: 'Count numbers from 1 to 10 correctly',
      category: 'Numbers',
      difficulty: 'Easy',
      reward: 'Number Wizard Badge',
      requiredToComplete: 5,
    },
    {
      id: '3',
      title: 'Color Matching',
      description: 'Match objects with their correct colors',
      category: 'Colors',
      difficulty: 'Easy',
      reward: 'Color Expert Badge',
      requiredToComplete: 8,
    },
    {
      id: '4',
      title: 'Shape Sorting',
      description: 'Identify and sort basic shapes',
      category: 'Shapes',
      difficulty: 'Medium',
      reward: 'Shape Sorter Badge',
      requiredToComplete: 6,
    },
    {
      id: '5',
      title: 'Animal Sounds',
      description: 'Match animals with their correct sounds',
      category: 'Animals',
      difficulty: 'Easy',
      reward: 'Animal Friend Badge',
      requiredToComplete: 8,
    },
    {
      id: '6',
      title: 'Simple Phonics',
      description: 'Identify beginning sounds of words',
      category: 'Phonics',
      difficulty: 'Medium',
      reward: 'Word Builder Badge',
      requiredToComplete: 12,
    },
    {
      id: '7',
      title: 'Opposites',
      description: 'Match opposite concepts',
      category: 'Concepts',
      difficulty: 'Medium',
      reward: 'Concept Master Badge',
      requiredToComplete: 6,
    },
    {
      id: '8',
      title: 'Size Comparison',
      description: 'Compare objects by size (big/small)',
      category: 'Concepts',
      difficulty: 'Easy',
      reward: 'Size Expert Badge',
      requiredToComplete: 6,
    },
    {
      id: '9',
      title: 'Body Parts',
      description: 'Identify basic body parts',
      category: 'Body',
      difficulty: 'Easy',
      reward: 'Body Expert Badge',
      requiredToComplete: 8,
    },
    {
      id: '10',
      title: 'Emotions',
      description: 'Recognize different facial expressions',
      category: 'Emotions',
      difficulty: 'Medium',
      reward: 'Emotion Expert Badge',
      requiredToComplete: 6,
    },
    {
      id: '11',
      title: 'Rhyming Words',
      description: 'Match words that rhyme',
      category: 'Phonics',
      difficulty: 'Hard',
      reward: 'Rhyme Master Badge',
      requiredToComplete: 8,
    },
    {
      id: '12',
      title: 'Weather Concepts',
      description: 'Match weather types to appropriate clothing',
      category: 'Weather',
      difficulty: 'Medium',
      reward: 'Weather Watcher Badge',
      requiredToComplete: 5,
    },
  ];

  // Predefined achievements
  const allAchievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first challenge',
      icon: 'star',
      iconColor: '#FFD700',
      backgroundColor: '#FEF3C7',
      iconBackground: '#FBBF24',
      requirement: (completed) => completed.length >= 1,
    },
    {
      id: '2',
      title: 'Explorer',
      description: 'Complete 5 different challenges',
      icon: 'compass',
      iconColor: '#3B82F6',
      backgroundColor: '#DBEAFE',
      iconBackground: '#60A5FA',
      requirement: (completed) => completed.length >= 5,
    },
    {
      id: '3',
      title: 'Master Learner',
      description: 'Complete 10 different challenges',
      icon: 'graduation-cap',
      iconColor: '#8B5CF6',
      backgroundColor: '#EDE9FE',
      iconBackground: '#A78BFA',
      requirement: (completed) => completed.length >= 10,
    },
    {
      id: '4',
      title: 'Alphabet Ace',
      description: 'Complete all alphabet challenges',
      icon: 'font',
      iconColor: '#EF4444',
      backgroundColor: '#FEE2E2',
      iconBackground: '#F87171',
      requirement: (completed) => 
        completed.filter(c => 
          allChallenges.find(ac => ac.id === c.challengeId)?.category === 'Alphabet'
        ).length >= allChallenges.filter(c => c.category === 'Alphabet').length,
    },
    {
      id: '5',
      title: 'Number Genius',
      description: 'Complete all number challenges',
      icon: 'sort-numeric-up',
      iconColor: '#10B981',
      backgroundColor: '#D1FAE5',
      iconBackground: '#34D399',
      requirement: (completed) => 
        completed.filter(c => 
          allChallenges.find(ac => ac.id === c.challengeId)?.category === 'Numbers'
        ).length >= allChallenges.filter(c => c.category === 'Numbers').length,
    },
    {
      id: '6',
      title: 'Dedicated Learner',
      description: 'Complete challenges 5 days in a row',
      icon: 'calendar-check',
      iconColor: '#F59E0B',
      backgroundColor: '#FEF3C7',
      iconBackground: '#FBBF24',
      requirement: (completed) => {
        // Check for 5 consecutive days
        const dates = completed.map(c => new Date(c.completedAt).toDateString());
        const uniqueDates = [...new Set(dates)].sort();
        let maxStreak = 0;
        let currentStreak = 1;
        
        for (let i = 1; i < uniqueDates.length; i++) {
          const prev = new Date(uniqueDates[i-1]);
          const curr = new Date(uniqueDates[i]);
          const diffDays = Math.floor((curr - prev) / (24 * 60 * 60 * 1000));
          
          if (diffDays === 1) {
            currentStreak++;
          } else {
            maxStreak = Math.max(maxStreak, currentStreak);
            currentStreak = 1;
          }
        }
        
        maxStreak = Math.max(maxStreak, currentStreak);
        return maxStreak >= 5;
      },
    },
  ];

  useEffect(() => {
    // Load completed challenges from storage
    const loadData = async () => {
      try {
        const storedChallenges = await AsyncStorage.getItem('completedChallenges');
        if (storedChallenges) {
          setCompletedChallenges(JSON.parse(storedChallenges));
        }
      } catch (error) {
        console.log('Error loading challenge data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Update achievements whenever completed challenges change
    if (!isLoading) {
      const earnedAchievements = allAchievements.filter(achievement => 
        achievement.requirement(completedChallenges)
      );
      setAchievements(earnedAchievements);
      
      // Save to AsyncStorage
      AsyncStorage.setItem('completedChallenges', JSON.stringify(completedChallenges))
        .catch(error => console.log('Error saving challenge data:', error));
    }
  }, [completedChallenges, isLoading]);

  // Complete a challenge
  const completeChallenge = async (challengeId, score = 100) => {
    const challenge = allChallenges.find(c => c.id === challengeId);
    if (!challenge) return false;

    // Check if already completed with max score
    const existingCompletion = completedChallenges.find(c => 
      c.challengeId === challengeId && c.score === 100
    );
    
    if (existingCompletion) return true;
    
    // Add to completed challenges
    const newCompletion = {
      challengeId,
      completedAt: new Date().toISOString(),
      score
    };
    
    setCompletedChallenges(prev => [...prev, newCompletion]);
    return true;
  };

  // Get all challenges with completion status
  const getChallengesWithStatus = () => {
    return allChallenges.map(challenge => {
      const completions = completedChallenges.filter(c => c.challengeId === challenge.id);
      const bestScore = completions.length > 0 
        ? Math.max(...completions.map(c => c.score)) 
        : 0;
      
      return {
        ...challenge,
        completed: completions.length > 0,
        bestScore,
        completions: completions.length,
      };
    });
  };

  // Get specific challenge by ID
  const getChallengeById = (challengeId) => {
    const challenge = allChallenges.find(c => c.id === challengeId);
    if (!challenge) return null;
    
    const completions = completedChallenges.filter(c => c.challengeId === challengeId);
    const bestScore = completions.length > 0 
      ? Math.max(...completions.map(c => c.score)) 
      : 0;
    
    return {
      ...challenge,
      completed: completions.length > 0,
      bestScore,
      completions: completions.length,
    };
  };

  // Reset all challenge progress (for testing)
  const resetAllProgress = async () => {
    try {
      await AsyncStorage.removeItem('completedChallenges');
      setCompletedChallenges([]);
      setAchievements([]);
      return true;
    } catch (error) {
      console.log('Error resetting challenge progress:', error);
      return false;
    }
  };

  const contextValue = {
    isLoading,
    completedChallenges,
    achievements,
    allChallenges,
    getChallengesWithStatus,
    getChallengeById,
    completeChallenge,
    resetAllProgress,
  };

  return (
    <ChallengeContext.Provider value={contextValue}>
      {children}
    </ChallengeContext.Provider>
  );
};

// Custom hook to use the challenge context
export const useChallenges = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallenges must be used within a ChallengeProvider');
  }
  return context;
};

export default ChallengeContext; 