import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 80) / 4;

const MemoryMixScreen = ({ navigation }) => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [difficulty, setDifficulty] = useState('easy'); // easy, medium, hard
  
  const cardItems = [
    { id: '1', name: 'apple', emoji: '🍎' },
    { id: '2', name: 'banana', emoji: '🍌' },
    { id: '3', name: 'orange', emoji: '🍊' },
    { id: '4', name: 'pear', emoji: '🍐' },
    { id: '5', name: 'strawberry', emoji: '🍓' },
    { id: '6', name: 'watermelon', emoji: '🍉' },
    { id: '7', name: 'grapes', emoji: '🍇' },
    { id: '8', name: 'lemon', emoji: '🍋' },
    { id: '9', name: 'dog', emoji: '🐶' },
    { id: '10', name: 'cat', emoji: '🐱' },
    { id: '11', name: 'rabbit', emoji: '🐰' },
    { id: '12', name: 'elephant', emoji: '🐘' },
  ];
  
  const initializeGame = () => {
    // Determine number of pairs based on difficulty
    let numPairs;
    switch (difficulty) {
      case 'easy':
        numPairs = 4;
        break;
      case 'medium':
        numPairs = 6;
        break;
      case 'hard':
        numPairs = 8;
        break;
      default:
        numPairs = 4;
    }
    
    // Select random items
    const shuffledItems = [...cardItems].sort(() => 0.5 - Math.random());
    const selectedItems = shuffledItems.slice(0, numPairs);
    
    // Create pairs and shuffle them
    const cardPairs = [...selectedItems, ...selectedItems]
      .sort(() => 0.5 - Math.random())
      .map((item, index) => ({
        ...item,
        uniqueId: `${item.id}-${index}`,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(cardPairs);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameComplete(false);
    setGameStarted(true);
  };
  
  const handleCardPress = (index) => {
    // Ignore if the card is already flipped or matched
    if (flippedIndices.includes(index) || matchedPairs.includes(cards[index].name)) {
      return;
    }
    
    // Ignore if two cards are already flipped
    if (flippedIndices.length === 2) {
      return;
    }
    
    // Flip the card
    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);
    
    // Check for match if two cards are flipped
    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1);
      
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (cards[firstIndex].name === cards[secondIndex].name) {
        // Match found
        setMatchedPairs([...matchedPairs, cards[firstIndex].name]);
        setFlippedIndices([]);
      } else {
        // No match, flip back after a delay
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };
  
  // Check for game completion
  useEffect(() => {
    if (gameStarted && matchedPairs.length > 0) {
      const totalPairs = cards.length / 2;
      if (matchedPairs.length === totalPairs) {
        setGameComplete(true);
      }
    }
  }, [matchedPairs, gameStarted, cards.length]);
  
  const renderCard = (card, index) => {
    const isFlipped = flippedIndices.includes(index) || matchedPairs.includes(card.name);
    return (
      <TouchableOpacity
        key={card.uniqueId}
        style={[
          styles.card,
          isFlipped ? styles.cardFlipped : null,
          matchedPairs.includes(card.name) ? styles.cardMatched : null,
        ]}
        onPress={() => handleCardPress(index)}
        disabled={isFlipped}
      >
        {isFlipped ? (
          <Text style={styles.cardContent}>{card.emoji}</Text>
        ) : (
          <FontAwesome5 name="question" size={24} color="#FFF" />
        )}
      </TouchableOpacity>
    );
  };
  
  const renderDifficultySelector = () => (
    <View style={styles.difficultyContainer}>
      <Text style={styles.difficultyTitle}>Select Difficulty:</Text>
      <View style={styles.difficultyButtons}>
        <TouchableOpacity
          style={[styles.difficultyButton, difficulty === 'easy' && styles.selectedDifficulty]}
          onPress={() => setDifficulty('easy')}
        >
          <Text style={[styles.difficultyText, difficulty === 'easy' && styles.selectedDifficultyText]}>
            Easy
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.difficultyButton, difficulty === 'medium' && styles.selectedDifficulty]}
          onPress={() => setDifficulty('medium')}
        >
          <Text style={[styles.difficultyText, difficulty === 'medium' && styles.selectedDifficultyText]}>
            Medium
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.difficultyButton, difficulty === 'hard' && styles.selectedDifficulty]}
          onPress={() => setDifficulty('hard')}
        >
          <Text style={[styles.difficultyText, difficulty === 'hard' && styles.selectedDifficultyText]}>
            Hard
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={18} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Memory Mix</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {!gameStarted ? (
          <View style={styles.introContainer}>
            <Animatable.Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4522/4522205.png' }}
              style={styles.introImage}
              animation="pulse"
              iterationCount="infinite"
              duration={2000}
            />
            <Text style={styles.introTitle}>Memory Card Game</Text>
            <Text style={styles.introDescription}>
              Flip cards to find matching pairs! Test your memory and have fun.
            </Text>
            
            {renderDifficultySelector()}
            
            <TouchableOpacity 
              style={styles.startButton}
              onPress={initializeGame}
            >
              <FontAwesome5 name="play" size={16} color="#FFF" />
              <Text style={styles.startButtonText}>Start Game</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View style={styles.gameInfoContainer}>
              <Text style={styles.movesText}>Moves: {moves}</Text>
              <Text style={styles.pairsText}>
                Pairs: {matchedPairs.length} / {cards.length / 2}
              </Text>
            </View>
            
            <View style={styles.gameBoard}>
              {cards.map((card, index) => renderCard(card, index))}
            </View>
            
            {gameComplete && (
              <Animatable.View 
                style={styles.completionContainer}
                animation="bounceIn"
              >
                <Text style={styles.completionTitle}>Congratulations!</Text>
                <Text style={styles.completionText}>
                  You completed the game in {moves} moves!
                </Text>
                <TouchableOpacity 
                  style={styles.playAgainButton}
                  onPress={() => {
                    setGameStarted(false);
                    setGameComplete(false);
                  }}
                >
                  <Text style={styles.playAgainButtonText}>Play Again</Text>
                </TouchableOpacity>
              </Animatable.View>
            )}
            
            {!gameComplete && (
              <TouchableOpacity 
                style={styles.restartButton}
                onPress={() => initializeGame()}
              >
                <FontAwesome5 name="redo" size={14} color="#FFF" />
                <Text style={styles.restartButtonText}>Restart Game</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: SIZES.spacing.xl,
    paddingBottom: SIZES.spacing.m,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    paddingHorizontal: SIZES.screenPadding,
    paddingBottom: 80,
  },
  introContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  introImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  introDescription: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  difficultyContainer: {
    width: '100%',
    marginBottom: 30,
  },
  difficultyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  difficultyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  difficultyButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    ...SHADOWS.small,
  },
  selectedDifficulty: {
    backgroundColor: COLORS.accent1,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  selectedDifficultyText: {
    color: '#FFF',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    ...SHADOWS.medium,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 10,
  },
  gameInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  movesText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  pairsText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.accent1,
  },
  gameBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    margin: 5,
    borderRadius: 10,
    backgroundColor: COLORS.accent1,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  cardFlipped: {
    backgroundColor: '#FFF',
  },
  cardMatched: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  cardContent: {
    fontSize: 30,
  },
  restartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
  restartButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 8,
  },
  completionContainer: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    ...SHADOWS.medium,
    marginVertical: 20,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  completionText: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  playAgainButton: {
    backgroundColor: COLORS.accent1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  playAgainButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default MemoryMixScreen; 