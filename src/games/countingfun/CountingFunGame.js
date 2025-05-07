import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import GameEngine from '../GameEngine';

const { width } = Dimensions.get('window');

// Define counting levels
const LEVELS = [
  {
    id: '1',
    number: 1,
    objects: [
      { id: '1-1', image: 'https://img.freepik.com/free-vector/cute-apple-cartoon_1308-115477.jpg' }
    ],
    backgroundColor: '#FF8A65',
  },
  {
    id: '2',
    number: 2,
    objects: [
      { id: '2-1', image: 'https://img.freepik.com/free-vector/cute-star-cartoon_1308-134171.jpg' },
      { id: '2-2', image: 'https://img.freepik.com/free-vector/cute-star-cartoon_1308-134171.jpg' }
    ],
    backgroundColor: '#42A5F5',
  },
  {
    id: '3',
    number: 3,
    objects: [
      { id: '3-1', image: 'https://img.freepik.com/free-vector/cute-butterfly-cartoon_1308-133147.jpg' },
      { id: '3-2', image: 'https://img.freepik.com/free-vector/cute-butterfly-cartoon_1308-133147.jpg' },
      { id: '3-3', image: 'https://img.freepik.com/free-vector/cute-butterfly-cartoon_1308-133147.jpg' }
    ],
    backgroundColor: '#66BB6A',
  },
  {
    id: '4',
    number: 4,
    objects: [
      { id: '4-1', image: 'https://img.freepik.com/free-vector/cute-flower-cartoon_1308-134130.jpg' },
      { id: '4-2', image: 'https://img.freepik.com/free-vector/cute-flower-cartoon_1308-134130.jpg' },
      { id: '4-3', image: 'https://img.freepik.com/free-vector/cute-flower-cartoon_1308-134130.jpg' },
      { id: '4-4', image: 'https://img.freepik.com/free-vector/cute-flower-cartoon_1308-134130.jpg' }
    ],
    backgroundColor: '#9575CD',
  },
  {
    id: '5',
    number: 5,
    objects: [
      { id: '5-1', image: 'https://img.freepik.com/free-vector/cute-balloon-cartoon_1308-133205.jpg' },
      { id: '5-2', image: 'https://img.freepik.com/free-vector/cute-balloon-cartoon_1308-133205.jpg' },
      { id: '5-3', image: 'https://img.freepik.com/free-vector/cute-balloon-cartoon_1308-133205.jpg' },
      { id: '5-4', image: 'https://img.freepik.com/free-vector/cute-balloon-cartoon_1308-133205.jpg' },
      { id: '5-5', image: 'https://img.freepik.com/free-vector/cute-balloon-cartoon_1308-133205.jpg' }
    ],
    backgroundColor: '#EC407A',
  },
  {
    id: '6',
    number: 6,
    objects: [
      { id: '6-1', image: 'https://img.freepik.com/free-vector/cute-ice-cream-cartoon_1308-134096.jpg' },
      { id: '6-2', image: 'https://img.freepik.com/free-vector/cute-ice-cream-cartoon_1308-134096.jpg' },
      { id: '6-3', image: 'https://img.freepik.com/free-vector/cute-ice-cream-cartoon_1308-134096.jpg' },
      { id: '6-4', image: 'https://img.freepik.com/free-vector/cute-ice-cream-cartoon_1308-134096.jpg' },
      { id: '6-5', image: 'https://img.freepik.com/free-vector/cute-ice-cream-cartoon_1308-134096.jpg' },
      { id: '6-6', image: 'https://img.freepik.com/free-vector/cute-ice-cream-cartoon_1308-134096.jpg' }
    ],
    backgroundColor: '#FFCA28',
  },
  {
    id: '7',
    number: 7,
    objects: [
      { id: '7-1', image: 'https://img.freepik.com/free-vector/cute-pencil-cartoon_1308-134066.jpg' },
      { id: '7-2', image: 'https://img.freepik.com/free-vector/cute-pencil-cartoon_1308-134066.jpg' },
      { id: '7-3', image: 'https://img.freepik.com/free-vector/cute-pencil-cartoon_1308-134066.jpg' },
      { id: '7-4', image: 'https://img.freepik.com/free-vector/cute-pencil-cartoon_1308-134066.jpg' },
      { id: '7-5', image: 'https://img.freepik.com/free-vector/cute-pencil-cartoon_1308-134066.jpg' },
      { id: '7-6', image: 'https://img.freepik.com/free-vector/cute-pencil-cartoon_1308-134066.jpg' },
      { id: '7-7', image: 'https://img.freepik.com/free-vector/cute-pencil-cartoon_1308-134066.jpg' }
    ],
    backgroundColor: '#EF5350',
  },
  {
    id: '8',
    number: 8,
    objects: [
      { id: '8-1', image: 'https://img.freepik.com/free-vector/cute-cupcake-cartoon_1308-134101.jpg' },
      { id: '8-2', image: 'https://img.freepik.com/free-vector/cute-cupcake-cartoon_1308-134101.jpg' },
      { id: '8-3', image: 'https://img.freepik.com/free-vector/cute-cupcake-cartoon_1308-134101.jpg' },
      { id: '8-4', image: 'https://img.freepik.com/free-vector/cute-cupcake-cartoon_1308-134101.jpg' },
      { id: '8-5', image: 'https://img.freepik.com/free-vector/cute-cupcake-cartoon_1308-134101.jpg' },
      { id: '8-6', image: 'https://img.freepik.com/free-vector/cute-cupcake-cartoon_1308-134101.jpg' },
      { id: '8-7', image: 'https://img.freepik.com/free-vector/cute-cupcake-cartoon_1308-134101.jpg' },
      { id: '8-8', image: 'https://img.freepik.com/free-vector/cute-cupcake-cartoon_1308-134101.jpg' }
    ],
    backgroundColor: '#26A69A',
  },
  {
    id: '9',
    number: 9,
    objects: [
      { id: '9-1', image: 'https://img.freepik.com/free-vector/cute-robot-cartoon_1308-133996.jpg' },
      { id: '9-2', image: 'https://img.freepik.com/free-vector/cute-robot-cartoon_1308-133996.jpg' },
      { id: '9-3', image: 'https://img.freepik.com/free-vector/cute-robot-cartoon_1308-133996.jpg' },
      { id: '9-4', image: 'https://img.freepik.com/free-vector/cute-robot-cartoon_1308-133996.jpg' },
      { id: '9-5', image: 'https://img.freepik.com/free-vector/cute-robot-cartoon_1308-133996.jpg' },
      { id: '9-6', image: 'https://img.freepik.com/free-vector/cute-robot-cartoon_1308-133996.jpg' },
      { id: '9-7', image: 'https://img.freepik.com/free-vector/cute-robot-cartoon_1308-133996.jpg' },
      { id: '9-8', image: 'https://img.freepik.com/free-vector/cute-robot-cartoon_1308-133996.jpg' },
      { id: '9-9', image: 'https://img.freepik.com/free-vector/cute-robot-cartoon_1308-133996.jpg' }
    ],
    backgroundColor: '#FFA726',
  },
  {
    id: '10',
    number: 10,
    objects: [
      { id: '10-1', image: 'https://img.freepik.com/free-vector/cute-car-cartoon_1308-133988.jpg' },
      { id: '10-2', image: 'https://img.freepik.com/free-vector/cute-car-cartoon_1308-133988.jpg' },
      { id: '10-3', image: 'https://img.freepik.com/free-vector/cute-car-cartoon_1308-133988.jpg' },
      { id: '10-4', image: 'https://img.freepik.com/free-vector/cute-car-cartoon_1308-133988.jpg' },
      { id: '10-5', image: 'https://img.freepik.com/free-vector/cute-car-cartoon_1308-133988.jpg' },
      { id: '10-6', image: 'https://img.freepik.com/free-vector/cute-car-cartoon_1308-133988.jpg' },
      { id: '10-7', image: 'https://img.freepik.com/free-vector/cute-car-cartoon_1308-133988.jpg' },
      { id: '10-8', image: 'https://img.freepik.com/free-vector/cute-car-cartoon_1308-133988.jpg' },
      { id: '10-9', image: 'https://img.freepik.com/free-vector/cute-car-cartoon_1308-133988.jpg' },
      { id: '10-10', image: 'https://img.freepik.com/free-vector/cute-car-cartoon_1308-133988.jpg' }
    ],
    backgroundColor: '#7986CB',
  },
];

