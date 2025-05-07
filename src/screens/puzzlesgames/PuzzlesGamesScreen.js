import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const PuzzlesGamesScreen = ({ navigation }) => {
  // Games data organized by categories with Freepik images
  const gameCategories = [
    {
      id: '1',
      title: 'Matching Games',
      color: COLORS.accent1,
      icon: <FontAwesome5 name="puzzle-piece" size={20} color="#FFF" />,
      games: [
        {
          id: 'match1',
          title: 'Letter Matching',
          description: 'Match uppercase and lowercase letters',
          thumbnail: 'https://img.freepik.com/free-vector/children-learning-different-subjects-illustration_1308-106969.jpg',
          difficulty: 'Easy',
          mode: 'Drag & Drop',
        },
        {
          id: 'match2',
          title: 'Animal Sounds',
          description: 'Match animals to their sounds',
          thumbnail: 'https://img.freepik.com/free-vector/cute-zoo-animals-collection_23-2147533394.jpg',
          difficulty: 'Easy',
          mode: 'Tap to Match',
        },
      ]
    },
    {
      id: '2',
      title: 'Memory Games',
      color: COLORS.accent3,
      icon: <FontAwesome5 name="brain" size={20} color="#FFF" />,
      games: [
        {
          id: 'memory1',
          title: 'Card Flip',
          description: 'Find matching pairs of cards',
          thumbnail: 'https://img.freepik.com/free-vector/memory-game-children-cartoon-design_1308-118649.jpg',
          difficulty: 'Medium',
          mode: 'Memory',
        },
        {
          id: 'memory2',
          title: 'Remember Shapes',
          description: 'Recall the sequence of shapes',
          thumbnail: 'https://img.freepik.com/free-vector/cute-geometric-shapes-with-faces_23-2148401266.jpg',
          difficulty: 'Medium',
          mode: 'Sequence',
        },
      ]
    },
    {
      id: '3',
      title: 'Spelling Games',
      color: COLORS.accent6,
      icon: <FontAwesome5 name="font" size={20} color="#FFF" />,
      games: [
        {
          id: 'spell1',
          title: 'CVC Words',
          description: 'Build simple consonant-vowel-consonant words',
          thumbnail: 'https://img.freepik.com/free-vector/english-book-preschool-kids-cartoon-illustration_74855-14190.jpg',
          difficulty: 'Medium',
          mode: 'Word Building',
        },
        {
          id: 'spell2',
          title: 'Spell My Name',
          description: 'Learn to spell your own name with fun animations',
          thumbnail: 'https://img.freepik.com/free-vector/english-alphabet-kids_1308-2544.jpg',
          difficulty: 'Easy',
          mode: 'Spelling',
        },
      ]
    },
    {
      id: '4',
      title: 'Drawing Games',
      color: COLORS.accent4,
      icon: <FontAwesome5 name="paint-brush" size={20} color="#FFF" />,
      games: [
        {
          id: 'draw1',
          title: 'Trace Letters',
          description: 'Learn to write letters by tracing',
          thumbnail: 'https://img.freepik.com/free-vector/cartoon-pencil-paper-with-letters_1308-98579.jpg',
          difficulty: 'Easy',
          mode: 'Tracing',
        },
        {
          id: 'draw2',
          title: 'Color Shapes',
          description: 'Coloring game with shapes and animals',
          thumbnail: 'https://img.freepik.com/free-vector/kids-painting-drawing-coloring-pictures_1308-128601.jpg',
          difficulty: 'Easy',
          mode: 'Coloring',
        },
      ]
    },
  ];
  
  // Featured game with Freepik image
  const featuredGame = {
    id: 'featured1',
    title: 'Alphabet Safari',
    description: 'Go on a safari adventure and find hidden letters in the jungle!',
    thumbnail: 'https://img.freepik.com/free-vector/cute-wild-animals-nature-scene_1308-52250.jpg',
    difficulty: 'Easy',
    mode: 'Hidden Objects',
  };
  
  const handleGamePress = (game) => {
    console.log(`Starting game: ${game.title}`);
    
    // Navigate to the appropriate game screen based on the game id
    switch(game.id) {
      case 'match1':
        navigation.navigate('LetterMatchingGame', { challengeId: '1' }); // ABC Recognition challenge
        break;
      case 'featured1':
        navigation.navigate('AlphabetSafariGame', { challengeId: '1' }); // Also ABC Recognition challenge
        break;
      case 'match2':
        navigation.navigate('AnimalSoundsGame', { challengeId: '2' }); // Animals challenge
        break;
      case 'memory1':
        navigation.navigate('CardFlipGame', { challengeId: '3' }); // Memory challenge
        break;
      case 'memory2':
        navigation.navigate('RememberSequenceGame', { challengeId: '4' }); // Memory sequence challenge
        break;
      case 'draw1':
        console.log('Trace Letters game will be implemented soon');
        break;
      case 'draw2':
        console.log('Color Shapes game will be implemented soon');
        break;
      case 'spell1':
        console.log('CVC Words game will be implemented soon');
        break;
      case 'spell2':
        console.log('Spell My Name game will be implemented soon');
        break;
      default:
        console.log(`Game ${game.title} will be implemented soon`);
    }
  };
  
  // Render game category with its games
  const renderGameCategory = ({ item }) => (
    <Animatable.View 
      animation="fadeInUp" 
      duration={800} 
      delay={parseInt(item.id) * 100}
    >
      <View style={styles.categoryContainer}>
        <View style={styles.categoryHeader}>
          <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
            {item.icon}
          </View>
          <Text style={styles.categoryTitle}>{item.title}</Text>
        </View>
        
        <FlatList
          data={item.games}
          keyExtractor={(game) => game.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gamesListContent}
          renderItem={({ item: game }) => (
            <TouchableOpacity 
              style={styles.gameCard} 
              onPress={() => handleGamePress(game)}
            >
              <Image 
                source={{ uri: game.thumbnail }}
                style={styles.gameThumbnail}
                resizeMode="cover"
              />
              <View style={styles.gameContent}>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <Text style={styles.gameDescription} numberOfLines={2}>
                  {game.description}
                </Text>
                <View style={styles.gameMetaContainer}>
                  <View style={styles.gameDifficultyTag}>
                    <Text style={styles.gameDifficultyText}>{game.difficulty}</Text>
                  </View>
                  <Text style={styles.gameMode}>{game.mode}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={18} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Puzzles & Games</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <FlatList
        data={gameCategories}
        keyExtractor={item => item.id}
        renderItem={renderGameCategory}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        ListHeaderComponent={() => (
          <>
            {/* Welcome Banner */}
            <Animatable.View 
              animation="fadeIn" 
              duration={800}
              style={styles.welcomeBanner}
            >
              <View>
                <Text style={styles.welcomeTitle}>Let's Play!</Text>
                <Text style={styles.welcomeSubtitle}>Fun games to help you learn</Text>
              </View>
              <Animatable.View 
                animation="pulse" 
                iterationCount="infinite" 
                duration={2000}
              >
                <FontAwesome5 name="gamepad" size={40} color={COLORS.gameZone.primary} />
              </Animatable.View>
            </Animatable.View>
            
            {/* Featured Game */}
            <View style={styles.featuredContainer}>
              <Text style={styles.sectionTitle}>Featured Game</Text>
              <Animatable.View 
                animation="fadeInUp" 
                duration={800}
                style={styles.featuredCard}
              >
                <Image 
                  source={{ uri: featuredGame.thumbnail }}
                  style={styles.featuredImage}
                  resizeMode="cover"
                />
                <View style={styles.featuredContent}>
                  <Text style={styles.featuredTitle}>{featuredGame.title}</Text>
                  <Text style={styles.featuredDescription}>
                    {featuredGame.description}
                  </Text>
                  <TouchableOpacity 
                    style={styles.playButton}
                    onPress={() => handleGamePress(featuredGame)}
                  >
                    <Text style={styles.playButtonText}>Play Now</Text>
                    <FontAwesome5 name="play" size={12} color="#FFF" style={styles.buttonIcon} />
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            </View>
            
            <Text style={styles.sectionTitle}>Game Categories</Text>
          </>
        )}
        ListFooterComponent={() => (
          <>
            {/* See All Games Button */}
            <Animatable.View 
              animation="fadeInUp" 
              duration={800}
              style={styles.seeAllContainer}
            >
              <TouchableOpacity 
                style={styles.seeAllButton}
                onPress={() => navigation.navigate('GamesIndex')}
              >
                <Text style={styles.seeAllText}>See All Games</Text>
                <FontAwesome5 name="arrow-right" size={16} color="#FFF" />
              </TouchableOpacity>
            </Animatable.View>
            
            {/* Adaptive Difficulty Info */}
            <Animatable.View 
              animation="fadeInUp" 
              duration={800}
              style={styles.adaptiveContainer}
            >
              <View style={styles.adaptiveContent}>
                <FontAwesome5 name="chart-line" size={32} color={COLORS.gameZone.primary} style={styles.adaptiveIcon} />
                <View>
                  <Text style={styles.adaptiveTitle}>Adaptive Difficulty</Text>
                  <Text style={styles.adaptiveDescription}>
                    Games adapt to your child's learning pace and skill level, providing just the right challenge!
                  </Text>
                </View>
              </View>
            </Animatable.View>
          </>
        )}
      />
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
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  scrollContainer: {
    paddingBottom: SIZES.xlarge * 2,
  },
  welcomeBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 195, 247, 0.2)',
    borderRadius: SIZES.cardRadius,
    padding: SIZES.medium,
    marginHorizontal: SIZES.screenPadding,
    marginBottom: SIZES.large,
  },
  welcomeTitle: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.medium,
    paddingHorizontal: SIZES.screenPadding,
  },
  featuredContainer: {
    marginBottom: SIZES.xlarge,
  },
  featuredCard: {
    marginHorizontal: SIZES.screenPadding,
    borderRadius: SIZES.cardRadius,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  featuredImage: {
    width: '100%',
    height: 150,
  },
  featuredContent: {
    padding: SIZES.medium,
  },
  featuredTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
    marginBottom: SIZES.medium,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.gameZone.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  playButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginRight: 6,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  categoryContainer: {
    marginBottom: SIZES.large,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.screenPadding,
    marginBottom: SIZES.small,
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  gamesListContent: {
    paddingLeft: SIZES.screenPadding,
    paddingRight: SIZES.screenPadding / 2,
    paddingTop: SIZES.small,
  },
  gameCard: {
    width: 220,
    borderRadius: SIZES.cardRadius,
    backgroundColor: COLORS.background,
    marginRight: SIZES.medium,
    ...SHADOWS.medium,
    overflow: 'hidden',
  },
  gameThumbnail: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: SIZES.cardRadius,
    borderTopRightRadius: SIZES.cardRadius,
  },
  gameContent: {
    padding: SIZES.medium,
  },
  gameTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: 8,
    height: 32, // Fixed height for 2 lines
  },
  gameMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gameDifficultyTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
  },
  gameDifficultyText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  gameMode: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  adaptiveContainer: {
    backgroundColor: 'rgba(174, 213, 129, 0.2)',
    borderRadius: SIZES.cardRadius,
    padding: SIZES.medium,
    marginHorizontal: SIZES.screenPadding,
    marginTop: SIZES.medium,
  },
  adaptiveContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adaptiveIcon: {
    marginRight: SIZES.medium,
  },
  adaptiveTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  adaptiveDescription: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
  },
  containerTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  seeAllContainer: {
    alignItems: 'center',
    marginVertical: SIZES.spacing.l,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gameZone.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    ...SHADOWS.medium,
  },
  seeAllText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 10,
  },
});

export default PuzzlesGamesScreen;