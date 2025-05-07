import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import GameEngine from '../GameEngine';

const { width } = Dimensions.get('window');

// Define shapes data
const SHAPES = [
  {
    id: '1',
    name: 'Circle',
    color: '#FF5252',
    icon: 'circle',
  },
  {
    id: '2',
    name: 'Square',
    color: '#42A5F5',
    icon: 'square',
  },
  {
    id: '3',
    name: 'Triangle',
    color: '#66BB6A',
    icon: 'play',
  },
  {
    id: '4',
    name: 'Diamond',
    color: '#FFCA28',
    icon: 'diamond',
  },
];

// Define game levels with sequences
const LEVELS = [
  {
    id: '1',
    sequence: ['1', '2'], // Circle, Square
    speed: 1000,
  },
  {
    id: '2',
    sequence: ['1', '2', '3'], // Circle, Square, Triangle
    speed: 1000,
  },
  {
    id: '3',
    sequence: ['2', '1', '3', '2'], // Square, Circle, Triangle, Square
    speed: 900,
  },
  {
    id: '4',
    sequence: ['3', '2', '4', '1'], // Triangle, Square, Diamond, Circle
    speed: 900,
  },
  {
    id: '5',
    sequence: ['4', '2', '1', '3', '2'], // Diamond, Square, Circle, Triangle, Square
    speed: 800,
  },
  {
    id: '6',
    sequence: ['1', '4', '2', '3', '4', '1'], // Circle, Diamond, Square, Triangle, Diamond, Circle
    speed: 800,
  },
];