const CountingFunGame = ({ navigation, route }) => {
  // Get challengeId from route params if available
  const challengeId = route?.params?.challengeId;
  
  const [currentLevel, setCurrentLevel] = useState(0);
  const [countedObjects, setCountedObjects] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  
  const numberScale = useRef(new Animated.Value(1)).current;
  const celebrationRef = useRef(null);
  
  // Initialize game on mount
  useEffect(() => {
    resetCounting();
  }, [currentLevel]);
  
  // Check if level is complete (all objects counted)
  useEffect(() => {
    const level = LEVELS[currentLevel];
    if (countedObjects.length === level.objects.length) {
      handleLevelComplete();
    }
  }, [countedObjects, currentLevel]);
  
  // Check if game is complete (all levels finished)
  useEffect(() => {
    if (currentLevel >= LEVELS.length) {
      setIsComplete(true);
    }
  }, [currentLevel]);
  
  // Reset counting state for current level
  const resetCounting = () => {
    setCountedObjects([]);
    setShowCelebration(false);
  };
  
  // Handle object press - count the object
  const handleObjectPress = (objectId) => {
    if (countedObjects.includes(objectId)) return;
    
    // Add object to counted list
    setCountedObjects(prev => [...prev, objectId]);
    
    // Animate the number
    Animated.sequence([
      Animated.timing(numberScale, {
        toValue: 1.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(numberScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Handle level completion
  const handleLevelComplete = () => {
    // Show celebration animation
    setShowCelebration(true);
    
    // Add points to score
    setScore(prev => prev + (currentLevel + 1) * 20);
    
    // Move to next level after delay
    setTimeout(() => {
      setCurrentLevel(prev => prev + 1);
    }, 2000);
  };
  
  // Render an object that can be tapped to count
  const renderObject = (object, index) => {
    const isCounted = countedObjects.includes(object.id);
    
    return (
      <TouchableOpacity
        key={object.id}
        style={[
          styles.object,
          isCounted && styles.countedObject
        ]}
        onPress={() => handleObjectPress(object.id)}
        disabled={isCounted}
        activeOpacity={0.8}
      >
        <Animatable.View
          animation={isCounted ? 'bounce' : undefined}
          duration={800}
        >
          <Image
            source={{ uri: object.image }}
            style={styles.objectImage}
            resizeMode="contain"
          />
          {isCounted && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{countedObjects.indexOf(object.id) + 1}</Text>
            </View>
          )}
        </Animatable.View>
      </TouchableOpacity>
    );
  };
  
  // Render the current level
  const renderLevel = () => {
    if (currentLevel >= LEVELS.length) {
      return (
        <View style={styles.completionContainer}>
          <Animatable.View
            animation="bounceIn"
            duration={1000}
          >
            <FontAwesome5 name="trophy" size={80} color={COLORS.accent1} />
          </Animatable.View>
          <Text style={styles.completionTitle}>Great Job!</Text>
          <Text style={styles.completionText}>You've learned to count to 10!</Text>
        </View>
      );
    }
    
    const level = LEVELS[currentLevel];
    
    return (
      <View style={styles.levelContainer}>
        {/* Level Header */}
        <View style={[styles.levelHeader, { backgroundColor: level.backgroundColor }]}>
          <Text style={styles.levelTitle}>Count to {level.number}</Text>
          <Animated.Text 
            style={[
              styles.currentCount, 
              { transform: [{ scale: numberScale }] }
            ]}
          >
            {countedObjects.length}
          </Animated.Text>
        </View>
        
        {/* Objects Grid */}
        <View style={styles.objectsGrid}>
          {level.objects.map((object, index) => renderObject(object, index))}
        </View>
        
        {/* Level Complete Celebration */}
        {showCelebration && (
          <Animatable.View
            ref={celebrationRef}
            animation="bounceIn"
            duration={800}
            style={styles.celebrationOverlay}
          >
            <View style={styles.celebrationContent}>
              <Animatable.Text 
                animation="pulse" 
                iterationCount="infinite" 
                duration={1000}
                style={styles.celebrationText}
              >
                Great job! You counted to {level.number}!
              </Animatable.Text>
              <FontAwesome5 name="star" size={50} color="#FFD700" />
            </View>
          </Animatable.View>
        )}
      </View>
    );
  };
  
  return (
    <GameEngine
      title="Counting Fun"
      gameId="counting-fun"
      challengeId={challengeId}
      difficulty="Easy"
      isComplete={isComplete}
      onClose={() => navigation.goBack()}
      score={score}
      maxScore={LEVELS.length * 20 * 5} // Adjust max score based on levels
      showTimer={false}
      instructions="Touch each object one by one to count them! Start from 1 and count up to the target number."
    >
      <View style={styles.gameContainer}>
        {renderLevel()}
      </View>
    </GameEngine>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    padding: SIZES.spacing.m,
  },
  levelContainer: {
    flex: 1,
    position: 'relative',
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.spacing.m,
    borderRadius: SIZES.cardRadius,
    marginBottom: SIZES.spacing.m,
    ...SHADOWS.medium,
  },
  levelTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: '#FFF',
  },
  currentCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  objectsGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  object: {
    width: width * 0.25,
    height: width * 0.25,
    margin: SIZES.spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countedObject: {
    opacity: 0.8,
  },
  objectImage: {
    width: '100%',
    height: '100%',
  },
  countBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.accent1,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  countText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: '#FFF',
  },
  celebrationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  celebrationContent: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SIZES.spacing.l,
    borderRadius: SIZES.cardRadius,
    ...SHADOWS.large,
  },
  celebrationText: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.spacing.m,
    textAlign: 'center',
  },
  completionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completionTitle: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SIZES.spacing.l,
    marginBottom: SIZES.spacing.s,
  },
  completionText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});

export default CountingFunGame; 