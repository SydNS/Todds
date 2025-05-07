import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import GameEngine from '../GameEngine';

const LETTERS = [
  { id: '1', upper: 'A', lower: 'a' },
  { id: '2', upper: 'B', lower: 'b' },
  { id: '3', upper: 'C', lower: 'c' },
  { id: '4', upper: 'D', lower: 'd' },
  { id: '5', upper: 'E', lower: 'e' },
  { id: '6', upper: 'F', lower: 'f' },
];

const LetterMatchingGame = ({ navigation, route }) => {
  // Get challengeId from route params if available
  const challengeId = route?.params?.challengeId;
  
  const [selectedUppercase, setSelectedUppercase] = useState(null);
  const [selectedLowercase, setSelectedLowercase] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [shuffledUppercase, setShuffledUppercase] = useState([]);
  const [shuffledLowercase, setShuffledLowercase] = useState([]);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  // Initialize the game
  useEffect(() => {
    resetGame();
  }, []);

  // Check if the game is complete
  useEffect(() => {
    if (matchedPairs.length === LETTERS.length) {
      // All pairs matched
      setIsComplete(true);
    }
  }, [matchedPairs]);

  // Check if selected letters match
  useEffect(() => {
    if (selectedUppercase && selectedLowercase) {
      const uppercaseItem = LETTERS.find(l => l.id === selectedUppercase);
      const lowercaseItem = LETTERS.find(l => l.id === selectedLowercase);
      
      if (uppercaseItem && lowercaseItem && uppercaseItem.id === lowercaseItem.id) {
        // Match found
        setTimeout(() => {
          setMatchedPairs(prev => [...prev, uppercaseItem.id]);
          setScore(prev => prev + 100);
          
          // Reset selections
          setSelectedUppercase(null);
          setSelectedLowercase(null);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setSelectedUppercase(null);
          setSelectedLowercase(null);
          setWrongAttempts(prev => prev + 1);
        }, 1000);
      }
    }
  }, [selectedUppercase, selectedLowercase]);

  // Reset/initialize the game
  const resetGame = () => {
    setSelectedUppercase(null);
    setSelectedLowercase(null);
    setMatchedPairs([]);
    setScore(0);
    setIsComplete(false);
    setWrongAttempts(0);
    
    // Shuffle the letters
    const shuffledUpper = [...LETTERS].sort(() => Math.random() - 0.5);
    const shuffledLower = [...LETTERS].sort(() => Math.random() - 0.5);
    
    setShuffledUppercase(shuffledUpper);
    setShuffledLowercase(shuffledLower);
  };

  // Handle letter selection
  const handleLetterPress = (id, type) => {
    if (type === 'upper' && !selectedUppercase) {
      setSelectedUppercase(id);
    } else if (type === 'lower' && !selectedLowercase) {
      setSelectedLowercase(id);
    }
  };

  // Check if a letter is matched, selected, or available
  const getLetterState = (id, type) => {
    if (matchedPairs.includes(id)) return 'matched';
    if ((type === 'upper' && selectedUppercase === id) || 
        (type === 'lower' && selectedLowercase === id)) {
      return 'selected';
    }
    return 'normal';
  };

  // Render a letter card
  const renderLetterCard = (item, type) => {
    const state = getLetterState(item.id, type);
    const isDisabled = state === 'matched';
    const letter = type === 'upper' ? item.upper : item.lower;
    
    return (
      <Animatable.View 
        animation={state === 'matched' ? 'bounceOut' : 'bounceIn'}
        duration={state === 'matched' ? 800 : 500}
        delay={parseInt(item.id) * 100}
      >
        <TouchableOpacity
          style={[
            styles.letterCard, 
            state === 'matched' && styles.letterMatched,
            state === 'selected' && styles.letterSelected
          ]}
          onPress={() => handleLetterPress(item.id, type)}
          disabled={isDisabled}
        >
          <Text style={styles.letterText}>{letter}</Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  return (
    <GameEngine
      title="Letter Matching"
      gameId="letter-matching"
      challengeId={challengeId}
      difficulty="Easy"
      isComplete={isComplete}
      onClose={() => navigation.goBack()}
      score={score}
      maxScore={1000}
      showTimer={true}
      timerSeconds={120}
      instructions="Match uppercase letters with their lowercase pairs. Select one letter from each side to find matches!"
    >
      <View style={styles.gameContainer}>
        <View style={styles.gameHeader}>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Score:</Text>
            <Text style={styles.scoreValue}>{score}</Text>
          </View>
          
          <View style={styles.attemptsContainer}>
            <Text style={styles.attemptsLabel}>Attempts:</Text>
            <Text style={styles.attemptsValue}>{wrongAttempts}</Text>
          </View>
        </View>
        
        <View style={styles.gameBoard}>
          {/* Uppercase Letters */}
          <View style={styles.lettersColumn}>
            <Text style={styles.columnTitle}>UPPERCASE</Text>
            <FlatList
              data={shuffledUppercase}
              keyExtractor={(item) => `upper-${item.id}`}
              renderItem={({ item }) => renderLetterCard(item, 'upper')}
              scrollEnabled={false}
              contentContainerStyle={styles.lettersList}
            />
          </View>
          
          {/* Connection Lines for matched pairs */}
          <View style={styles.connectionContainer}>
            {matchedPairs.map((id) => {
              const upperItem = shuffledUppercase.findIndex(item => item.id === id);
              const lowerItem = shuffledLowercase.findIndex(item => item.id === id);
              
              // Only draw lines if we have valid indices
              if (upperItem !== -1 && lowerItem !== -1) {
                return (
                  <Animatable.View 
                    key={`line-${id}`}
                    animation="fadeIn"
                    duration={500}
                    style={[
                      styles.connectionLine,
                      {
                        top: 40 + upperItem * 80 + 30,
                        height: 2,
                      }
                    ]}
                  />
                );
              }
              return null;
            })}
          </View>
          
          {/* Lowercase Letters */}
          <View style={styles.lettersColumn}>
            <Text style={styles.columnTitle}>lowercase</Text>
            <FlatList
              data={shuffledLowercase}
              keyExtractor={(item) => `lower-${item.id}`}
              renderItem={({ item }) => renderLetterCard(item, 'lower')}
              scrollEnabled={false}
              contentContainerStyle={styles.lettersList}
            />
          </View>
        </View>
        
        {/* Feedback Section */}
        <View style={styles.feedbackContainer}>
          {selectedUppercase && selectedLowercase ? (
            <Text style={styles.feedbackText}>Checking match...</Text>
          ) : selectedUppercase ? (
            <Text style={styles.feedbackText}>Now select a lowercase letter</Text>
          ) : selectedLowercase ? (
            <Text style={styles.feedbackText}>Now select an uppercase letter</Text>
          ) : (
            <Text style={styles.feedbackText}>Select a letter to begin</Text>
          )}
        </View>
      </View>
    </GameEngine>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    padding: SIZES.spacing.m,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.spacing.m,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginRight: 4,
  },
  scoreValue: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  attemptsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attemptsLabel: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginRight: 4,
  },
  attemptsValue: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.error,
  },
  gameBoard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  lettersColumn: {
    width: '45%',
  },
  columnTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SIZES.spacing.m,
    color: COLORS.text,
  },
  lettersList: {
    alignItems: 'center',
  },
  letterCard: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.spacing.m,
    ...SHADOWS.medium,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  letterSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '20', // 20% opacity
  },
  letterMatched: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.success + '20', // 20% opacity
    opacity: 0.5,
  },
  letterText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  connectionContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  connectionLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: COLORS.success,
  },
  feedbackContainer: {
    padding: SIZES.spacing.m,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
});

export default LetterMatchingGame; 