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
const CARD_SIZE = width * 0.23;

// Define animal data with images and sounds
const ANIMALS = [
  {
    id: '1',
    name: 'Lion',
    sound: 'Roar',
    image: 'https://img.freepik.com/free-vector/cute-lion-cartoon_1308-133310.jpg',
    backgroundColor: '#FFA726',
    soundDescription: 'A powerful roar - ROOOOAR!',
  },
  {
    id: '2',
    name: 'Cow',
    sound: 'Moo',
    image: 'https://img.freepik.com/free-vector/cute-cow-cartoon_1308-116252.jpg',
    backgroundColor: '#42A5F5',
    soundDescription: 'A gentle moo - MOOOO!',
  },
  {
    id: '3',
    name: 'Dog',
    sound: 'Woof',
    image: 'https://img.freepik.com/free-vector/cute-dog-cartoon_1308-133235.jpg',
    backgroundColor: '#EF5350',
    soundDescription: 'A happy bark - WOOF WOOF!',
  },
  {
    id: '4',
    name: 'Cat',
    sound: 'Meow',
    image: 'https://img.freepik.com/free-vector/cute-cat-cartoon_1308-133244.jpg',
    backgroundColor: '#9575CD',
    soundDescription: 'A soft meow - MEOWWW!',
  },
  {
    id: '5',
    name: 'Horse',
    sound: 'Neigh',
    image: 'https://img.freepik.com/free-vector/cute-horse-cartoon_1308-115266.jpg',
    backgroundColor: '#66BB6A',
    soundDescription: 'A loud neigh - NEIGGGHH!',
  },
  {
    id: '6',
    name: 'Pig',
    sound: 'Oink',
    image: 'https://img.freepik.com/free-vector/cute-pig-cartoon_1308-133167.jpg',
    backgroundColor: '#EC407A',
    soundDescription: 'A snorty oink - OINK OINK!',
  },
  {
    id: '7',
    name: 'Duck',
    sound: 'Quack',
    image: 'https://img.freepik.com/free-vector/cute-duck-cartoon_1308-134132.jpg',
    backgroundColor: '#FFCA28',
    soundDescription: 'A happy quack - QUACK QUACK!',
  },
  {
    id: '8',
    name: 'Chicken',
    sound: 'Cluck',
    image: 'https://img.freepik.com/free-vector/cute-chicken-cartoon_1308-134086.jpg',
    backgroundColor: '#FF7043',
    soundDescription: 'A chicken cluck - CLUCK CLUCK!',
  },
];

