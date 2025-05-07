import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const WeeklyFavoritesScreen = ({ navigation }) => {
  // Weekly favorites data
  const weeklyFavorites = [
    {
      id: '1',
      title: 'Letter A Adventures',
      type: 'Story',
      lastPlayed: '2 days ago',
      playCount: 5,
      thumbnail: 'https://img.freepik.com/free-vector/letter-with-cute-expression_1308-135204.jpg',
      color: COLORS.storyWorld.primary,
      icon: <FontAwesome5 name="book-open" size={16} color="#FFF" />,
    },
    {
      id: '2',
      title: 'ABC Song',
      type: 'Song',
      lastPlayed: 'Yesterday',
      playCount: 8,
      thumbnail: 'https://img.freepik.com/free-vector/cute-colorful-alphabet-letters_1308-134592.jpg',
      color: COLORS.rhymeRhythm.primary,
      icon: <FontAwesome5 name="music" size={16} color="#FFF" />,
    },
    {
      id: '3',
      title: 'Animal Matching',
      type: 'Game',
      lastPlayed: 'Today',
      playCount: 6,
      thumbnail: 'https://img.freepik.com/free-vector/flat-design-cute-animals-collection_23-2148985901.jpg',
      color: COLORS.gameZone.primary,
      icon: <FontAwesome5 name="gamepad" size={16} color="#FFF" />,
    },
    {
      id: '4',
      title: 'Tracing Letters',
      type: 'Activity',
      lastPlayed: '3 days ago',
      playCount: 4,
      thumbnail: 'https://img.freepik.com/free-vector/hand-drawn-alphabet-tracing-worksheets_23-2149663443.jpg',
      color: COLORS.tertiary,
      icon: <FontAwesome5 name="pencil-alt" size={16} color="#FFF" />,
    },
  ];
  
  // Similar content recommendations
  const similarContent = [
    {
      id: 's1',
      title: 'Letter B Basics',
      type: 'Story',
      thumbnail: 'https://img.freepik.com/free-vector/letter-b-with-cute-expression_1308-135205.jpg',
      color: COLORS.storyWorld.primary,
    },
    {
      id: 's2',
      title: '123 Number Song',
      type: 'Song',
      thumbnail: 'https://img.freepik.com/free-vector/cute-numbers-set-cartoon-vector-illustrations_74855-15355.jpg',
      color: COLORS.rhymeRhythm.primary,
    },
    {
      id: 's3',
      title: 'Shape Matching',
      type: 'Game',
      thumbnail: 'https://img.freepik.com/free-vector/hand-drawn-shapes-collection_23-2149219040.jpg',
      color: COLORS.gameZone.primary,
    },
  ];
  
  const handleItemPress = (item) => {
    console.log(`Navigate to ${item.type}: ${item.title}`);
    // Navigate to the appropriate screen based on item type
  };
  
  const handleSimilarPress = (item) => {
    console.log(`Navigate to similar content: ${item.title}`);
    // Navigate to the similar content
  };

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
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Banner */}
        <Animatable.View 
          animation="fadeIn" 
          duration={800}
          style={styles.welcomeBanner}
        >
          <View>
            <Text style={styles.welcomeTitle}>Your Favorites</Text>
            <Text style={styles.welcomeSubtitle}>Content you loved this week</Text>
          </View>
          <Animatable.View 
            animation="pulse" 
            iterationCount="infinite" 
            duration={2000}
            style={styles.starIconContainer}
          >
            <FontAwesome5 name="star" size={40} color={COLORS.accent1} />
          </Animatable.View>
        </Animatable.View>
        
        {/* Top Favorite Content */}
        {weeklyFavorites[0] && (
          <Animatable.View 
            animation="fadeInUp" 
            duration={800}
            style={styles.topFavoriteContainer}
          >
            <Text style={styles.sectionTitle}>Most Played</Text>
            <View style={styles.topFavoriteCard}>
              <View style={styles.topFavoriteHeader}>
                <View style={[styles.typeTag, { backgroundColor: weeklyFavorites[0].color }]}>
                  {weeklyFavorites[0].icon}
                  <Text style={styles.typeText}>{weeklyFavorites[0].type}</Text>
                </View>
                <View style={styles.playCountBadge}>
                  <Text style={styles.playCountText}>
                    PLAYED {weeklyFavorites[0].playCount}x
                  </Text>
                </View>
              </View>
              <View style={styles.topFavoriteContent}>
                <View style={styles.contentLeftSide}>
                  <Text style={styles.topFavoriteTitle}>{weeklyFavorites[0].title}</Text>
                  <Text style={styles.topFavoriteLastPlayed}>
                    Last played: {weeklyFavorites[0].lastPlayed}
                  </Text>
                  <View style={styles.topFavoriteButtons}>
                    <TouchableOpacity 
                      style={styles.replayButton}
                      onPress={() => handleItemPress(weeklyFavorites[0])}
                    >
                      <FontAwesome5 name="redo" size={14} color="#FFF" />
                      <Text style={styles.replayButtonText}>Replay</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.findSimilarButton}>
                      <Text style={styles.findSimilarText}>Find Similar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Animatable.View
                  animation="pulse"
                  iterationCount="infinite"
                  duration={3000}
                  style={styles.characterContainer}
                >
                  <Image 
                    source={{ uri: weeklyFavorites[0].thumbnail }}
                    style={styles.characterImage}
                    resizeMode="contain"
                  />
                </Animatable.View>
              </View>
            </View>
          </Animatable.View>
        )}
        
        {/* Other Favorites */}
        <View style={styles.otherFavoritesContainer}>
          <Text style={styles.sectionTitle}>Other Favorites</Text>
          {weeklyFavorites.slice(1).map((item, index) => (
            <Animatable.View 
              key={item.id}
              animation="fadeInUp"
              duration={600}
              delay={index * 100}
            >
              <TouchableOpacity 
                style={styles.favoriteCard}
                onPress={() => handleItemPress(item)}
              >
                <View style={styles.cardBadge}>
                  <Text style={styles.cardBadgeText}>FAVORITE</Text>
                </View>
                <Image 
                  source={{ uri: item.thumbnail }}
                  style={styles.favoriteImage}
                  resizeMode="contain"
                />
                <View style={styles.favoriteInfo}>
                  <Text style={styles.favoriteTitle}>{item.title}</Text>
                  <View style={styles.favoriteMetaRow}>
                    <Text style={styles.favoriteType}>{item.type}</Text>
                    <Text style={styles.favoriteLastPlayed}>{item.lastPlayed}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>
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
  scrollContainer: {
    paddingBottom: SIZES.xlarge * 2,
  },
  welcomeBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFECB3',
    borderRadius: 30,
    padding: SIZES.medium,
    paddingVertical: SIZES.large,
    marginHorizontal: SIZES.screenPadding,
    marginBottom: SIZES.large,
    ...SHADOWS.medium,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C26401',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: SIZES.medium,
    color: '#9E6915',
  },
  starIconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: SIZES.medium,
    paddingHorizontal: SIZES.screenPadding,
  },
  topFavoriteContainer: {
    marginBottom: SIZES.xlarge,
  },
  topFavoriteCard: {
    marginHorizontal: SIZES.screenPadding,
    borderRadius: SIZES.cardRadius,
    backgroundColor: '#E3F2FD',
    overflow: 'hidden',
    ...SHADOWS.medium,
    padding: SIZES.medium,
  },
  topFavoriteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.small,
  },
  typeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  typeText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: SIZES.small,
    marginLeft: 4,
  },
  playCountBadge: {
    backgroundColor: '#FFA000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    ...SHADOWS.small,
  },
  playCountText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: SIZES.small,
  },
  topFavoriteContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.small,
  },
  contentLeftSide: {
    flex: 1,
    marginRight: SIZES.medium,
  },
  topFavoriteTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 6,
  },
  topFavoriteLastPlayed: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
    marginBottom: SIZES.medium,
  },
  topFavoriteButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5252',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: SIZES.medium,
    ...SHADOWS.small,
  },
  replayButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 6,
  },
  findSimilarButton: {
    backgroundColor: '#42A5F5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    ...SHADOWS.small,
  },
  findSimilarText: {
    color: '#FFF',
    fontWeight: '600',
  },
  characterContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterImage: {
    width: 100,
    height: 100,
  },
  otherFavoritesContainer: {
    marginBottom: SIZES.xlarge,
  },
  favoriteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9C4',
    marginHorizontal: SIZES.screenPadding,
    borderRadius: SIZES.cardRadius,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    ...SHADOWS.small,
    position: 'relative',
  },
  cardBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFC107',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    transform: [{ rotate: '-8deg' }],
    ...SHADOWS.small,
    zIndex: 1,
  },
  cardBadgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 10,
  },
  favoriteImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: SIZES.medium,
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 6,
  },
  favoriteMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteType: {
    fontSize: SIZES.font,
    color: COLORS.textLight,
    marginRight: 8,
    fontWeight: '600',
  },
  favoriteLastPlayed: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    opacity: 0.8,
  },
});

export default WeeklyFavoritesScreen; 