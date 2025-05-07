import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import IslandBackground from '../../components/backgrounds/IslandBackground';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const GamesIndexScreen = ({ navigation }) => {
  // All available games
  const games = [
    {
      id: 'letter-matching',
      title: 'Letter Matching',
      description: 'Match uppercase and lowercase letters',
      thumbnail: 'https://img.freepik.com/free-vector/colorful-alphabet-blocks-cartoon_1308-110048.jpg',
      difficulty: 'Easy',
      category: 'Literacy',
      comingSoon: false,
    },
    {
      id: 'alphabet-safari',
      title: 'Alphabet Safari',
      description: 'Find hidden letters in the jungle',
      thumbnail: 'https://img.freepik.com/free-vector/cute-wild-animals-nature-scene_1308-52250.jpg',
      difficulty: 'Easy',
      category: 'Literacy',
      comingSoon: false,
    },
    {
      id: 'animal-sounds',
      title: 'Animal Sounds',
      description: 'Match animals to the sounds they make',
      thumbnail: 'https://img.freepik.com/free-vector/cute-farm-animals-cartoon-set_1308-118242.jpg',
      difficulty: 'Easy',
      category: 'Matching',
      comingSoon: false,
    },
    {
      id: 'counting-fun',
      title: 'Counting Fun',
      description: 'Learn to count objects',
      thumbnail: 'https://img.freepik.com/free-vector/children-learning-numbers-counting_1308-134112.jpg',
      difficulty: 'Easy',
      category: 'Math',
      comingSoon: false,
    },
    {
      id: 'card-flip',
      title: 'Card Flip',
      description: 'Find matching pairs of cards',
      thumbnail: 'https://img.freepik.com/free-vector/memory-game-children-cartoon-design_1308-118649.jpg',
      difficulty: 'Medium',
      category: 'Memory',
      comingSoon: false,
    },
    {
      id: 'remember-shapes',
      title: 'Remember Shapes',
      description: 'Recall the sequence of shapes',
      thumbnail: 'https://img.freepik.com/free-vector/cute-geometric-shapes-with-faces_23-2148401266.jpg',
      difficulty: 'Medium',
      category: 'Memory',
      comingSoon: false,
    },
  ];

  // Handle game selection
  const handleGamePress = (game) => {
    if (game.comingSoon) {
      return; // Don't navigate to coming soon games
    }
    
    switch(game.id) {
      case 'letter-matching':
        navigation.navigate('LetterMatchingGame', { challengeId: '1' });
        break;
      case 'alphabet-safari':
        navigation.navigate('AlphabetSafariGame', { challengeId: '1' });
        break;
      case 'animal-sounds':
        navigation.navigate('AnimalSoundsGame', { challengeId: '2' });
        break;
      case 'counting-fun':
        navigation.navigate('CountingFunGame', { challengeId: '5' });
        break;
      case 'card-flip':
        navigation.navigate('CardFlipGame', { challengeId: '3' });
        break;
      case 'remember-shapes':
        navigation.navigate('RememberSequenceGame', { challengeId: '4' });
        break;
      default:
        console.log(`Game ${game.title} is not yet available`);
    }
  };

  // Render a game card
  const renderGameCard = ({ item }) => (
    <Animatable.View
      animation="fadeInUp"
      duration={800}
      delay={parseInt(item.id.split('-')[1]) * 100}
    >
      <TouchableOpacity
        style={styles.gameCard}
        onPress={() => handleGamePress(item)}
        activeOpacity={0.8}
      >
        <Image 
          source={{ uri: item.thumbnail }} 
          style={styles.gameImage}
          resizeMode="cover"
        />
        
        <View style={styles.gameContent}>
          <Text style={styles.gameTitle}>{item.title}</Text>
          <Text style={styles.gameDescription}>{item.description}</Text>
          
          <View style={styles.gameMetaRow}>
            <View style={[styles.difficultyTag, styles[item.difficulty.toLowerCase()]]}>
              <Text style={styles.difficultyText}>{item.difficulty}</Text>
            </View>
            
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        
        {item.comingSoon && (
          <View style={styles.comingSoonOverlay}>
            <Text style={styles.comingSoonText}>Coming Soon</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <IslandBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={18} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All Games</Text>
          <View style={{ width: 40 }} />
        </View>
        
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={renderGameCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </IslandBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: SIZES.medium,
    paddingBottom: SIZES.small,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  listContent: {
    padding: SIZES.screenPadding,
    paddingTop: SIZES.medium,
  },
  gameCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: SIZES.borderRadius,
    overflow: 'hidden',
    marginBottom: SIZES.medium,
    ...SHADOWS.medium,
  },
  gameImage: {
    width: '100%',
    height: 150,
  },
  gameContent: {
    padding: SIZES.spacing.m,
  },
  gameTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
    marginBottom: SIZES.spacing.m,
  },
  gameMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  easy: {
    backgroundColor: COLORS.accent1 + '30', // 30% opacity
  },
  medium: {
    backgroundColor: COLORS.accent2 + '30',
  },
  hard: {
    backgroundColor: COLORS.accent4 + '30',
  },
  difficultyText: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.text,
  },
  categoryText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  comingSoonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonText: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: '#FFF',
    backgroundColor: COLORS.accent2,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    transform: [{ rotate: '-15deg' }],
  },
});

export default GamesIndexScreen; 