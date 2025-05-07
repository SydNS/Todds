import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import GameEngine from '../GameEngine';

const { width: screenWidth } = Dimensions.get('window');

// Jungle background
const JUNGLE_BACKGROUND = 'https://img.freepik.com/free-vector/cute-wild-animals-nature-scene_1308-52250.jpg';

// Hidden letter data with positions
const HIDDEN_LETTERS = [
  { id: '1', letter: 'A', hint: 'Look at the tree top', x: 0.15, y: 0.25 },
  { id: '2', letter: 'B', hint: 'Near the bushes', x: 0.7, y: 0.6 },
  { id: '3', letter: 'C', hint: 'Hidden in the clouds', x: 0.4, y: 0.15 },
  { id: '4', letter: 'D', hint: 'By the water', x: 0.2, y: 0.7 },
  { id: '5', letter: 'E', hint: 'Look by the elephant', x: 0.85, y: 0.4 },
  { id: '6', letter: 'F', hint: 'In the flowers', x: 0.6, y: 0.8 },
];

const AlphabetSafariGame = ({ navigation, route }) => {
  // Get challengeId from route params if available
  const challengeId = route?.params?.challengeId;
  
  const [foundLetters, setFoundLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [hintUsed, setHintUsed] = useState(false);
  const [hintCooldown, setHintCooldown] = useState(false);
  const [letterAnimation, setLetterAnimation] = useState({});

  // Check if game is complete
  useEffect(() => {
    if (foundLetters.length === HIDDEN_LETTERS.length) {
      setIsComplete(true);
    }
  }, [foundLetters]);

  // Handle tap on the background
  const handleBackgroundTap = (x, y) => {
    // Convert absolute coordinates to relative (0-1)
    const relativeX = x / screenWidth;
    const relativeY = y / (screenWidth * 1.5); // Assuming aspect ratio of background
    
    // Check if tapped near any hidden letter
    HIDDEN_LETTERS.forEach(item => {
      // Skip already found letters
      if (foundLetters.includes(item.id)) return;
      
      // Check distance from letter center point (15% tolerance)
      const distance = Math.sqrt(
        Math.pow(relativeX - item.x, 2) + 
        Math.pow(relativeY - item.y, 2)
      );
      
      if (distance < 0.15) {
        // Found a letter!
        handleLetterFound(item);
      }
    });
  };

  // Handle letter found
  const handleLetterFound = (letterItem) => {
    // Set animation for this letter
    setLetterAnimation({
      id: letterItem.id,
      isActive: true
    });
    
    // Add points based on whether hint was used
    const pointsToAdd = hintUsed ? 50 : 100;
    setScore(score + pointsToAdd);
    
    // Add to found letters after animation
    setTimeout(() => {
      setFoundLetters([...foundLetters, letterItem.id]);
      setLetterAnimation({ isActive: false });
      
      // Reset hint state
      setCurrentHint('');
      setHintUsed(false);
    }, 1000);
  };

  // Handle hint request
  const handleHintRequest = () => {
    if (hintCooldown || isComplete) return;
    
    // Find a letter that hasn't been found yet
    const remainingLetters = HIDDEN_LETTERS.filter(item => !foundLetters.includes(item.id));
    
    if (remainingLetters.length > 0) {
      const randomLetter = remainingLetters[Math.floor(Math.random() * remainingLetters.length)];
      setCurrentHint(randomLetter.hint);
      setHintUsed(true);
      
      // Set cooldown
      setHintCooldown(true);
      setTimeout(() => {
        setHintCooldown(false);
      }, 5000); // 5 second cooldown
    }
  };

  // Render hidden letters (only visible once found)
  const renderHiddenLetters = () => {
    return HIDDEN_LETTERS.map(item => {
      const isFound = foundLetters.includes(item.id);
      const isAnimating = letterAnimation.id === item.id && letterAnimation.isActive;
      
      if (!isFound && !isAnimating) return null;
      
      return (
        <Animatable.View
          key={item.id}
          animation={isAnimating ? 'bounceIn' : isFound ? 'pulse' : undefined}
          duration={isAnimating ? 1000 : 1500}
          iterationCount={isFound ? 'infinite' : 1}
          style={[
            styles.hiddenLetter,
            {
              left: `${item.x * 100}%`,
              top: `${item.y * 100}%`,
            }
          ]}
        >
          <Text style={styles.letterText}>{item.letter}</Text>
        </Animatable.View>
      );
    });
  };

  return (
    <GameEngine
      title="Alphabet Safari"
      gameId="alphabet-safari"
      challengeId={challengeId}
      difficulty="Easy"
      isComplete={isComplete}
      onClose={() => navigation.goBack()}
      score={score}
      maxScore={HIDDEN_LETTERS.length * 100}
      showTimer={true}
      timerSeconds={180}
      instructions="Find all the hidden letters in the jungle scene! Tap areas where you think letters might be hiding. Use hints if you get stuck!"
    >
      <View style={styles.gameContainer}>
        <View style={styles.gameHeader}>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Found: {foundLetters.length}/{HIDDEN_LETTERS.length}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(foundLetters.length / HIDDEN_LETTERS.length) * 100}%` }
                ]}
              />
            </View>
          </View>
          
          <TouchableOpacity
            style={[
              styles.hintButton,
              hintCooldown && styles.hintButtonDisabled
            ]}
            onPress={handleHintRequest}
            disabled={hintCooldown || isComplete}
          >
            <FontAwesome5 name="lightbulb" size={16} color="#FFF" />
            <Text style={styles.hintButtonText}>Hint</Text>
          </TouchableOpacity>
        </View>
        
        {currentHint ? (
          <Animatable.View 
            animation="fadeIn"
            duration={500}
            style={styles.hintContainer}
          >
            <Text style={styles.hintText}>{currentHint}</Text>
          </Animatable.View>
        ) : null}
        
        <View style={styles.gameScene}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.gameBackground}
            onPress={(e) => {
              const { locationX, locationY } = e.nativeEvent;
              handleBackgroundTap(locationX, locationY);
            }}
          >
            <Image
              source={{ uri: JUNGLE_BACKGROUND }}
              style={styles.backgroundImage}
              resizeMode="cover"
            />
            
            {/* Render found or currently finding letters */}
            {renderHiddenLetters()}
            
            {/* Collection Display */}
            <View style={styles.collectionContainer}>
              {HIDDEN_LETTERS.map(item => (
                <View 
                  key={`collect-${item.id}`}
                  style={[
                    styles.collectionItem,
                    foundLetters.includes(item.id) ? styles.collectionItemFound : {}
                  ]}
                >
                  <Text style={styles.collectionText}>
                    {foundLetters.includes(item.id) ? item.letter : '?'}
                  </Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
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
    alignItems: 'center',
    marginBottom: SIZES.spacing.m,
  },
  progressContainer: {
    flex: 1,
    marginRight: SIZES.spacing.m,
  },
  progressText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accent1,
    borderRadius: 4,
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent2,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    ...SHADOWS.small,
  },
  hintButtonDisabled: {
    backgroundColor: COLORS.textLight,
    opacity: 0.7,
  },
  hintButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 5,
  },
  hintContainer: {
    backgroundColor: 'rgba(255, 228, 132, 0.9)',
    padding: SIZES.spacing.m,
    borderRadius: SIZES.cardRadius,
    marginBottom: SIZES.spacing.m,
    ...SHADOWS.small,
  },
  hintText: {
    fontSize: SIZES.medium,
    color: '#C26401',
    fontWeight: '600',
    textAlign: 'center',
  },
  gameScene: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: SIZES.cardRadius,
    ...SHADOWS.medium,
  },
  gameBackground: {
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  hiddenLetter: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.accent1,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
    transform: [{ translateX: -20 }, { translateY: -20 }], // Center the circle on coordinates
  },
  letterText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  collectionContainer: {
    position: 'absolute',
    bottom: SIZES.spacing.m,
    left: SIZES.spacing.m,
    right: SIZES.spacing.m,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: SIZES.spacing.s,
    borderRadius: SIZES.cardRadius,
    justifyContent: 'space-around',
    ...SHADOWS.medium,
  },
  collectionItem: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionItemFound: {
    backgroundColor: COLORS.accent1,
  },
  collectionText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});

export default AlphabetSafariGame; 