const AnimalSoundsGame = ({ navigation, route }) => {
  // Get challengeId from route params if available
  const challengeId = route?.params?.challengeId;
  
  const [animalCards, setAnimalCards] = useState([]);
  const [soundCards, setSoundCards] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [selectedSound, setSelectedSound] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectMatch, setIsCorrectMatch] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState('');
  
  const feedbackRef = useRef(null);
  
  // Initialize the game
  useEffect(() => {
    resetGame();
  }, []);
  
  // Check if game is complete
  useEffect(() => {
    if (matchedPairs.length === ANIMALS.length) {
      setIsComplete(true);
    }
  }, [matchedPairs]);
  
  // Check if selected animal and sound match
  useEffect(() => {
    if (selectedAnimal && selectedSound) {
      const animalItem = ANIMALS.find(a => a.id === selectedAnimal);
      const soundItem = ANIMALS.find(a => a.id === selectedSound);
      
      if (animalItem && soundItem && animalItem.id === soundItem.id) {
        // Match found
        handleCorrectMatch(animalItem);
      } else {
        // No match
        handleIncorrectMatch();
      }
    }
  }, [selectedAnimal, selectedSound]);
  
  // Reset/initialize the game
  const resetGame = () => {
    setSelectedAnimal(null);
    setSelectedSound(null);
    setMatchedPairs([]);
    setScore(0);
    setIsComplete(false);
    setShowFeedback(false);
    setIsCorrectMatch(false);
    setCurrentFeedback('');
    
    // Shuffle the animals for animal cards
    const shuffledAnimals = [...ANIMALS].sort(() => Math.random() - 0.5);
    setAnimalCards(shuffledAnimals);
    
    // Shuffle again for sound cards
    const shuffledSounds = [...ANIMALS].sort(() => Math.random() - 0.5);
    setSoundCards(shuffledSounds);
  };
  
  // Handle correct match
  const handleCorrectMatch = (animal) => {
    setIsCorrectMatch(true);
    setCurrentFeedback(`Yes! The ${animal.name} goes ${animal.sound}!`);
    setShowFeedback(true);
    
    setTimeout(() => {
      // Add to matched pairs
      setMatchedPairs(prev => [...prev, animal.id]);
      setScore(prev => prev + 100);
      
      // Reset selections
      setSelectedAnimal(null);
      setSelectedSound(null);
      setShowFeedback(false);
    }, 1500);
  };
  
  // Handle incorrect match
  const handleIncorrectMatch = () => {
    setIsCorrectMatch(false);
    setCurrentFeedback("Try again! That's not a match.");
    setShowFeedback(true);
    
    setTimeout(() => {
      // Reset selections
      setSelectedAnimal(null);
      setSelectedSound(null);
      setShowFeedback(false);
    }, 1500);
  };
  
  // Handle animal card selection
  const handleAnimalPress = (id) => {
    if (!selectedAnimal && !matchedPairs.includes(id)) {
      setSelectedAnimal(id);
    }
  };
  
  // Handle sound card selection
  const handleSoundPress = (id) => {
    if (!selectedSound && !matchedPairs.includes(id)) {
      setSelectedSound(id);
    }
  };
  
  // Render animal card
  const renderAnimalCard = (animal) => {
    const isMatched = matchedPairs.includes(animal.id);
    const isSelected = selectedAnimal === animal.id;
    
    return (
      <Animatable.View
        key={`animal-${animal.id}`}
        animation="bounceIn"
        duration={600}
        delay={parseInt(animal.id) * 100}
        style={styles.cardWrapper}
      >
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: animal.backgroundColor },
            isMatched && styles.matchedCard,
            isSelected && styles.selectedCard
          ]}
          onPress={() => handleAnimalPress(animal.id)}
          disabled={isMatched}
          activeOpacity={0.8}
        >
          {!isMatched ? (
            <>
              <Image
                source={{ uri: animal.image }}
                style={styles.animalImage}
                resizeMode="contain"
              />
              <Text style={styles.animalName}>{animal.name}</Text>
            </>
          ) : (
            <Animatable.View animation="pulse" iterationCount="infinite" duration={2000}>
              <FontAwesome5 name="check-circle" size={30} color="#FFF" />
            </Animatable.View>
          )}
        </TouchableOpacity>
      </Animatable.View>
    );
  };
  
  // Render sound card
  const renderSoundCard = (animal) => {
    const isMatched = matchedPairs.includes(animal.id);
    const isSelected = selectedSound === animal.id;
    
    return (
      <Animatable.View
        key={`sound-${animal.id}`}
        animation="bounceIn"
        duration={600}
        delay={parseInt(animal.id) * 100 + 300}
        style={styles.cardWrapper}
      >
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: animal.backgroundColor },
            isMatched && styles.matchedCard,
            isSelected && styles.selectedCard
          ]}
          onPress={() => handleSoundPress(animal.id)}
          disabled={isMatched}
          activeOpacity={0.8}
        >
          {!isMatched ? (
            <>
              <FontAwesome5 name="volume-up" size={24} color="#FFF" style={styles.soundIcon} />
              <Text style={styles.soundText}>{animal.sound}</Text>
            </>
          ) : (
            <Animatable.View animation="pulse" iterationCount="infinite" duration={2000}>
              <FontAwesome5 name="check-circle" size={30} color="#FFF" />
            </Animatable.View>
          )}
        </TouchableOpacity>
      </Animatable.View>
    );
  };
  
  // Main render
  return (
    <GameEngine
      title="Animal Sounds"
      gameId="animal-sounds"
      challengeId={challengeId}
      difficulty="Easy"
      isComplete={isComplete}
      onClose={() => navigation.goBack()}
      score={score}
      maxScore={ANIMALS.length * 100}
      showTimer={true}
      timerSeconds={180}
      instructions="Match each animal with the sound it makes! Select an animal on the left, then find its matching sound on the right."
    >
      <View style={styles.gameContainer}>
        {/* Game Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(matchedPairs.length / ANIMALS.length) * 100}%` }
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {matchedPairs.length}/{ANIMALS.length} Matches
          </Text>
        </View>
        
        {/* Game Content */}
        <View style={styles.gameContent}>
          {/* Animal Cards Column */}
          <View style={styles.cardsColumn}>
            <View style={styles.columnHeader}>
              <Animatable.View 
                animation="bounceIn" 
                duration={800} 
                style={styles.columnIcon}
              >
                <FontAwesome5 name="paw" size={16} color="#FFF" />
              </Animatable.View>
              <Text style={styles.columnTitle}>Animals</Text>
            </View>
            <View style={styles.cardsGrid}>
              {animalCards.map(animal => renderAnimalCard(animal))}
            </View>
          </View>
          
          {/* Sound Cards Column */}
          <View style={styles.cardsColumn}>
            <View style={styles.columnHeader}>
              <Animatable.View 
                animation="bounceIn" 
                duration={800} 
                delay={200}
                style={[styles.columnIcon, { backgroundColor: COLORS.accent4 }]}
              >
                <FontAwesome5 name="volume-up" size={16} color="#FFF" />
              </Animatable.View>
              <Text style={styles.columnTitle}>Sounds</Text>
            </View>
            <View style={styles.cardsGrid}>
              {soundCards.map(animal => renderSoundCard(animal))}
            </View>
          </View>
        </View>
        
        {/* Feedback Popup */}
        {showFeedback && (
          <Animatable.View
            ref={feedbackRef}
            animation="bounceIn"
            duration={500}
            style={[
              styles.feedbackContainer,
              { backgroundColor: isCorrectMatch ? 'rgba(102, 187, 106, 0.9)' : 'rgba(239, 83, 80, 0.9)' }
            ]}
          >
            <Text style={styles.feedbackText}>{currentFeedback}</Text>
            {isCorrectMatch && (
              <Animatable.View animation="tada" iterationCount={2} duration={800} delay={300}>
                <FontAwesome5 name="smile" size={30} color="#FFF" />
              </Animatable.View>
            )}
          </Animatable.View>
        )}
      </View>
    </GameEngine>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    padding: SIZES.spacing.m,
  },
  progressContainer: {
    marginBottom: SIZES.spacing.m,
  },
  progressBar: {
    height: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accent2,
    borderRadius: 5,
  },
  progressText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    fontWeight: '500',
    textAlign: 'right',
  },
  gameContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardsColumn: {
    width: '48%',
  },
  columnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.m,
  },
  columnIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.accent1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.spacing.xs,
    ...SHADOWS.small,
  },
  columnTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: SIZES.spacing.m,
  },
  card: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  selectedCard: {
    transform: [{ scale: 1.05 }],
    borderWidth: 3,
    borderColor: '#FFF',
    ...SHADOWS.large,
  },
  matchedCard: {
    opacity: 0.8,
  },
  animalImage: {
    width: '70%',
    height: '70%',
    marginBottom: SIZES.spacing.xs,
  },
  animalName: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  soundIcon: {
    marginBottom: SIZES.spacing.xs,
  },
  soundText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  feedbackContainer: {
    position: 'absolute',
    bottom: SIZES.spacing.l,
    left: SIZES.spacing.l,
    right: SIZES.spacing.l,
    padding: SIZES.spacing.m,
    borderRadius: SIZES.cardRadius,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOWS.large,
  },
  feedbackText: {
    flex: 1,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: SIZES.spacing.s,
  },
});

export default AnimalSoundsGame; 