const RememberSequenceGame = ({ navigation, route }) => {
  // Get challengeId from route params if available
  const challengeId = route?.params?.challengeId;
  
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameState, setGameState] = useState('intro'); // intro, showing, input, success, fail
  const [currentSequence, setCurrentSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [activeShape, setActiveShape] = useState(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const shapeRefs = useRef({});
  const sequenceTimeout = useRef(null);
  
  // Initialize or reset level
  useEffect(() => {
    if (currentLevel < LEVELS.length) {
      resetLevel();
    } else {
      setIsComplete(true);
    }
    
    return () => {
      if (sequenceTimeout.current) {
        clearTimeout(sequenceTimeout.current);
      }
    };
  }, [currentLevel]);
  
  // Reset level state
  const resetLevel = () => {
    setGameState('intro');
    setCurrentSequence(LEVELS[currentLevel].sequence);
    setUserSequence([]);
    setActiveShape(null);
  };
  
  // Start showing sequence
  const startShowingSequence = () => {
    setGameState('showing');
    showNextInSequence(0);
  };
  
  // Recursively show each shape in the sequence
  const showNextInSequence = (index) => {
    if (index >= currentSequence.length) {
      // Finished showing sequence
      setTimeout(() => {
        setGameState('input');
        setActiveShape(null);
      }, 500);
      return;
    }
    
    const shapeId = currentSequence[index];
    setActiveShape(shapeId);
    
    // Animate the shape
    if (shapeRefs.current[shapeId]) {
      shapeRefs.current[shapeId].pulse(500);
    }
    
    // Schedule next shape
    sequenceTimeout.current = setTimeout(() => {
      setActiveShape(null);
      
      // Pause between shapes
      sequenceTimeout.current = setTimeout(() => {
        showNextInSequence(index + 1);
      }, 300);
    }, LEVELS[currentLevel].speed);
  };
  
  // Handle shape press during input phase
  const handleShapePress = (shapeId) => {
    if (gameState !== 'input') return;
    
    // Animate the pressed shape
    if (shapeRefs.current[shapeId]) {
      shapeRefs.current[shapeId].pulse(300);
    }
    
    // Add to user sequence
    const newUserSequence = [...userSequence, shapeId];
    setUserSequence(newUserSequence);
    
    // Check if user input matches the sequence so far
    const isCorrectSoFar = newUserSequence.every(
      (id, i) => id === currentSequence[i]
    );
    
    if (!isCorrectSoFar) {
      // Wrong input
      setGameState('fail');
      return;
    }
    
    // Check if the sequence is complete
    if (newUserSequence.length === currentSequence.length) {
      // Success
      setGameState('success');
      setScore(prevScore => prevScore + currentSequence.length * 20);
      
      // Move to next level after delay
      setTimeout(() => {
        setCurrentLevel(prevLevel => prevLevel + 1);
      }, 1500);
    }
  };
  
  // Retry current level
  const retryLevel = () => {
    resetLevel();
  };
  
  // Render a shape button
  const renderShape = (shape) => {
    const isActive = activeShape === shape.id;
    
    return (
      <Animatable.View
        key={shape.id}
        ref={ref => (shapeRefs.current[shape.id] = ref)}
        style={styles.shapeContainer}
      >
        <TouchableOpacity
          style={[
            styles.shape,
            { backgroundColor: shape.color },
            isActive && styles.activeShape
          ]}
          onPress={() => handleShapePress(shape.id)}
          disabled={gameState !== 'input'}
          activeOpacity={0.7}
        >
          <FontAwesome5 
            name={shape.icon} 
            size={40} 
            color="#FFF" 
            solid={shape.icon === 'play' ? false : true} 
          />
        </TouchableOpacity>
        <Text style={styles.shapeName}>{shape.name}</Text>
      </Animatable.View>
    );
  };
  
  // Render game content based on state
  const renderGameContent = () => {
    if (isComplete) {
      // Game completed
      return (
        <View style={styles.messageContainer}>
          <Animatable.View
            animation="bounceIn"
            duration={1000}
          >
            <FontAwesome5 name="trophy" size={80} color={COLORS.accent1} />
          </Animatable.View>
          <Text style={styles.messageTitle}>Congratulations!</Text>
          <Text style={styles.messageText}>
            You have a great memory! You completed all levels!
          </Text>
        </View>
      );
    }
    
    const level = LEVELS[currentLevel];
    
    switch (gameState) {
      case 'intro':
        // Level intro
        return (
          <View style={styles.messageContainer}>
            <Text style={styles.levelTitle}>Level {currentLevel + 1}</Text>
            <Text style={styles.messageText}>
              Watch the sequence of shapes carefully, then repeat it!
            </Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={startShowingSequence}
            >
              <Text style={styles.actionButtonText}>Start</Text>
              <FontAwesome5 name="play" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
        );
        
      case 'showing':
      case 'input':
        // Main game view - shapes grid and sequence progress
        return (
          <View style={styles.gameContent}>
            {/* Shapes Grid */}
            <View style={styles.shapesGrid}>
              {SHAPES.map(shape => renderShape(shape))}
            </View>
            
            {/* Sequence Progress */}
            <View style={styles.progressContainer}>
              <Text style={styles.progressTitle}>
                {gameState === 'showing' ? 'Watch Carefully' : 'Your Turn'}
              </Text>
              <View style={styles.progressDots}>
                {currentSequence.map((_, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.progressDot,
                      index < userSequence.length && styles.progressDotCompleted
                    ]} 
                  />
                ))}
              </View>
            </View>
          </View>
        );
        
      case 'success':
        // Success message
        return (
          <View style={styles.messageContainer}>
            <Animatable.View
              animation="bounceIn"
              duration={800}
            >
              <FontAwesome5 name="check-circle" size={60} color={COLORS.accent1} />
            </Animatable.View>
            <Text style={styles.messageTitle}>Great job!</Text>
            <Text style={styles.messageText}>
              You remembered the sequence perfectly!
            </Text>
          </View>
        );
        
      case 'fail':
        // Failure message
        return (
          <View style={styles.messageContainer}>
            <Animatable.View
              animation="shake"
              duration={800}
            >
              <FontAwesome5 name="times-circle" size={60} color={COLORS.accent4} />
            </Animatable.View>
            <Text style={styles.messageTitle}>Oops!</Text>
            <Text style={styles.messageText}>
              That wasn't quite right. Let's try again!
            </Text>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: COLORS.accent4 }]}
              onPress={retryLevel}
            >
              <Text style={styles.actionButtonText}>Try Again</Text>
              <FontAwesome5 name="redo" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
        );
    }
  };
  
  return (
    <GameEngine
      title="Remember Shapes"
      gameId="remember-shapes"
      challengeId={challengeId}
      difficulty="Medium"
      isComplete={isComplete}
      onClose={() => navigation.goBack()}
      score={score}
      maxScore={LEVELS.reduce((sum, level) => sum + level.sequence.length * 20, 0)}
      showTimer={false}
      instructions="Watch the sequence of shapes and then repeat it by tapping the same shapes in the same order."
    >
      <View style={styles.gameContainer}>
        {/* Level Info */}
        {!isComplete && (
          <View style={styles.levelInfo}>
            <Text style={styles.levelInfoText}>Level {currentLevel + 1} of {LEVELS.length}</Text>
            <View style={styles.levelProgress}>
              <View 
                style={[
                  styles.levelProgressFill,
                  { width: `${((currentLevel) / LEVELS.length) * 100}%` }
                ]}
              />
            </View>
          </View>
        )}
        
        {/* Game Content */}
        {renderGameContent()}
      </View>
    </GameEngine>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    padding: SIZES.spacing.m,
  },
  levelInfo: {
    marginBottom: SIZES.spacing.m,
  },
  levelInfoText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  levelProgress: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  levelProgressFill: {
    height: '100%',
    backgroundColor: COLORS.accent2,
    borderRadius: 3,
  },
  gameContent: {
    flex: 1,
    justifyContent: 'center',
  },
  shapesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: SIZES.spacing.l,
  },
  shapeContainer: {
    width: width * 0.4,
    alignItems: 'center',
    marginHorizontal: SIZES.spacing.s,
    marginVertical: SIZES.spacing.m,
  },
  shape: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: SIZES.cardRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.spacing.xs,
    ...SHADOWS.medium,
  },
  activeShape: {
    transform: [{ scale: 1.1 }],
    ...SHADOWS.large,
  },
  shapeName: {
    fontSize: SIZES.font,
    color: COLORS.text,
    marginTop: 4,
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: SIZES.spacing.l,
  },
  progressTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.spacing.s,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 4,
  },
  progressDotCompleted: {
    backgroundColor: COLORS.accent1,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.spacing.l,
  },
  messageTitle: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SIZES.spacing.m,
    marginBottom: SIZES.spacing.s,
  },
  messageText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SIZES.spacing.l,
  },
  levelTitle: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.accent2,
    marginBottom: SIZES.spacing.m,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent2,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: SIZES.spacing.m,
    ...SHADOWS.small,
  },
  actionButtonText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 8,
  },
});

export default RememberSequenceGame; 