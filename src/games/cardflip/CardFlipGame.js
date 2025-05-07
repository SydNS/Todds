import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
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
const CARD_SIZE = width * 0.18;
const CARD_MARGIN = 6;

// Define card data with images
const CARD_ITEMS = [
  {
    id: '1',
    name: 'Lion',
    image: 'https://img.freepik.com/free-vector/cute-lion-cartoon_1308-133310.jpg',
    backgroundColor: '#FFA726',
  },
  {
    id: '2',
    name: 'Elephant',
    image: 'https://img.freepik.com/free-vector/cute-elephant-cartoon_1308-133164.jpg',
    backgroundColor: '#42A5F5',
  },
  {
    id: '3',
    name: 'Dog',
    image: 'https://img.freepik.com/free-vector/cute-dog-cartoon_1308-133235.jpg',
    backgroundColor: '#EF5350',
  },
  {
    id: '4',
    name: 'Cat',
    image: 'https://img.freepik.com/free-vector/cute-cat-cartoon_1308-133244.jpg',
    backgroundColor: '#9575CD',
  },
  {
    id: '5',
    name: 'Horse',
    image: 'https://img.freepik.com/free-vector/cute-horse-cartoon_1308-115266.jpg',
    backgroundColor: '#66BB6A',
  },
  {
    id: '6',
    name: 'Pig',
    image: 'https://img.freepik.com/free-vector/cute-pig-cartoon_1308-133167.jpg',
    backgroundColor: '#EC407A',
  },
  {
    id: '7',
    name: 'Duck',
    image: 'https://img.freepik.com/free-vector/cute-duck-cartoon_1308-134132.jpg',
    backgroundColor: '#FFCA28',
  },
  {
    id: '8',
    name: 'Chicken',
    image: 'https://img.freepik.com/free-vector/cute-chicken-cartoon_1308-134086.jpg',
    backgroundColor: '#FF7043',
  },
];

const CardFlipGame = ({ navigation, route }) => {
  // Get challengeId from route params if available
  const challengeId = route?.params?.challengeId;
  
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const cardRefs = useRef({});
  
  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, []);
  
  // Check for game completion
  useEffect(() => {
    if (matchedPairs.length === CARD_ITEMS.length) {
      setTimeout(() => {
        setIsComplete(true);
      }, 1000);
    }
  }, [matchedPairs]);
  
  // Handle flipped cards
  useEffect(() => {
    if (flippedIndices.length === 2) {
      const firstCardId = cards[flippedIndices[0]].itemId;
      const secondCardId = cards[flippedIndices[1]].itemId;
      
      setIsProcessing(true);
      
      if (firstCardId === secondCardId) {
        // Match found
        setTimeout(() => {
          // Save matched pair
          setMatchedPairs(prev => [...prev, firstCardId]);
          setScore(prev => prev + 100);
          
          // Clear flipped cards
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          // Flip cards back
          flippedIndices.forEach(index => {
            if (cardRefs.current[index]) {
              cardRefs.current[index].flipOutY(300);
            }
          });
          
          setTimeout(() => {
            setFlippedIndices([]);
            setIsProcessing(false);
          }, 350);
        }, 1000);
      }
    }
  }, [flippedIndices, cards]);
  
  // Initialize/reset the game
  const initializeGame = () => {
    // Create pairs of cards
    const cardPairs = [...CARD_ITEMS, ...CARD_ITEMS].map((item, index) => ({
      id: `${item.id}-${index}`,
      itemId: item.id,
      name: item.name,
      image: item.image,
      backgroundColor: item.backgroundColor,
      isFlipped: false,
      isMatched: false,
    }));
    
    // Shuffle cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setScore(0);
    setMoves(0);
    setIsComplete(false);
    setIsProcessing(false);
  };
  
  // Handle card press
  const handleCardPress = (index) => {
    // Don't allow more than 2 cards flipped or if already processing or matched
    if (isProcessing || flippedIndices.length >= 2 || 
        flippedIndices.includes(index) || 
        matchedPairs.includes(cards[index].itemId)) {
      return;
    }
    
    // Flip the card with animation
    if (cardRefs.current[index]) {
      cardRefs.current[index].flipInY(300);
    }
    
    // Update state
    setFlippedIndices(prev => [...prev, index]);
    
    // Increment moves if this is the second card
    if (flippedIndices.length === 1) {
      setMoves(prev => prev + 1);
    }
  };
  
  // Check if card is flipped
  const isCardFlipped = (index) => {
    return flippedIndices.includes(index) || matchedPairs.includes(cards[index]?.itemId);
  };
  
  // Render a card
  const renderCard = (card, index) => {
    const isFlipped = isCardFlipped(index);
    const isMatched = matchedPairs.includes(card.itemId);
    
    return (
      <View key={card.id} style={styles.cardWrapper}>
        <Animatable.View
          ref={ref => cardRefs.current[index] = ref}
          style={[
            styles.card,
            isMatched && styles.matchedCard
          ]}
        >
          <TouchableOpacity
            style={[
              styles.cardFace,
              styles.cardBack,
              { transform: [{ rotateY: isFlipped ? '180deg' : '0deg' }] }
            ]}
            onPress={() => handleCardPress(index)}
            disabled={isFlipped || isMatched}
            activeOpacity={0.8}
          >
            <FontAwesome5 name="question" size={24} color="#FFF" />
          </TouchableOpacity>
          
          <View
            style={[
              styles.cardFace,
              styles.cardFront,
              { backgroundColor: card.backgroundColor },
              { transform: [{ rotateY: isFlipped ? '0deg' : '180deg' }] }
            ]}
          >
            <Image
              source={{ uri: card.image }}
              style={styles.cardImage}
              resizeMode="contain"
            />
          </View>
        </Animatable.View>
      </View>
    );
  };
  
  return (
    <GameEngine
      title="Card Flip"
      gameId="card-flip"
      challengeId={challengeId}
      difficulty="Medium"
      isComplete={isComplete}
      onClose={() => navigation.goBack()}
      score={score}
      maxScore={CARD_ITEMS.length * 100}
      showTimer={true}
      timerSeconds={180}
      instructions="Find matching pairs of cards! Tap to flip a card and try to find its matching pair. Remember where the cards are to find all pairs quickly!"
    >
      <View style={styles.gameContainer}>
        {/* Game Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Moves</Text>
            <Text style={styles.statValue}>{moves}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Pairs</Text>
            <Text style={styles.statValue}>{matchedPairs.length}/{CARD_ITEMS.length}</Text>
          </View>
        </View>
        
        {/* Card Grid */}
        <View style={styles.cardsContainer}>
          <View style={styles.cardsGrid}>
            {cards.map((card, index) => renderCard(card, index))}
          </View>
        </View>
        
        {/* Restart Button */}
        <TouchableOpacity
          style={styles.restartButton}
          onPress={initializeGame}
        >
          <FontAwesome5 name="redo" size={16} color="#FFF" />
          <Text style={styles.restartText}>Restart Game</Text>
        </TouchableOpacity>
      </View>
    </GameEngine>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    padding: SIZES.spacing.m,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SIZES.spacing.m,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingVertical: SIZES.spacing.s,
    paddingHorizontal: SIZES.spacing.m,
    borderRadius: SIZES.cardRadius,
    minWidth: 80,
    ...SHADOWS.small,
  },
  statLabel: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  statValue: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: width - SIZES.spacing.l * 2,
  },
  cardWrapper: {
    margin: CARD_MARGIN,
    width: CARD_SIZE,
    height: CARD_SIZE,
  },
  card: {
    width: '100%',
    height: '100%',
    position: 'relative',
    ...SHADOWS.medium,
  },
  cardFace: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    backgroundColor: COLORS.accent3,
  },
  cardFront: {
    padding: 5,
  },
  cardImage: {
    width: '80%',
    height: '80%',
  },
  matchedCard: {
    opacity: 0.7,
  },
  restartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: SIZES.spacing.m,
    alignSelf: 'center',
    ...SHADOWS.small,
  },
  restartText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default CardFlipGame; 